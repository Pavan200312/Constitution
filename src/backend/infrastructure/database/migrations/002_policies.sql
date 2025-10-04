-- PROMPT_ID: GSMD-DB-002-policies
-- DATE_ISO: 2025-10-04

-- Create policies table
CREATE TABLE gsmd.policies (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text UNIQUE NOT NULL,
    scope text NOT NULL CHECK (scope IN ('global','org','repo','branch')),
    scope_ref text,
    created_at timestamptz NOT NULL DEFAULT now(),
    created_by text NOT NULL
);
