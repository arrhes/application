-- Add references JSONB column to agent messages for @ mention support
ALTER TABLE "table_agent_message"
ADD COLUMN "references" jsonb;
