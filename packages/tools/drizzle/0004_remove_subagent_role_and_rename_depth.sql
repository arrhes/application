-- Agent message subagent metadata cleanup:
-- - remove unused subagent_role
-- - rename subagent_depth -> depth

ALTER TABLE "table_agent_message"
DROP COLUMN "subagent_role";

ALTER TABLE "table_agent_message"
RENAME COLUMN "subagent_depth" TO "depth";
