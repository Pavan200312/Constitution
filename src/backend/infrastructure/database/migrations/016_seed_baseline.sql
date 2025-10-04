-- PROMPT_ID: GSMD-DB-016-seed-baseline
-- DATE_ISO: 2025-10-04

-- Insert baseline policy
INSERT INTO gsmd.policies (name, scope, created_by) 
VALUES ('baseline', 'global', 'seed');

-- Insert baseline policy version
INSERT INTO gsmd.policy_versions (policy_id, version, content, snapshot_hash, status, released_by)
SELECT 
    p.id,
    1,
    '{"policy_version_ids":["pv-baseline-1"],"risk_scoring":{"weights":{"loc":1,"file_count":2,"sensitive_paths_hit":5},"band_boundaries":{"Low":10,"Medium":30,"High":100}}}'::jsonb,
    encode(digest(cast('{"policy_version_ids":["pv-baseline-1"],"risk_scoring":{"weights":{"loc":1,"file_count":2,"sensitive_paths_hit":5},"band_boundaries":{"Low":10,"Medium":30,"High":100}}}'::jsonb as text), 'sha256'), 'hex'),
    'released',
    'seed'
FROM gsmd.policies p 
WHERE p.name = 'baseline';
