/* PROMPT_ID:F1.1-C15-windows-spawn-test-v1 DATE_ISO:2025-09-29 */
import * as assert from 'assert';
import * as vscode from 'vscode';
import { runPrecommit } from '../../commands/precommit';
import { EDGE_AGENT_PYTHON, RECEIPTS_FILE } from '../../core/constants';

describe('Windows spawn: execFile args array & spaces-safe', function () {
  this.timeout(8000);

  const cp: any = require('child_process');
  const originalExecFile = cp.execFile;

  before(() => {
    if (!EDGE_AGENT_PYTHON || !RECEIPTS_FILE) {
      // Skip if wiring not ready; avoid false negatives
      // @ts-ignore
      this.skip?.();
      return;
    }
    // Stub repo fingerprint to avoid real git and inject spacey path
    const fp = require('../../utils/repo_fingerprint');
    fp.getRepoFingerprint = async (_cwd?: string) => ({
      repo_id: 'rid',
      repo_root: 'C:\\Repo With Space',
      repo_remote: '',
      branch: 'main',
      commit: 'abc123',
      noGit: false
    });

    // Stub CLI exec to capture args and return a valid receipt
    cp.execFile = (cmd: string, args: string[], opts: any, cb: any) => {
      if (typeof opts === 'function') { cb = opts; opts = {}; }
      const receipt = {
        decision: 'evaluated',
        risk_band: 'Low',
        score: 1,
        factors: ['loc'],
        snapshot_hash: '0'.repeat(64),
        policy_version_ids: ['pv-1'],
        repo_id: 'rid',
        ts: 0
      };
      (cp as any).__last = { cmd, args, opts };
      cb(null, JSON.stringify(receipt), '');
    };
  });

  after(() => { cp.execFile = originalExecFile; });

  it('uses execFile with args array (no quoting) and safe cwd', async () => {
    await runPrecommit();

    const call = (require('child_process') as any).__last;
    assert.ok(call, 'execFile should have been called');

    const { cmd, args, opts } = call;
    assert.strictEqual(cmd, EDGE_AGENT_PYTHON, 'should invoke configured Python executable');

    assert.ok(Array.isArray(args), 'args must be an array');
    const s = (v: any) => String(v);
    const has = (x: string) => args.map(s).includes(x);

    // Required flags
    ['-m', 'edge_agent', 'precommit', '--repo_id', '--cwd', '--receipts_file'].forEach(f => {
      assert.ok(has(f), `missing arg: ${f}`);
    });

    // Optional branch may be present
    if (!has('--branch')) {
      // ok, command may omit when branch unknown; do not fail
    }

    // No shell quoting around any arg
    for (const a of args) {
      const str = String(a);
      assert.ok(!/^".*"$/.test(str) && !/^'.*'$/.test(str), `arg should not be quoted: ${str}`);
    }

    assert.strictEqual(typeof opts?.cwd, 'string', 'cwd should be a string');
  });
});
