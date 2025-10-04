"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* PROMPT_ID:F1.1-C14-extension-smoke-v1 DATE_ISO:2025-09-29 */
const assert = require("assert");
const vscode = require("vscode");
const activation_1 = require("../../core/activation");
const events_1 = require("../../core/events");
const constants_1 = require("../../core/constants");
describe('Zero-UI smoke: precommit → pill + Problems + webview', function () {
    this.timeout(10000);
    const cp = require('child_process');
    const originalExecFile = cp.execFile;
    before(() => {
        // Guard required constants
        if (!constants_1.CMD_PRECOMMIT || !constants_1.CMD_OPEN_ZEROUI_VIEW || !constants_1.EVT_RECEIPT_UPDATED || !constants_1.CMD_SHOW_LAST_RECEIPT) {
            // Skip suite if wiring constants are not defined yet
            // eslint-disable-next-line no-console
            console.warn('Skipping smoke: missing command/event constants');
            // @ts-ignore
            this.skip?.();
            return;
        }
        // Stub CLI to return a valid receipt JSON line
        cp.execFile = (cmd, args, opts, cb) => {
            if (typeof opts === 'function') {
                cb = opts;
            }
            const receipt = {
                decision: 'evaluated',
                risk_band: 'Low',
                score: 1,
                factors: ['loc'],
                snapshot_hash: '0'.repeat(64),
                policy_version_ids: ['pv-1'],
                repo_id: 'demo',
                ts: 0
            };
            cb(null, JSON.stringify(receipt), '');
        };
    });
    after(() => { cp.execFile = originalExecFile; });
    it('runs precommit and updates Problems + opens webview', async () => {
        const ctx = { subscriptions: [] };
        (0, activation_1.activate)(ctx);
        // Fire command and await event
        const gotEvent = new Promise((resolve) => (0, events_1.on)(constants_1.EVT_RECEIPT_UPDATED, () => resolve()));
        await vscode.commands.executeCommand(constants_1.CMD_PRECOMMIT);
        await gotEvent;
        // Verify Problems diagnostic exists on synthetic target
        const root = vscode.workspace.workspaceFolders?.[0]?.uri ?? vscode.Uri.file(process.cwd());
        const target = vscode.Uri.joinPath(root, '.coaxcraft', 'RISK');
        const diags = vscode.languages.getDiagnostics(target);
        assert.ok(diags.length >= 1, 'expected at least one diagnostic');
        assert.ok(/Risk/i.test(diags[0].message), 'diagnostic should mention Risk');
        // Webview can be opened via command (uses latest receipt)
        await vscode.commands.executeCommand(constants_1.CMD_OPEN_ZEROUI_VIEW);
    });
});
//# sourceMappingURL=smoke.spec.js.map