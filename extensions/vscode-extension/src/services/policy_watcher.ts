// PROMPT_ID: F1.1-B8-policy-watcher-v1
// DATE_ISO: 2025-09-29

import * as vscode from 'vscode';
import * as path from 'path';
import { runPrecommit } from '../commands/precommit';
import { POLICY_PATH } from '../core/constants';

export function initPolicyWatcher(ctx: vscode.ExtensionContext): void {
    if (!POLICY_PATH) {
        throw new Error("TODO[EVIDENCE_NEEDED:POLICY_PATH]");
    }
    
    const pat = new vscode.RelativePattern(path.dirname(POLICY_PATH), path.basename(POLICY_PATH));
    const watcher = vscode.workspace.createFileSystemWatcher(pat, false, false, false);
    
    const refresh = () => { runPrecommit().catch(() => {}); };
    
    watcher.onDidChange(refresh);
    watcher.onDidCreate(refresh);
    watcher.onDidDelete(refresh);
    
    ctx.subscriptions.push(watcher);
}
