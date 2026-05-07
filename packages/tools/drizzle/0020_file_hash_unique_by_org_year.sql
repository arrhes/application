ALTER TABLE "table_file"
DROP CONSTRAINT IF EXISTS "table_file_hash_unique";

CREATE UNIQUE INDEX IF NOT EXISTS "table_file_id_organization_id_year_hash_unique"
ON "table_file" ("id_organization", "id_year", "hash")
WHERE "hash" IS NOT NULL;
