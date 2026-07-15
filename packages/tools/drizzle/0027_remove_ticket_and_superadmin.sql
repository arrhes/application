-- Drop ticket tables and superadmin column (feature removed in code)
DROP TABLE IF EXISTS "table_ticket_message";
DROP TABLE IF EXISTS "table_ticket";

ALTER TABLE "table_user" DROP COLUMN IF EXISTS "is_super_admin";
