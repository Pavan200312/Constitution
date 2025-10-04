-- PROMPT_ID: GSMD-DB-003-policy_versions
-- DATE_ISO: 2025-10-04

-- Create policy_versions table
CREATE TABLE gsmd.policy_versions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id uuid NOT NULL REFERENCES gsmd.policies(id),
    version int NOT NULL,
    content jsonb NOT NULL,
    snapshot_hash char(64) NOT NULL,
    status text NOT NULL CHECK (status IN ('draft','released','archived')),
    released_at timestamptz,
    released_by text,
    created_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (policy_id, version),
    UNIQUE (snapshot_hash),
    CHECK (snapshot_hash ~ '^[0-9a-f]{64}$')
);
