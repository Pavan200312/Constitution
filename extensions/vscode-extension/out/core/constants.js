"use strict";
// PROMPT_ID: F1.1-B10-constants-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLICY_PATH = exports.RECEIPTS_FILE = exports.EDGE_AGENT_PYTHON = exports.EVT_RECEIPT_UPDATED = exports.CMD_OPEN_ZEROUI_VIEW = exports.CMD_SHOW_LAST_RECEIPT = exports.CMD_PRECOMMIT = void 0;
exports.CMD_PRECOMMIT = 'coaxcraft.runPrecommit';
exports.CMD_SHOW_LAST_RECEIPT = 'coaxcraft.showLastReceipt';
exports.CMD_OPEN_ZEROUI_VIEW = 'coaxcraft.openZeroUIView';
exports.EVT_RECEIPT_UPDATED = 'coaxcraft.receiptUpdated';
exports.EDGE_AGENT_PYTHON = 'python'; // or full path to python.exe
exports.RECEIPTS_FILE = 'evidence/evidence/receipts/receipts.jsonl';
// Path to your policy JSON used in file-mode:
exports.POLICY_PATH = 'tests/fixtures/policies/policy_low_med_high.json';
//# sourceMappingURL=constants.js.map