"use strict";
// PROMPT_ID: F1.1-B3-status-bar-pill-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatusBar = exports.initStatusBar = void 0;
const vscode = require("vscode");
const constants_1 = require("../core/constants");
let statusBarItem;
function initStatusBar(ctx) {
    if (!constants_1.CMD_OPEN_ZEROUI_VIEW) {
        throw new Error("TODO[EVIDENCE_NEEDED:CMD_OPEN_ZEROUI_VIEW]");
    }
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBarItem.text = "Risk: —";
    statusBarItem.command = constants_1.CMD_OPEN_ZEROUI_VIEW;
    statusBarItem.tooltip = "Click to open risk card";
    statusBarItem.show();
    ctx.subscriptions.push(statusBarItem);
}
exports.initStatusBar = initStatusBar;
function updateStatusBar(band) {
    if (statusBarItem) {
        statusBarItem.text = `Risk: ${band || '—'}`;
    }
}
exports.updateStatusBar = updateStatusBar;
//# sourceMappingURL=status_bar.js.map