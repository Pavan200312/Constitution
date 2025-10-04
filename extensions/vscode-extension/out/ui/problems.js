"use strict";
// PROMPT_ID: F1.1-B6-problems-diagnostics-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProblems = exports.initProblems = void 0;
const vscode = require("vscode");
const constants_1 = require("../core/constants");
let diagnostics;
function initProblems(ctx) {
    if (!constants_1.CMD_SHOW_LAST_RECEIPT) {
        throw new Error("TODO[EVIDENCE_NEEDED:CMD_SHOW_LAST_RECEIPT]");
    }
    diagnostics = vscode.languages.createDiagnosticCollection('coaxcraft-risk');
    ctx.subscriptions.push(diagnostics);
}
exports.initProblems = initProblems;
function updateProblems(receipt) {
    if (!diagnostics)
        return;
    const root = vscode.workspace.workspaceFolders?.[0]?.uri || vscode.Uri.file(process.cwd());
    const targetUri = vscode.Uri.joinPath(root, '.coaxcraft', 'RISK');
    const band = String(receipt?.risk_band || 'Unknown');
    const factors = Array.isArray(receipt?.factors) ? receipt.factors.filter(Boolean).join(', ') : '—';
    const msg = `Why: Risk ${band} due to ${factors}.`;
    const diag = new vscode.Diagnostic(new vscode.Range(0, 0, 0, 0), msg, vscode.DiagnosticSeverity.Information);
    diag.code = { value: 'Open receipt', target: vscode.Uri.parse(`command:${constants_1.CMD_SHOW_LAST_RECEIPT}`) };
    diagnostics.set(targetUri, [diag]);
}
exports.updateProblems = updateProblems;
//# sourceMappingURL=problems.js.map