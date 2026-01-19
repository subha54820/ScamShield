import re

SCAM_KEYWORDS = [
    "urgent", "win", "lottery", "free", "click now",
    "verify account", "limited time", "payment required",
    "offer expires", "bank blocked"
]

def analyze_message(text):
    score = 0
    reasons = []

    text_lower = text.lower()

    for word in SCAM_KEYWORDS:
        if word in text_lower:
            score += 2
            reasons.append(f"Suspicious keyword detected: '{word}'")

    urls = re.findall(r'(https?://\S+)', text)
    if urls:
        score += 3
        reasons.append("Message contains suspicious links")

    if len(text) < 15:
        score += 1
        reasons.append("Very short message")

    if score >= 6:
        risk = "High Risk"
    elif score >= 3:
        risk = "Medium Risk"
    else:
        risk = "Safe"

    return {
        "risk_level": risk,
        "score": score,
        "reasons": reasons
    }
