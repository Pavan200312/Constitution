-- PROMPT_ID: GSMD-DB-005-repo_bindings
-- DATE_ISO: 2025-10-04

-- Create repo_bindings table
CREATE TABLE gsmd.repo_bindings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    repo_id text NOT NULL,
    branch text,
    policy_version_id uuid NOT NULL REFERENCES gsmd.policy_versions(id),
    precedence smallint NOT NULL CHECK (precedence BETWEEN 1 AND 100),
    UNIQUE (repo_id, COALESCE(branch,''), precedence)
);
