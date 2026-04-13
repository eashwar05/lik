import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from . import models

async def create_user(db: AsyncSession, answers: list[int]) -> models.User:
    db_user = models.User(answers=answers)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_user(db: AsyncSession, user_id: uuid.UUID) -> models.User | None:
    stmt = select(models.User).where(models.User.id == user_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

async def create_policy(db: AsyncSession, user_a_id: uuid.UUID) -> models.Policy:
    db_policy = models.Policy(user_a_id=user_a_id)
    db.add(db_policy)
    await db.commit()
    await db.refresh(db_policy)
    return db_policy

async def get_policy(db: AsyncSession, policy_id: uuid.UUID) -> models.Policy | None:
    stmt = select(models.Policy).where(models.Policy.id == policy_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

async def update_policy_with_user_b(db: AsyncSession, policy: models.Policy, user_b_id: uuid.UUID) -> models.Policy:
    policy.user_b_id = user_b_id
    policy.status = "completed"
    await db.commit()
    await db.refresh(policy)
    return policy

async def get_insight_by_policy(db: AsyncSession, policy_id: uuid.UUID) -> models.Insight | None:
    stmt = select(models.Insight).where(models.Insight.policy_id == policy_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

async def create_insight(db: AsyncSession, policy_id: uuid.UUID, assets: str, risks: str) -> models.Insight:
    db_insight = models.Insight(policy_id=policy_id, assets=assets, risks=risks)
    db.add(db_insight)
    await db.commit()
    await db.refresh(db_insight)
    return db_insight
