"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runPrecommit = void 0;
/* PROMPT_ID:F1.1-B4-cmd-precommit-fix DATE_ISO:2025-10-04 */
const vscode = require("vscode");
const child_process_1 = require("child_process");
const path = require("path");
const events_1 = require("../core/events");
const constants_1 = require("../core/constants");
const repo_fingerprint_1 = require("../utils/repo_fingerprint");
async function runPrecommit() {
    if (!constants_1.EDGE_AGENT_PYTHON)
        throw Error("TODO[EVIDENCE_NEEDED:EDGE_AGENT_PYTHON]");
    if (!constants_1.RECEIPTS_FILE)
        throw Error("TODO[EVIDENCE_NEEDED:RECEIPTS_FILE]");
    if (!constants_1.EVT_RECEIPT_UPDATED)
        throw Error("TODO[EVIDENCE_NEEDED:EVT_RECEIPT_UPDATED]");
    const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd();
    const fp = await (0, repo_fingerprint_1.getRepoFingerprint)(cwd);
    const args = ['-m', 'edge_agent', 'precommit',
        '--repo_id', fp.repo_id, '--cwd', cwd, '--receipts_file', constants_1.RECEIPTS_FILE];
    if (fp.branch)
        args.push('--branch', fp.branch);
    const env = { ...process.env };
    const srcDir = path.join(cwd, 'src');
    env.PYTHONPATH = env.PYTHONPATH ? `${srcDir}${path.delimiter}${env.PYTHONPATH}` : srcDir;
    if (!env.COAX_POLICY_SOURCE)
        env.COAX_POLICY_SOURCE = 'file';
    if (!env.COAX_POLICY_PATH && constants_1.POLICY_PATH)
        env.COAX_POLICY_PATH = constants_1.POLICY_PATH;
    await new Promise((resolve, reject) => {
        (0, child_process_1.execFile)(constants_1.EDGE_AGENT_PYTHON, args, { cwd, env }, (err, stdout) => {
            if (err)
                return reject(err);
            try {
                (0, events_1.emit)(constants_1.EVT_RECEIPT_UPDATED, JSON.parse(stdout));
                resolve();
            }
            catch {
                reject(Error("TODO[EVIDENCE_NEEDED:cli_json]"));
            }
        });
    });
}
exports.runPrecommit = runPrecommit;
//# sourceMappingURL=precommit.js.map