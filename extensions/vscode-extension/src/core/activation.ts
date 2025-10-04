// PROMPT_ID: F1.1-B10-activation-wiring-v1
// DATE_ISO: 2025-09-29

import * as vscode from 'vscode';
import { on } from './events';
import { CMD_RUN_PRECOMMIT, CMD_SHOW_LAST_RECEIPT, CMD_OPEN_ZEROUI_VIEW, EVT_RECEIPT_UPDATED } from './constants';
import { runPrecommit } from '../commands/precommit';
import { showLastReceipt } from '../commands/show_last_receipt';
import { initStatusBar, updateStatusBar } from '../ui/status_bar';
import { initProblems, updateProblems } from '../ui/problems';
import { initRiskWebview, showRiskCard } from '../ui/webview_provider';
import { initLinkHandler } from '../services/link_handler';
import { initPolicyWatcher } from '../services/policy_watcher';

let latest: any;

export function activate(ctx: vscode.ExtensionContext): void {
    if (!CMD_RUN_PRECOMMIT || !CMD_SHOW_LAST_RECEIPT || !CMD_OPEN_ZEROUI_VIEW || !EVT_RECEIPT_UPDATED) {
        throw new Error("TODO[EVIDENCE_NEEDED:constants]");
    }
    
    initStatusBar(ctx); initProblems(ctx); initRiskWebview(ctx); initLinkHandler(ctx); initPolicyWatcher(ctx);
    
    on(EVT_RECEIPT_UPDATED, (r) => { latest = r; updateStatusBar(String(r?.risk_band || '—')); updateProblems(r); showRiskCard(r); });
    
    ctx.subscriptions.push(
        vscode.commands.registerCommand(CMD_RUN_PRECOMMIT, runPrecommit),
        vscode.commands.registerCommand(CMD_SHOW_LAST_RECEIPT, showLastReceipt),
        vscode.commands.registerCommand(CMD_OPEN_ZEROUI_VIEW, () => showRiskCard(latest || {}))
    );
}

export function deactivate(): void {
    // no-op
}

