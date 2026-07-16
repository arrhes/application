-- Migration 0029: Remove email validation columns from table_user
-- Email validation is no longer used - sign-up is immediate

ALTER TABLE table_user
DROP COLUMN IF EXISTS is_email_validated,
DROP COLUMN IF EXISTS email_to_validate,
DROP COLUMN IF EXISTS email_token,
DROP COLUMN IF EXISTS email_token_expires_at;
