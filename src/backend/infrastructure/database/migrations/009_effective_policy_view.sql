-- PROMPT_ID: GSMD-DB-009-effective-policy-view
-- DATE_ISO: 2025-10-04

-- Create effective policy view
CREATE OR REPLACE VIEW gsmd.effective_policy AS
SELECT DISTINCT ON (rb.repo_id, COALESCE(rb.branch, ''))
    rb.repo_id,
    rb.branch,
    rb.policy_version_id,
    pv.content,
    pv.snapshot_hash
FROM gsmd.repo_bindings rb
JOIN gsmd.policy_versions pv ON rb.policy_version_id = pv.id
WHERE pv.status = 'released'
ORDER BY rb.repo_id, COALESCE(rb.branch, ''), rb.precedence ASC;
