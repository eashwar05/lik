import os
import random
from dotenv import load_dotenv

# Load env file and patch connection string for async
load_dotenv(".env")
db_url = os.environ.get("DATABASE_URL")
if db_url and db_url.startswith("postgresql://"):
    base_url = db_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    if "?" in base_url:
        base_url = base_url.split("?")[0]
    os.environ["DATABASE_URL"] = base_url + "?ssl=require"

from fastapi.testclient import TestClient
from app.main import app

def run_tests():
    print("Initializing TestClient (This will start up the app and create DB tables)...")
    
    # We must use a context manager to trigger startup events in TestClient
    with TestClient(app) as client:
        # Step 1: Create Policy (User A)
        print("\n--- Testing POST /policy/create ---")
        answers_a = [random.randint(0, 100) for _ in range(21)]
        response_create = client.post("/policy/create", json={"answers": answers_a})
        
        if response_create.status_code == 200:
            data = response_create.json()
            policy_id = data["policy_id"]
            user_a_id = data["user_a_id"]
            print(f"SUCCESS: Policy created!")
            print(f"Policy ID: {policy_id}")
            print(f"User A ID: {user_a_id}")
        else:
            print(f"FAILED: {response_create.status_code}")
            print(response_create.text)
            return

        # Step 2: Submit Assessment (User B)
        print("\n--- Testing POST /submit-assessment ---")
        answers_b = [random.randint(0, 100) for _ in range(21)]
        response_submit = client.post("/submit-assessment", json={
            "policy_id": policy_id,
            "answers": answers_b
        })
        
        if response_submit.status_code == 200:
            print("SUCCESS: Assessment submitted!")
            print(response_submit.json())
        else:
            print(f"FAILED: {response_submit.status_code}")
            print(response_submit.text)
            return
            
        # Step 3: Get Results
        print("\n--- Testing GET /policy/{id}/results ---")
        response_results = client.get(f"/policy/{policy_id}/results")
        
        if response_results.status_code == 200:
            print("SUCCESS: Results retrieved!")
            results = response_results.json()
            print(f"Final Score: {results['score']}")
            print(f"Assets: {results['assets']}")
            print(f"Risks: {results['risks']}")
        else:
            print(f"FAILED: {response_results.status_code}")
            print(response_results.text)
            return
            
    print("\nAll integration tests passed successfully!")

if __name__ == "__main__":
    run_tests()
