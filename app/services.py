from typing import List, Tuple

def run_compatibility_algorithm(answers_a: List[int], answers_b: List[int]) -> Tuple[float, List[str], List[str]]:
    """
    Dummy implementation of the Compatibility Algorithm.
    Returns:
    - score: float (percentage 0 to 100)
    - assets: List[str]
    - risks: List[str]
    """
    # Simple algorithm based on minimizing the difference
    diff_sum = sum(abs(a - b) for a, b in zip(answers_a, answers_b))
    max_diff = 100 * 21  # Max difference per answer is 100
    
    score = ((max_diff - diff_sum) / max_diff) * 100
    
    assets = [
        "Compatible core values",
        "Similar lifestyle preferences"
    ]
    
    risks = [
        "Differences in financial planning"
    ]
    
    if score > 80:
        assets.append("Excellent overall alignment")
    elif score < 50:
        risks.append("Significant friction in major life goals")
        
    return round(score, 2), assets, risks
