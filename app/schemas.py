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

class PolicyResultsResponse(BaseModel):
    final_score: float
    assets: List[str]
    risks: List[str]
