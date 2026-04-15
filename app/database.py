import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from dotenv import load_dotenv
import redis.asyncio as aioredis

load_dotenv(".env")
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://lik_admin:password@localhost:5432/lik_db")
REDIS_URL = os.getenv("REDIS_URL")

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

# --- Redis Connection ---
_redis_client: aioredis.Redis | None = None

async def get_redis() -> aioredis.Redis:
    """Returns a singleton async Redis client."""
    global _redis_client
    if _redis_client is None:
        if not REDIS_URL:
            raise RuntimeError("REDIS_URL is not set in environment variables.")
        _redis_client = aioredis.from_url(REDIS_URL, decode_responses=True)
    return _redis_client

async def close_redis():
    """Gracefully close the Redis connection pool."""
    global _redis_client
    if _redis_client:
        await _redis_client.aclose()
        _redis_client = None

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
