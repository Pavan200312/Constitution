"use strict";
// PROMPT_ID: F1.1-B2-repo-fingerprint-v1
// DATE_ISO: 2025-09-29
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRepoFingerprint = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const crypto_1 = require("crypto");
const execFileAsync = (0, util_1.promisify)(child_process_1.execFile);
async function getRepoFingerprint(cwd) {
    const dir = cwd || process.cwd();
    try {
        const [root, remote, branch, commit] = await Promise.all([
            execFileAsync('git', ['rev-parse', '--show-toplevel'], { cwd: dir }),
            execFileAsync('git', ['config', '--get', 'remote.origin.url'], { cwd: dir }),
            execFileAsync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd: dir }),
            execFileAsync('git', ['rev-parse', '--short', 'HEAD'], { cwd: dir })
        ]);
        const repo_root = root.stdout.trim();
        const repo_remote = remote.stdout.trim();
        const branchName = branch.stdout.trim();
        const commitHash = commit.stdout.trim();
        const repo_id = (0, crypto_1.createHash)('sha256').update(repo_remote || repo_root || dir).digest('hex').substring(0, 12);
        return { repo_id, repo_root, repo_remote, branch: branchName, commit: commitHash, noGit: false };
    }
    catch {
        const repo_id = (0, crypto_1.createHash)('sha256').update(dir).digest('hex').substring(0, 12);
        return { repo_id, repo_root: dir, repo_remote: '', branch: '', commit: '', noGit: true };
    }
}
exports.getRepoFingerprint = getRepoFingerprint;
//# sourceMappingURL=repo_fingerprint.js.map