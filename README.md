# LIK: Love Insurance Kompany

A premium, high-fidelity full-stack web application designed to mathematically underwrite relationship solvency. LIK evaluates partners ("co-beneficiaries") via a deeply calibrated 21-index assessment matrix and dynamically generates an AI-powered Risk and Asset Underwriting Report.

---

## 🚀 Architecture & Tech Stack

**Frontend (The UI Layer):**
- **Framework::** React + Vite (TypeScript)
- **Styling:** TailwindCSS (Cinematic, hyper-minimalist dark mode)
- **Animation:** Motion (Framer Motion for fluid page transitions)
- **Social:** Open Graph Metadata configured for immersive Slack/iMessage/WhatsApp preview cards.

**Backend (The Intelligence Engine):**
- **Framework:** FastAPI (High-performance asynchronous API)
- **Database:** PostgreSQL (Hosted on Neon)
- **ORM Workflow:** SQLAlchemy (Async session mapping) + Alembic (Schema migrations)
- **AI Core:** Multi-Tier LLM Architecture (Groq Primary inference, Gemini fallback logic, static templates for high-load protection)
- **Security:** In-memory route rate-limiting via SlowAPI

---

## 💻 Local Development Setup

### 1. Requirements
Ensure you have the following installed:
- Node.js (v18+)
- Python (3.11+)
- PostgreSQL Database URL (Neon or Local)

### 2. Environment Variables
Create two environment files in the root of the project:

**.env** (Backend API Secrets)
```env
# Neon Postgres Database Connection (Required)
DATABASE_URL="postgresql+asyncpg://user:password@<host-url>/dbname?ssl=require"

# AI Inference Keys
GROQ_API_KEY="your-groq-key"
GEMINI_API_KEY="your-gemini-key"
```

**.env.local** (Frontend Secrets)
```env
# Required when testing Frontend API connections (Empty for proxying, specify Render URL for Production)
VITE_API_URL="" 
```

### 3. Start the Backend (FastAPI)
Open a terminal in the project root:
```bash
# 1. Activate the Virtual Environment
./venv/scripts/activate  # (Windows)
# source venv/bin/activate # (Mac/Linux)

# 2. Install dependencies
pip install -r requirements.txt

# 3. Initialize the database schema (Alembic)
alembic upgrade head

# 4. Start the API Engine
uvicorn app.main:app --reload
```
The backend engine will spin up on `http://localhost:8000`.

### 4. Start the Frontend (Vite)
Open a separate terminal in the project root:
```bash
# 1. Install Node Dependencies
npm install

# 2. Start the Vite Dev Server
npm run dev
```
The React UI will automatically load at `http://localhost:5173`. Any API calls to `/api` will be proxied automatically to `localhost:8000`.

---

## 🗄️ Database Migrations (Alembic)

When modifying `models.py` (e.g., adding a new column to a table), do not drop tables manually. Use Alembic to securely push alterations:

```bash
# 1. Automatically generate the migration script
alembic revision --autogenerate -m "Description of your database change"

# 2. Push the changes to your Neon PostgreSQL instance
alembic upgrade head
```

---

## 🌍 Production Deployment

### Expanding the Backend (Render)
1. Fork/Push this repository to GitHub.
2. Link the repository to a new **Web Service** on **Render.com**.
3. *Build Command:* `pip install -r requirements.txt`
4. *Start Command:* `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Inject your `DATABASE_URL`, `GROQ_API_KEY`, and `GEMINI_API_KEY` in the Render Environment Variables dashboard.

### Expanding the Frontend (Vercel)
1. Link the repository to a new Project on **Vercel.com**.
2. Vercel will automatically detect `Vite`. Leave build parameters untouched.
3. Inject the Render Backend URL inside Environment Variables:
   - Key: `VITE_API_URL`
   - Value: `https://your-render-url.onrender.com`
4. Deploy!
