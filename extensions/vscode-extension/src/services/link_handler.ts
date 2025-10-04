// PROMPT_ID: F1.1-B9-link-handler-v1
// DATE_ISO: 2025-09-29

import * as vscode from 'vscode';
import { CMD_SHOW_LAST_RECEIPT } from '../core/constants';

export function initLinkHandler(ctx: vscode.ExtensionContext): void {
    if (!CMD_SHOW_LAST_RECEIPT) {
        throw new Error("TODO[EVIDENCE_NEEDED:CMD_SHOW_LAST_RECEIPT]");
    }
    
    const handler = (uri: vscode.Uri) => {
        if (uri.scheme === 'coaxcraft' && uri.path.replace(/^\/+/, '') === 'receipt/latest') {
            vscode.commands.executeCommand(CMD_SHOW_LAST_RECEIPT).catch(() => {});
        }
    };
    
    const disposable = vscode.window.registerUriHandler(handler);
    ctx.subscriptions.push(disposable);
}
