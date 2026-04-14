import uuid
from typing import List
from pydantic import BaseModel, conlist, Field, ConfigDict

class PolicyCreateRequest(BaseModel):
    answers: List[int] = Field(
        ..., 
        min_length=21, 
        max_length=21, 
        description="Array of 21 integers (values from 0 to 100)"
    )

class PolicyCreateResponse(BaseModel):
    policy_id: uuid.UUID
    user_a_id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)

class AssessmentSubmitRequest(BaseModel):
    policy_id: uuid.UUID
    answers: List[int] = Field(
        ..., 
        min_length=21, 
        max_length=21, 
        description="Array of 21 integers (values from 0 to 100)"
    )

class AssessmentSubmitResponse(BaseModel):
    message: str

class AssetResponse(BaseModel):
    title: str
    description: str
    value: int
    icon: str

class RiskResponse(BaseModel):
    title: str
    description: str
    value: int
    icon: str

class PolicyResultsResponse(BaseModel):
    score: float
    summary: str
    assets: List[AssetResponse]
    risks: List[RiskResponse]
    consistencyScore: float
