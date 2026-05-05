ALTER TABLE IF EXISTS "table_dashboard_user" RENAME TO "table_user";
ALTER TABLE IF EXISTS "table_dashboard_user_session" RENAME TO "table_user_session";

ALTER TABLE IF EXISTS "table_ticket_message"
DROP CONSTRAINT IF EXISTS "table_ticket_message_id_admin_user_table_admin_user_id_fk";

ALTER TABLE IF EXISTS "table_ticket_message"
ADD CONSTRAINT "table_ticket_message_id_admin_user_table_user_id_fk"
FOREIGN KEY ("id_admin_user") REFERENCES "table_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

DROP TABLE IF EXISTS "table_admin_user_session";
DROP TABLE IF EXISTS "table_admin_user";
