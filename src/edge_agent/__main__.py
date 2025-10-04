# PROMPT_ID: F1.1-A8-cli-entrypoint-v1
# DATE_ISO: 2025-09-29

import argparse
import json
import sys
from src.edge_agent.cli.commands import run_precommit

def main():
    parser = argparse.ArgumentParser()
    subparsers = parser.add_subparsers(dest='command', required=True)
    
    precommit_parser = subparsers.add_parser('precommit')
    precommit_parser.add_argument('--repo_id', required=True, type=str)
    precommit_parser.add_argument('--branch', type=str, default=None)
    precommit_parser.add_argument('--cwd', type=str, default='.')
    precommit_parser.add_argument('--receipts_file', required=True, type=str)
    precommit_parser.add_argument('--sensitive_globs', nargs='*', default=[])
    
    args = parser.parse_args()
    
    if args.command == 'precommit':
        result = run_precommit(args.repo_id, args.branch, args.cwd, args.receipts_file, args.sensitive_globs)
        print(json.dumps(result, separators=(',', ':'), ensure_ascii=False))

if __name__ == '__main__':
    main()
