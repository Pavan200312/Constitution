# PROMPT_ID: F1.1-A4-risk-evaluator-v1
# DATE_ISO: 2025-09-29

def evaluate_risk(diff_stats: dict, policy: dict) -> dict:
    risk_scoring = policy.get("risk_scoring")
    if not isinstance(risk_scoring, dict):
        raise ValueError("TODO[EVIDENCE_NEEDED:policy.risk_scoring]")
    
    weights = risk_scoring.get("weights")
    band_boundaries = risk_scoring.get("band_boundaries")
    if not isinstance(weights, dict) or not isinstance(band_boundaries, dict):
        raise ValueError("TODO[EVIDENCE_NEEDED:policy.risk_scoring]")
    
    score = sum(float(weights.get(k, 0)) * float(diff_stats.get(k, 0)) for k in weights)
    sorted_bands = sorted(band_boundaries.items(), key=lambda x: float(x[1]))
    risk_band = sorted_bands[-1][0]
    for band, threshold in sorted_bands:
        if float(threshold) >= score:
            risk_band = band
            break
    factors = sorted([k for k in weights if diff_stats.get(k, 0) != 0 and float(weights.get(k, 0)) != 0])
    return {"risk_band": risk_band, "score": int(score), "factors": factors}
