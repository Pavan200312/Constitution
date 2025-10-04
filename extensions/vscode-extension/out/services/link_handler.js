"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initLinkHandler = void 0;
/* PROMPT_ID:F1.1-B9-link-handler-fix DATE_ISO:2025-10-04 */
const vscode = require("vscode");
const constants_1 = require("../core/constants");
function initLinkHandler(ctx) {
    if (!constants_1.CMD_SHOW_LAST_RECEIPT)
        throw Error("TODO[EVIDENCE_NEEDED:CMD_SHOW_LAST_RECEIPT]");
    const handler = {
        handleUri(uri) {
            const path = uri.path.replace(/^\/+/, '');
            if (uri.scheme === 'coaxcraft' && path === 'receipt/latest') {
                (async () => { try {
                    await vscode.commands.executeCommand(constants_1.CMD_SHOW_LAST_RECEIPT);
                }
                catch { /* swallow */ } })();
            }
        }
    };
    ctx.subscriptions.push(vscode.window.registerUriHandler(handler));
}
exports.initLinkHandler = initLinkHandler;
//# sourceMappingURL=link_handler.js.map