from typing import List, Dict, Any

# 1. Weight Distribution Mapping (Indices 0 to 16)
WEIGHTS = {
    0: 0.04, 1: 0.04, 2: 0.05, 3: 0.04,
    4: 0.06, 5: 0.09, 6: 0.07, 7: 0.08,
    8: 0.05, 9: 0.06, 10: 0.07, 11: 0.07,
    12: 0.10, 13: 0.05, 14: 0.06, 15: 0.00,
    16: 0.07
}

# 4. Consistency Setup Mapping
# Handled specifically in calculate_consistency due to inverse mathematical correlations

def calculate_consistency(answers: List[int]) -> float:
    """Helper to calculate individual consistency based on buffer questions."""
    c = 1.0
    
    # Q17 (Sunday Vibe) vs Q1 (Itinerary Check): Direct alignment
    # 0 (Flow) matches 0 (Chaos). 100 (Itinerary) matches 100 (Spreadsheet)
    if abs(answers[17] - answers[1]) > 50:
        c -= 0.05
        
    # Q18 (Ledger Audit) vs Q5 (Capital Windfall): Inverse alignment. 
    # Savers (0) check balances frequently (100). Spenders (100) avoid balances (0).
    if abs(answers[18] - (100 - answers[5])) > 50:
        c -= 0.05
        
    # Q19 (Cancellation Reaction) vs Q2 (Social Strategy): Direct alignment
    # Relief (0) matches Quiet Corner (0). Disappointment (100) matches Work the Room (100).
    if abs(answers[19] - answers[2]) > 50:
        c -= 0.05
        
    # Q20 (Reassurance Loop) vs Q6 (Appreciation Currency): Inverse alignment.
    # 'Words' is 0 on Q6. Needing verbal confirmation is 100 on Q20.
    if abs(answers[20] - (100 - answers[6])) > 50:
        c -= 0.05

    # C cannot drop below 0.85
    return max(0.85, c)

def run_compatibility_algorithm(user_a_answers: List[int], user_b_answers: List[int]) -> Dict[str, Any]:
    """
    Computes compatibility score and outputs Assets and Risks based on absolute differences.
    """
    assets: List[int] = []
    risks: List[int] = []
    weighted_diff_sum = 0.0
    
    # 2 & 3. Base Score Calculation, Assets, and Risks (Indices 0 to 16)
    for i in range(17):
        diff = abs(user_a_answers[i] - user_b_answers[i])
        weight = WEIGHTS.get(i, 0.0)
        
        weighted_diff_sum += weight * diff
        
        # Asset: diff <= 10 on a question with weight >= 0.07
        if diff <= 10 and weight >= 0.07:
            assets.append(i)
            
        # Risk: diff >= 70 on any question
        if diff >= 70:
            risks.append(i)
            
    base_score = 100.0 - weighted_diff_sum
    
    # Calculate Consistency
    consistency_a = calculate_consistency(user_a_answers)
    consistency_b = calculate_consistency(user_b_answers)
    
    # 5. Final Score Execution
    final_score = base_score * (consistency_a * consistency_b)
    
    return {
        "final_score": round(final_score, 2),
        "base_score": round(base_score, 2),
        "assets": assets,
        "risks": risks,
        "consistency_a": round(consistency_a, 2),
        "consistency_b": round(consistency_b, 2)
    }
