// PROMPT_ID: F1.1-B10-constants-v1
// DATE_ISO: 2025-09-29

export const CMD_PRECOMMIT = 'coaxcraft.runPrecommit';
export const CMD_SHOW_LAST_RECEIPT = 'coaxcraft.showLastReceipt';
export const CMD_OPEN_ZEROUI_VIEW = 'coaxcraft.openZeroUIView';
export const EVT_RECEIPT_UPDATED = 'coaxcraft.receiptUpdated';

export const EDGE_AGENT_PYTHON = 'python'; // or full path to python.exe
export const RECEIPTS_FILE = 'evidence/evidence/receipts/receipts.jsonl';
// Path to your policy JSON used in file-mode:
export const POLICY_PATH = 'tests/fixtures/policies/policy_low_med_high.json';