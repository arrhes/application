-- Add token tracking to organization, agent sessions, and agent messages
-- Also add subagent support fields to agent messages

-- Organization: token-based billing
ALTER TABLE "table_organization"
ADD COLUMN "agent_tokens_current_month_usage" integer NOT NULL DEFAULT 0;

-- Agent session: running token aggregates
ALTER TABLE "table_agent_session"
ADD COLUMN "total_prompt_tokens" integer NOT NULL DEFAULT 0;

ALTER TABLE "table_agent_session"
ADD COLUMN "total_completion_tokens" integer NOT NULL DEFAULT 0;

ALTER TABLE "table_agent_session"
ADD COLUMN "total_tokens" integer NOT NULL DEFAULT 0;

-- Agent message: per-message token tracking
ALTER TABLE "table_agent_message"
ADD COLUMN "prompt_tokens" integer;

ALTER TABLE "table_agent_message"
ADD COLUMN "completion_tokens" integer;

ALTER TABLE "table_agent_message"
ADD COLUMN "total_tokens" integer;

-- Agent message: subagent support
ALTER TABLE "table_agent_message"
ADD COLUMN "subagent_role" text;

ALTER TABLE "table_agent_message"
ADD COLUMN "subagent_depth" integer NOT NULL DEFAULT 0;

ALTER TABLE "table_agent_message"
ADD COLUMN "id_parent_agent_message" text;

-- Foreign key for parent/child relationship
ALTER TABLE "table_agent_message"
ADD CONSTRAINT "table_agent_message_id_parent_agent_message_table_agent_message_id_fk"
FOREIGN KEY ("id_parent_agent_message") REFERENCES "table_agent_message"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

-- Index for parent message lookups
CREATE INDEX "table_agent_message_id_parent_agent_message_index"
ON "table_agent_message" ("id_parent_agent_message");
