import json
import uuid
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from . import models, schemas, crud, services
from .database import engine, get_db

app = FastAPI(title="LIK Backend Architecture", version="1.0.0")

@app.on_event("startup")
async def startup_event():
    # Automatically create the database tables on application startup
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.post("/policy/create", response_model=schemas.PolicyCreateResponse)
async def create_policy(request: schemas.PolicyCreateRequest, db: AsyncSession = Depends(get_db)):
    user_a = await crud.create_user(db, answers=request.answers)
    policy = await crud.create_policy(db, user_a_id=user_a.id)
    return schemas.PolicyCreateResponse(policy_id=policy.id, user_a_id=user_a.id)

@app.post("/submit-assessment", response_model=schemas.AssessmentSubmitResponse)
async def submit_assessment(request: schemas.AssessmentSubmitRequest, db: AsyncSession = Depends(get_db)):
    policy = await crud.get_policy(db, request.policy_id)
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
        
    if policy.status == "completed" or policy.user_b_id is not None:
        raise HTTPException(status_code=400, detail="Policy is already completed.")
        
    user_b = await crud.create_user(db, answers=request.answers)
    await crud.update_policy_with_user_b(db, policy=policy, user_b_id=user_b.id)
    
    return schemas.AssessmentSubmitResponse(message="Assessment submitted successfully.")

@app.get("/policy/{id}/results", response_model=schemas.PolicyResultsResponse)
async def get_policy_results(id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    policy = await crud.get_policy(db, id)
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
        
    if policy.status != "completed" or not policy.user_b_id:
        raise HTTPException(status_code=400, detail="Policy assessment not completed yet.")
        
    # Fetch user responses
    user_a = await crud.get_user(db, policy.user_a_id)
    user_b = await crud.get_user(db, policy.user_b_id)
    
    if not user_a or not user_b:
        raise HTTPException(status_code=500, detail="User references corrupted.")
        
    # Compute compatibility
    score, assets, risks = services.run_compatibility_algorithm(user_a.answers, user_b.answers)
    
    # Store insights if not already stored
    insight = await crud.get_insight_by_policy(db, id)
    if not insight:
        await crud.create_insight(
            db, 
            policy_id=id, 
            assets=json.dumps(assets), 
            risks=json.dumps(risks)
        )
        
    return schemas.PolicyResultsResponse(
        final_score=score,
        assets=assets,
        risks=risks
    )
