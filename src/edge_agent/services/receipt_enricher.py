# PROMPT_ID: F1.1-A9-receipt-enricher-v1
# DATE_ISO: 2025-09-29

import re

def attach_policy_refs(receipt: dict, policy: dict, snapshot_hash: str) -> dict:
    if not isinstance(receipt, dict):
        raise ValueError("TODO[EVIDENCE_NEEDED:receipt_object]")
    if not isinstance(policy, dict):
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_object]")
    if not isinstance(snapshot_hash, str) or not re.match(r'^[0-9a-f]{64}$', snapshot_hash):
        raise ValueError("TODO[EVIDENCE_NEEDED:snapshot_hash]")
    
    policy_version_ids = policy.get("policy_version_ids")
    if not isinstance(policy_version_ids, list) or not all(isinstance(x, str) and x for x in policy_version_ids):
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_version_ids]")
    
    out = receipt.copy()
    out["policy_version_ids"] = policy_version_ids
    out["snapshot_hash"] = snapshot_hash
    return out
