"use strict";
// PROMPT_ID: F1.1-B7-webview-risk-card-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.showRiskCard = exports.initRiskWebview = void 0;
const vscode = require("vscode");
let panel;
function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function initRiskWebview(ctx) {
    // no-op for symmetry
}
exports.initRiskWebview = initRiskWebview;
function showRiskCard(receipt) {
    if (panel) {
        panel.reveal();
    }
    else {
        panel = vscode.window.createWebviewPanel('coaxcraft-risk', 'Zero UI — Risk Card', vscode.ViewColumn.One);
        panel.onDidDispose(() => { panel = undefined; });
    }
    const band = escapeHtml(String(receipt?.risk_band ?? 'Unknown'));
    const factors = Array.isArray(receipt?.factors) && receipt.factors.length ? escapeHtml(receipt.factors.join(', ')) : '—';
    const policyIds = Array.isArray(receipt?.policy_version_ids) && receipt.policy_version_ids.length ? escapeHtml(receipt.policy_version_ids.join(', ')) : '—';
    const snap = typeof receipt?.snapshot_hash === 'string' ? escapeHtml(receipt.snapshot_hash) : '—';
    panel.webview.html = `<h1>Risk: ${band}</h1><p>Factors: ${factors}</p><p>Next steps: Review policy ${policyIds} (snapshot ${snap}) in GSMD.</p>`;
}
exports.showRiskCard = showRiskCard;
//# sourceMappingURL=webview_provider.js.map