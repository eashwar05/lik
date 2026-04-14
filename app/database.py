import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv

load_dotenv(".env")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://lik_admin:password@localhost:5432/lik_db")

if DATABASE_URL.startswith("postgresql://"):
    base_url = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
    if "?" in base_url:
        base_url = base_url.split("?")[0]
    DATABASE_URL = base_url + "?ssl=require"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
