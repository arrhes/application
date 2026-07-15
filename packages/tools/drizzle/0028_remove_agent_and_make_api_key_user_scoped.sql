-- Drop agent tables and LLM columns (agent feature removed in code)
DROP TABLE IF EXISTS "table_agent_message";
DROP TABLE IF EXISTS "table_agent_session";

ALTER TABLE "table_user"
    DROP COLUMN IF EXISTS "llm_api_key",
    DROP COLUMN IF EXISTS "llm_base_url",
    DROP COLUMN IF EXISTS "llm_model";

-- Make API keys user-scoped (nullable organization for personal keys)
ALTER TABLE "table_api_key"
    ALTER COLUMN "id_organization" DROP NOT NULL;
