"use strict";
// PROMPT_ID: F1.1-B5-cmd-show-last-receipt-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.showLastReceipt = void 0;
const vscode = require("vscode");
const constants_1 = require("../core/constants");
async function showLastReceipt() {
    if (!constants_1.RECEIPTS_FILE) {
        throw new Error("TODO[EVIDENCE_NEEDED:RECEIPTS_FILE]");
    }
    const data = await vscode.workspace.fs.readFile(vscode.Uri.file(constants_1.RECEIPTS_FILE));
    const lines = data.toString().split('\n');
    let lastLine = '';
    for (let i = lines.length - 1; i >= 0; i--) {
        const trimmed = lines[i].trim();
        if (trimmed) {
            lastLine = trimmed;
            break;
        }
    }
    if (!lastLine) {
        throw new Error("TODO[EVIDENCE_NEEDED:no_receipts]");
    }
    let obj;
    try {
        obj = JSON.parse(lastLine);
    }
    catch {
        throw new Error("TODO[EVIDENCE_NEEDED:receipt_json_invalid]");
    }
    const doc = await vscode.workspace.openTextDocument({ language: 'json', content: JSON.stringify(obj, null, 2) });
    await vscode.window.showTextDocument(doc, { preview: true });
}
exports.showLastReceipt = showLastReceipt;
//# sourceMappingURL=show_last_receipt.js.map