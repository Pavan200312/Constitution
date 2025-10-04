// PROMPT_ID: F1.1-B3-status-bar-pill-v1
// DATE_ISO: 2025-09-29

import * as vscode from 'vscode';
import { CMD_OPEN_ZEROUI_VIEW } from '../core/constants';

let statusBarItem: vscode.StatusBarItem | undefined;

export function initStatusBar(ctx: vscode.ExtensionContext): void {
    if (!CMD_OPEN_ZEROUI_VIEW) {
        throw new Error("TODO[EVIDENCE_NEEDED:CMD_OPEN_ZEROUI_VIEW]");
    }
    
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBarItem.text = "Risk: —";
    statusBarItem.command = CMD_OPEN_ZEROUI_VIEW;
    statusBarItem.tooltip = "Click to open risk card";
    statusBarItem.show();
    ctx.subscriptions.push(statusBarItem);
}

export function updateStatusBar(band: string): void {
    if (statusBarItem) {
        statusBarItem.text = `Risk: ${band || '—'}`;
    }
}
