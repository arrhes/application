-- Agent message schema refactor:
-- - rename assistant response column from content -> output
-- - allow nullable user_message for delegated/subagent rows
-- - store serialized LLM request payload in input

ALTER TABLE "table_agent_message"
RENAME COLUMN "content" TO "output";

ALTER TABLE "table_agent_message"
ADD COLUMN "input" text;

ALTER TABLE "table_agent_message"
ALTER COLUMN "user_message" DROP NOT NULL;
