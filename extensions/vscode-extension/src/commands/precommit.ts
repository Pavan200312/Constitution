/* PROMPT_ID:F1.1-B4-cmd-precommit-fix DATE_ISO:2025-10-04 */
import * as vscode from 'vscode';
import { execFile } from 'child_process';
import * as path from 'path';
import { emit } from '../core/events';
import { EDGE_AGENT_PYTHON, RECEIPTS_FILE, EVT_RECEIPT_UPDATED, POLICY_PATH } from '../core/constants';
import { getRepoFingerprint } from '../utils/repo_fingerprint';

export async function runPrecommit(): Promise<void> {
  if (!EDGE_AGENT_PYTHON) throw Error("TODO[EVIDENCE_NEEDED:EDGE_AGENT_PYTHON]");
  if (!RECEIPTS_FILE) throw Error("TODO[EVIDENCE_NEEDED:RECEIPTS_FILE]");
  if (!EVT_RECEIPT_UPDATED) throw Error("TODO[EVIDENCE_NEEDED:EVT_RECEIPT_UPDATED]");

  const cwd = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || process.cwd();
  const fp = await getRepoFingerprint(cwd);

  const args = ['-m', 'edge_agent', 'precommit',
    '--repo_id', fp.repo_id, '--cwd', cwd, '--receipts_file', RECEIPTS_FILE];
  if (fp.branch) args.push('--branch', fp.branch);

  const env = { ...process.env };
  const srcDir = path.join(cwd, 'src');
  env.PYTHONPATH = env.PYTHONPATH ? `${srcDir}${path.delimiter}${env.PYTHONPATH}` : srcDir;
  if (!env.COAX_POLICY_SOURCE) env.COAX_POLICY_SOURCE = 'file';
  if (!env.COAX_POLICY_PATH && POLICY_PATH) env.COAX_POLICY_PATH = POLICY_PATH;

  await new Promise<void>((resolve, reject) => {
    execFile(EDGE_AGENT_PYTHON, args, { cwd, env }, (err, stdout) => {
      if (err) return reject(err);
      try { emit(EVT_RECEIPT_UPDATED, JSON.parse(stdout)); resolve(); }
      catch { reject(Error("TODO[EVIDENCE_NEEDED:cli_json]")); }
    });
  });
}