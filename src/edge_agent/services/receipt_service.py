# PROMPT_ID: F1.1-A6-receipt-writer-v1
# DATE_ISO: 2025-09-29

import json
import os

def write_receipt(receipt: dict, path: str) -> None:
    if not isinstance(path, str) or not path:
        raise ValueError("TODO[EVIDENCE_NEEDED:receipts_file_path]")
    
    if not isinstance(receipt, dict):
        raise ValueError("TODO[EVIDENCE_NEEDED:receipt_object]")
    
    os.makedirs(os.path.dirname(path), exist_ok=True)
    
    with open(path, 'a', encoding='utf-8') as f:
        json.dump(receipt, f, separators=(',', ':'), ensure_ascii=False)
        f.write('\n')
