-- PROMPT_ID: GSMD-DB-004-policy_versions-worm
-- DATE_ISO: 2025-10-04

-- Create trigger function to prevent modification of released policy versions
CREATE OR REPLACE FUNCTION gsmd.prevent_released_policy_modification()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.status = 'released' THEN
        RAISE EXCEPTION 'Cannot modify released policy version';
    END IF;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Create trigger on policy_versions table
CREATE TRIGGER policy_versions_worm_trigger
    BEFORE UPDATE OR DELETE ON gsmd.policy_versions
    FOR EACH ROW
    EXECUTE FUNCTION gsmd.prevent_released_policy_modification();
