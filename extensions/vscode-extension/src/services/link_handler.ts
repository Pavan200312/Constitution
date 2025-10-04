/* PROMPT_ID:F1.1-B9-link-handler-fix DATE_ISO:2025-10-04 */
import * as vscode from 'vscode';
import { CMD_SHOW_LAST_RECEIPT } from '../core/constants';

export function initLinkHandler(ctx: vscode.ExtensionContext): void {
  if (!CMD_SHOW_LAST_RECEIPT) throw Error("TODO[EVIDENCE_NEEDED:CMD_SHOW_LAST_RECEIPT]");

  const handler: vscode.UriHandler = {
    handleUri(uri: vscode.Uri): void {
      const path = uri.path.replace(/^\/+/, '');
      if (uri.scheme === 'coaxcraft' && path === 'receipt/latest') {
        (async () => { try { await vscode.commands.executeCommand(CMD_SHOW_LAST_RECEIPT); } catch { /* swallow */ } })();
      }
    }
  };

  ctx.subscriptions.push(vscode.window.registerUriHandler(handler));
}