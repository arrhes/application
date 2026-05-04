ALTER TABLE "table_organization_payment"
ADD COLUMN IF NOT EXISTS "flow" varchar(16);

UPDATE "table_organization_payment"
SET "flow" = CASE
    WHEN "category" IN ('top_up', 'setup') THEN 'debit'
    ELSE 'credit'
END
WHERE "flow" IS NULL;

ALTER TABLE "table_organization_payment"
ALTER COLUMN "flow" SET NOT NULL;
