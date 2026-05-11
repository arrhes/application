-- Move file/folder storage from year-scoped to organization-level
-- 1. Drop id_year from table_file and table_folder
-- 2. Update deduplication index to org+hash scope

-- Step 1: Drop id_year column from table_file
ALTER TABLE "table_file" DROP COLUMN IF EXISTS "id_year";

-- Step 2: Drop id_year column from table_folder
ALTER TABLE "table_folder" DROP COLUMN IF EXISTS "id_year";

-- Step 3: Drop old per-year deduplication index
DROP INDEX IF EXISTS "table_file_id_organization_id_year_hash_unique";

-- Step 4: Create new org-level deduplication index
CREATE UNIQUE INDEX IF NOT EXISTS "table_file_id_organization_hash_unique"
ON "table_file" ("id_organization", "hash")
WHERE "hash" IS NOT NULL;
