// PROMPT_ID: F1.1-B4-cmd-precommit-v1
// DATE_ISO: 2025-09-29

import * as vscode from 'vscode';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { emit } from '../core/events';
import { EDGE_AGENT_PYTHON, RECEIPTS_FILE, EVT_RECEIPT_UPDATED } from '../core/constants';
import { getRepoFingerprint } from '../utils/repo_fingerprint';

const execFileAsync = promisify(execFile);

export async function runPrecommit(): Promise<void> {
    if (!EDGE_AGENT_PYTHON || !RECEIPTS_FILE || !EVT_RECEIPT_UPDATED) {
        throw new Error("TODO[EVIDENCE_NEEDED:constants]");
    }
    
    const fp = await getRepoFingerprint();
    const args = ['-m', 'edge_agent', 'precommit', '--repo_id', fp.repo_id, '--receipts_file', RECEIPTS_FILE];
    if (fp.branch) args.push('--branch', fp.branch);
    
    const { stdout } = await execFileAsync(EDGE_AGENT_PYTHON, args, { cwd: fp.repo_root });
    const receipt = JSON.parse(stdout.trim());
    emit(EVT_RECEIPT_UPDATED, receipt);
}
