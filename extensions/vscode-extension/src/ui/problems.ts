// PROMPT_ID: F1.1-B6-problems-diagnostics-v1
// DATE_ISO: 2025-09-29

import * as vscode from 'vscode';
import { CMD_SHOW_LAST_RECEIPT } from '../core/constants';

let diagnostics: vscode.DiagnosticCollection | undefined;

export function initProblems(ctx: vscode.ExtensionContext): void {
    if (!CMD_SHOW_LAST_RECEIPT) {
        throw new Error("TODO[EVIDENCE_NEEDED:CMD_SHOW_LAST_RECEIPT]");
    }
    
    diagnostics = vscode.languages.createDiagnosticCollection('coaxcraft-risk');
    ctx.subscriptions.push(diagnostics);
}

export function updateProblems(receipt: any): void {
    if (!diagnostics) return;
    
    const root = vscode.workspace.workspaceFolders?.[0]?.uri || vscode.Uri.file(process.cwd());
    const targetUri = vscode.Uri.joinPath(root, '.coaxcraft', 'RISK');
    
    const band = String(receipt?.risk_band || 'Unknown');
    const factors = Array.isArray(receipt?.factors) ? receipt.factors.filter(Boolean).join(', ') : '—';
    const msg = `Why: Risk ${band} due to ${factors}.`;
    
    const diag = new vscode.Diagnostic(new vscode.Range(0, 0, 0, 0), msg, vscode.DiagnosticSeverity.Information);
    diag.code = { value: 'Open receipt', target: vscode.Uri.parse(`command:${CMD_SHOW_LAST_RECEIPT}`) };
    
    diagnostics.set(targetUri, [diag]);
}
