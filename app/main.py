import json
import uuid
from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from . import models, schemas, crud, services
from .database import engine, get_db

from fastapi.middleware.cors import CORSMiddleware

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="LIK Backend Architecture", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # NOTE: Change to your Vercel URL in strict production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
@app.on_event("startup")
async def startup_event():
    # Automatically create the database tables on application startup
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.post("/policy/create", response_model=schemas.PolicyCreateResponse)
@limiter.limit("5/minute")
async def create_policy(request: Request, payload: schemas.PolicyCreateRequest, db: AsyncSession = Depends(get_db)):
    user_a = await crud.create_user(db, answers=payload.answers)
    policy = await crud.create_policy(db, user_a_id=user_a.id)
    return schemas.PolicyCreateResponse(policy_id=policy.id, user_a_id=user_a.id)

@app.post("/submit-assessment", response_model=schemas.AssessmentSubmitResponse)
@limiter.limit("5/minute")
async def submit_assessment(request: Request, payload: schemas.AssessmentSubmitRequest, db: AsyncSession = Depends(get_db)):
    policy = await crud.get_policy(db, payload.policy_id)
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
        
    if policy.status == "completed" or policy.user_b_id is not None:
        raise HTTPException(status_code=400, detail="Policy is already completed.")
        
    user_b = await crud.create_user(db, answers=payload.answers)
    await crud.update_policy_with_user_b(db, policy=policy, user_b_id=user_b.id)
    
    return schemas.AssessmentSubmitResponse(message="Assessment submitted successfully.")

@app.get("/policy/{id}/results", response_model=schemas.PolicyResultsResponse)
@limiter.limit("10/minute")
async def get_policy_results(request: Request, id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    policy = await crud.get_policy(db, id)
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
        
    if policy.status != "completed" or not policy.user_b_id:
        from fastapi.responses import JSONResponse
        return JSONResponse(status_code=202, content={"detail": "Policy assessment not completed yet."})
        
    # Fetch user responses
    user_a = await crud.get_user(db, policy.user_a_id)
    user_b = await crud.get_user(db, policy.user_b_id)
    
    if not user_a or not user_b:
        raise HTTPException(status_code=500, detail="User references corrupted.")
        
    # Compute compatibility
    algo_results = services.run_compatibility_algorithm(user_a.answers, user_b.answers)
    
    # Store insights if not already stored
    insight = await crud.get_insight_by_policy(db, id)
    if not insight:
        from .insights_engine import generate_underwriting_report
        ai_report = generate_underwriting_report(algo_results["assets"], algo_results["risks"])
        # Ensure we store the entire AI report dictionary as the 'assets' string (for simplicity, we'll store AI report json)
        await crud.create_insight(
            db, 
            policy_id=id, 
            assets=json.dumps(ai_report), 
            risks="{}"
        )
    else:
        ai_report = json.loads(insight.assets)
        
    return schemas.PolicyResultsResponse(
        score=algo_results["final_score"],
        summary=ai_report.get("summary", ""),
        assets=ai_report.get("assets", []),
        risks=ai_report.get("risks", []),
        consistencyScore=(algo_results["consistency_a"] + algo_results["consistency_b"]) / 2
    )
