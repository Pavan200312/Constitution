-- PROMPT_ID: GSMD-DB-001-bootstrap
-- DATE_ISO: 2025-10-04

-- Enable pgcrypto extension if available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create gsmd schema if not exists
CREATE SCHEMA IF NOT EXISTS gsmd;

-- Set search path to gsmd, public
SET search_path TO gsmd, public;
