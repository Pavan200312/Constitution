# PROMPT_ID: F1.1-A2-config-accessors-v1
# DATE_ISO: 2025-09-29

import os

def _get(k: str) -> str | None:
    v = os.getenv(k)
    return v.strip() if v else None

def get_policy_source() -> str | None:
    v = _get("COAX_POLICY_SOURCE")
    return v.lower() if v else None

def get_policy_path() -> str | None:
    return _get("COAX_POLICY_PATH")

def get_receipts_file() -> str | None:
    return _get("COAX_RECEIPTS_FILE")

def get_edge_agent_path() -> str | None:
    return _get("COAX_EDGE_AGENT_PATH")
