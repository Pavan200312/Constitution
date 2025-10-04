# PROMPT_ID: F1.1-A2-receipt-schema-v1
# DATE_ISO: 2025-09-29

import re

REQUIRED_KEYS = {"decision", "risk_band", "score", "factors", "snapshot_hash", "policy_version_ids", "repo_id", "ts"}

def validate(d: dict) -> bool:
    if not isinstance(d, dict) or not REQUIRED_KEYS.issubset(d.keys()):
        return False
    
    checks = [
        isinstance(d["decision"], str) and d["decision"],
        isinstance(d["risk_band"], str) and d["risk_band"],
        isinstance(d["score"], int),
        isinstance(d["factors"], list) and all(isinstance(f, str) for f in d["factors"]),
        isinstance(d["snapshot_hash"], str) and re.match(r'^[0-9a-f]{64}$', d["snapshot_hash"]),
        isinstance(d["policy_version_ids"], list) and all(isinstance(p, str) and p for p in d["policy_version_ids"]),
        isinstance(d["repo_id"], str) and d["repo_id"],
        isinstance(d["ts"], (int, float))
    ]
    return all(checks)
