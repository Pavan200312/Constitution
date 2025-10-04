# PROMPT_ID: F1.1-A7-precommit-runner-v1
# DATE_ISO: 2025-09-29

import time
from src.edge_agent.utils.git_utils import collect_staged_stats
from src.edge_agent.services.policy_port import get_effective_policy
from src.shared_libs.security.hash_utils import snapshot_hash
from src.edge_agent.services.risk_evaluator import evaluate_risk
from src.edge_agent.services.receipt_service import write_receipt

def run_precommit(repo_id: str, branch: str | None = None, cwd: str = ".", 
                  receipts_file: str | None = None, sensitive_globs: list[str] | None = None) -> dict:
    if not receipts_file or not isinstance(receipts_file, str):
        raise ValueError("TODO[EVIDENCE_NEEDED:receipts_file_path]")
    
    diff_stats = collect_staged_stats(cwd, sensitive_globs or [])
    policy = get_effective_policy(repo_id, branch)
    policy_version_ids = policy.get("policy_version_ids")
    if not isinstance(policy_version_ids, list):
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_version_ids]")
    
    risk_result = evaluate_risk(diff_stats, policy)
    receipt = {"decision": "evaluated", "risk_band": risk_result["risk_band"], "score": risk_result["score"],
               "factors": risk_result["factors"], "snapshot_hash": snapshot_hash(policy), 
               "policy_version_ids": policy_version_ids, "repo_id": repo_id, "ts": time.time()}
    write_receipt(receipt, receipts_file)
    return receipt
