# PROMPT_ID: F1.1-C12-schema-negatives-tests-v1
# DATE_ISO: 2025-09-29

from src.shared_libs.audit.receipt_schema import validate

def valid_receipt():
    return {
        "decision": "evaluated",
        "risk_band": "Low",
        "score": 0,
        "factors": [],
        "snapshot_hash": "0" * 64,
        "policy_version_ids": ["pv-1"],
        "repo_id": "demo",
        "ts": 0
    }

def test_valid_minimal_receipt_passes():
    assert validate(valid_receipt()) is True

def test_missing_snapshot_hash_fails():
    receipt = valid_receipt()
    del receipt["snapshot_hash"]
    assert validate(receipt) is False

def test_missing_policy_version_ids_fails():
    receipt = valid_receipt()
    del receipt["policy_version_ids"]
    assert validate(receipt) is False

def test_bad_snapshot_hash_format_fails():
    receipt = valid_receipt()
    receipt["snapshot_hash"] = "abc"
    assert validate(receipt) is False
