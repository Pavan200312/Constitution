"use strict";
// PROMPT_ID: F1.1-B8-policy-watcher-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.initPolicyWatcher = void 0;
const vscode = require("vscode");
const path = require("path");
const precommit_1 = require("../commands/precommit");
const constants_1 = require("../core/constants");
function initPolicyWatcher(ctx) {
    if (!constants_1.POLICY_PATH) {
        throw new Error("TODO[EVIDENCE_NEEDED:POLICY_PATH]");
    }
    const pat = new vscode.RelativePattern(path.dirname(constants_1.POLICY_PATH), path.basename(constants_1.POLICY_PATH));
    const watcher = vscode.workspace.createFileSystemWatcher(pat, false, false, false);
    const refresh = () => { (0, precommit_1.runPrecommit)().catch(() => { }); };
    watcher.onDidChange(refresh);
    watcher.onDidCreate(refresh);
    watcher.onDidDelete(refresh);
    ctx.subscriptions.push(watcher);
}
exports.initPolicyWatcher = initPolicyWatcher;
//# sourceMappingURL=policy_watcher.js.map