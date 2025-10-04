-- PROMPT_ID: GSMD-DB-008-jsonb-index
-- DATE_ISO: 2025-10-04

-- Create GIN index on policy_versions content for JSONB queries
CREATE INDEX IF NOT EXISTS policy_versions_content_gin ON gsmd.policy_versions USING gin (content jsonb_path_ops);
