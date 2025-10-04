"use strict";
// PROMPT_ID: F1.1-B10-activation-wiring-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const events_1 = require("./events");
const constants_1 = require("./constants");
const precommit_1 = require("../commands/precommit");
const show_last_receipt_1 = require("../commands/show_last_receipt");
const status_bar_1 = require("../ui/status_bar");
const problems_1 = require("../ui/problems");
const webview_provider_1 = require("../ui/webview_provider");
const link_handler_1 = require("../services/link_handler");
const policy_watcher_1 = require("../services/policy_watcher");
let latest;
function activate(ctx) {
    if (!constants_1.CMD_PRECOMMIT || !constants_1.CMD_SHOW_LAST_RECEIPT || !constants_1.CMD_OPEN_ZEROUI_VIEW || !constants_1.EVT_RECEIPT_UPDATED) {
        throw new Error("TODO[EVIDENCE_NEEDED:constants]");
    }
    (0, status_bar_1.initStatusBar)(ctx);
    (0, problems_1.initProblems)(ctx);
    (0, webview_provider_1.initRiskWebview)(ctx);
    (0, link_handler_1.initLinkHandler)(ctx);
    (0, policy_watcher_1.initPolicyWatcher)(ctx);
    (0, events_1.on)(constants_1.EVT_RECEIPT_UPDATED, (r) => { latest = r; (0, status_bar_1.updateStatusBar)(String(r?.risk_band || '—')); (0, problems_1.updateProblems)(r); (0, webview_provider_1.showRiskCard)(r); });
    ctx.subscriptions.push(vscode.commands.registerCommand(constants_1.CMD_PRECOMMIT, precommit_1.runPrecommit), vscode.commands.registerCommand(constants_1.CMD_SHOW_LAST_RECEIPT, show_last_receipt_1.showLastReceipt), vscode.commands.registerCommand(constants_1.CMD_OPEN_ZEROUI_VIEW, () => (0, webview_provider_1.showRiskCard)(latest || {})));
}
exports.activate = activate;
function deactivate() {
    // no-op
}
exports.deactivate = deactivate;
//# sourceMappingURL=activation.js.map