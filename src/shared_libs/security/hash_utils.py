# PROMPT_ID: F1.1-A1-snapshot-hash-v1
# DATE_ISO: 2025-09-29

import hashlib
import json

def snapshot_hash(obj: dict) -> str:
    if not isinstance(obj, dict):
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_snapshot_object]")
    
    canonical = json.dumps(obj, sort_keys=True, separators=(',', ':'), ensure_ascii=False)
    return hashlib.sha256(canonical.encode('utf-8')).hexdigest()
