UPDATE "table_file" SET "name" = '' WHERE "name" IS NULL;
ALTER TABLE "table_file" ALTER COLUMN "name" SET NOT NULL;
