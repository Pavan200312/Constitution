# PROMPT_ID: F1.1-C13-evaluator-determinism-tests-v1
# DATE_ISO: 2025-09-29

from src.edge_agent.services.risk_evaluator import evaluate_risk

policy = {
    "policy_version_ids": ["pv-1"],
    "risk_scoring": {
        "weights": {"loc": 1.0, "file_count": 2.0, "sensitive_paths_hit": 5.0},
        "band_boundaries": {"Low": 10, "Medium": 30, "High": 100}
    }
}

diff_stats = {"loc": 4, "file_count": 2, "sensitive_paths_hit": 0}

def test_same_inputs_yield_identical_output():
    result1 = evaluate_risk(diff_stats.copy(), policy.copy())
    result2 = evaluate_risk(diff_stats.copy(), policy.copy())
    assert result1 == result2
    assert result1["risk_band"] == result2["risk_band"]
    assert result1["score"] == result2["score"]
    assert result1["factors"] == result2["factors"]

def test_policy_key_order_does_not_change_result():
    policy_reordered = {
        "risk_scoring": {
            "band_boundaries": {"Low": 10, "Medium": 30, "High": 100},
            "weights": {"loc": 1.0, "file_count": 2.0, "sensitive_paths_hit": 5.0}
        },
        "policy_version_ids": ["pv-1"]
    }
    result1 = evaluate_risk(diff_stats, policy)
    result2 = evaluate_risk(diff_stats, policy_reordered)
    assert result1 == result2

def test_factors_are_sorted_and_match_nonzero_drivers():
    result = evaluate_risk(diff_stats, policy)
    factors = result["factors"]
    assert isinstance(factors, list)
    assert factors == sorted(factors)
    expected_drivers = [k for k, v in diff_stats.items() if v > 0]
    assert set(factors) == set(expected_drivers)
