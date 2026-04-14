import os
import json
from typing import List, Dict, Any
from groq import Groq

# 1. Master Category Map
QUESTION_METADATA = {
    0: {"label": "Weekend Energy", "theme": "Lifestyle"},
    1: {"label": "Planning Style", "theme": "Lifestyle"},
    2: {"label": "Social Battery", "theme": "Lifestyle"},
    3: {"label": "Openness to Change", "theme": "Lifestyle"},
    4: {"label": "Domestic Habits", "theme": "Lifestyle"},
    5: {"label": "Money Mindset", "theme": "Core Values"},
    6: {"label": "Appreciation Language", "theme": "Core Values"},
    7: {"label": "Accountability", "theme": "Core Values"},
    8: {"label": "Future Vision", "theme": "Core Values"},
    9: {"label": "Life Priorities", "theme": "Core Values"},
    10: {"label": "Stress Response", "theme": "Risk/Conflict"},
    11: {"label": "Attachment Style", "theme": "Risk/Conflict"},
    12: {"label": "Conflict Resolution", "theme": "Risk/Conflict"},
    13: {"label": "Independence Needs", "theme": "Risk/Conflict"},
    14: {"label": "Vulnerability", "theme": "Risk/Conflict"},
    15: {"label": "Adaptability", "theme": "Risk/Conflict"},
    16: {"label": "Core Dealbreakers", "theme": "Risk/Conflict"}
}

def fallback_underwriting_report(assets: List[int], risks: List[int]) -> Dict[str, Any]:
    """Smart Template Fallback if Groq API fails."""
    asset_list = []
    for a in assets:
        meta = QUESTION_METADATA.get(a, {"label": "Unknown", "theme": "General"})
        asset_list.append({
            "title": f"Strong alignment in {meta['label']} detected.",
            "description": f"Your shared {meta['theme']} alignment securely bolsters relationship solvency.",
            "value": 85,
            "icon": "diamond"
        })
        
    risk_list = []
    for r in risks:
        meta = QUESTION_METADATA.get(r, {"label": "Unknown", "theme": "General"})
        risk_list.append({
            "title": f"Volatility risk on {meta['label']}.",
            "description": f"Actively insure against policy friction regarding your {meta['label']} through deliberate communication.",
            "value": 45,
            "icon": "shield"
        })
        
    return {
        "summary": "AI Underwriter temporarily offline. Core metrics have been tabulated strictly by structural directives.",
        "assets": asset_list,
        "risks": risk_list
    }

def generate_underwriting_report(assets: List[int], risks: List[int]) -> Dict[str, Any]:
    """Hits Groq as primary, falls back to Gemini, and uses Smart Template as a last resort."""
    groq_api_key = os.environ.get("GROQ_API_KEY")
    gemini_api_key = os.environ.get("GEMINI_API_KEY")
    
    asset_labels = [QUESTION_METADATA.get(a, {}).get("label", str(a)) for a in assets]
    risk_labels = [QUESTION_METADATA.get(r, {}).get("label", str(r)) for r in risks]
    
    system_prompt = (
        "You are the Lead Underwriter for LIK (Love Insurance Kompany). "
        "Your tone is sophisticated, cinematic, and 'luxury.' You treat relationship compatibility "
        "like a high-stakes insurance policy. Use terms like 'Risk Mitigation,' 'Policy Assets,' 'Solvency,' "
        "and 'Coverage Gaps.' Your goal is to provide deep, analytical insight into why certain traits match or clash.\n\n"
        "Return ONLY a strictly valid JSON object adhering EXACTLY to this schema:\n"
        "{\n"
        '  "summary": "AI-generated high-level summary of the policy in 2 sentences.",\n'
        '  "assets": [{"title": "Asset Name", "description": "2-sentence why this provides relationship solvency.", "value": 90, "icon": "diamond"}],\n'
        '  "risks": [{"title": "Risk Vector", "description": "2-sentence mitigation strategy.", "value": 30, "icon": "shield"}]\n'
        "}\n"
        "Value should be an integer between 0-100 indicating intensity. Icon should be either 'diamond', 'zap', or 'shield'."
    )
    user_prompt = f"Analyze this policy.\nAssets: {asset_labels}\nRisks: {risk_labels}"

    # Priority 1: Groq API
    if groq_api_key:
        try:
            client = Groq(api_key=groq_api_key)
            completion = client.chat.completions.create(
                model="llama3-70b-8192",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            content = completion.choices[0].message.content
            if content:
                print("Generated output using Groq API.")
                return json.loads(content)
        except Exception as e:
            print(f"Groq API Error: {e}. Cascading to Gemini...")
            
    # Priority 2: Gemini API
    if gemini_api_key:
        try:
            from google import genai
            from google.genai import types
            client = genai.Client(api_key=gemini_api_key)
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=user_prompt,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                    response_mime_type="application/json",
                    temperature=0.7,
                )
            )
            content = response.text
            if content:
                print("Generated output using Gemini API.")
                return json.loads(content)
        except Exception as e:
            print(f"Gemini API Error: {e}. Cascading to Smart Template...")

    # Priority 3: Smart Template Fallback
    print("Falling back to local Smart Template.")
    return fallback_underwriting_report(assets, risks)
