# PROMPT_ID: F1.1-A3-policy-port-v1
# DATE_ISO: 2025-09-29

import json
from src.shared_libs.config.loader import get_policy_source, get_policy_path

def get_effective_policy(repo_id: str, branch: str | None = None) -> dict:
    source = get_policy_source()
    if source == 'svc':
        raise ValueError("TODO[EVIDENCE_NEEDED:service_url]")
    if source != 'file':
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_source_mode]")
    
    path = get_policy_path()
    if not path:
        raise ValueError("TODO[EVIDENCE_NEEDED:COAX_POLICY_PATH]")
    
    try:
        with open(path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_file_missing]")
    except json.JSONDecodeError:
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_json_invalid]")
    
    if not isinstance(data, dict):
        raise ValueError("TODO[EVIDENCE_NEEDED:policy_json_object]")
    return data
