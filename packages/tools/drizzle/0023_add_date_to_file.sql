-- Add optional content date to table_file (e.g. invoice date, distinct from createdAt)
ALTER TABLE "table_file" ADD COLUMN "date" TIMESTAMP WITH TIME ZONE;
