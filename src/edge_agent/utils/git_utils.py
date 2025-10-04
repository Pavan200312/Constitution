# PROMPT_ID: F1.1-A5-diff-stats-v1
# DATE_ISO: 2025-09-29

import subprocess
import fnmatch

def collect_staged_stats(cwd: str, sensitive_globs: list[str] | None = None) -> dict:
    try:
        result = subprocess.run(['git', 'diff', '--staged', '--numstat', '--no-renames'], 
                              cwd=cwd, capture_output=True, text=True, check=True)
        lines = [line.strip() for line in result.stdout.split('\n') if line.strip()]
    except (subprocess.CalledProcessError, FileNotFoundError):
        return {"loc": 0, "file_count": 0, "sensitive_paths_hit": 0}
    
    loc, sensitive_paths = 0, set()
    for line in lines:
        parts = line.split('\t', 2)
        if len(parts) >= 3:
            added = 0 if parts[0] == '-' else int(parts[0])
            deleted = 0 if parts[1] == '-' else int(parts[1])
            loc += added + deleted
            if sensitive_globs:
                for pattern in sensitive_globs:
                    if fnmatch.fnmatch(parts[2], pattern) and parts[2] not in sensitive_paths:
                        sensitive_paths.add(parts[2])
    
    return {"loc": loc, "file_count": len(lines), "sensitive_paths_hit": len(sensitive_paths)}
