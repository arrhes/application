ALTER TABLE "table_organization_payment"
ADD COLUMN "quantity" integer NOT NULL DEFAULT 1,
ADD COLUMN "unit_amount_in_cents" integer NOT NULL DEFAULT 0;

UPDATE "table_organization_payment"
SET
    "quantity" = CASE
        WHEN "service_type" = 'ocr_pages_hundred' AND "amount_in_cents" > 0 THEN "amount_in_cents"
        ELSE 1
    END,
    "unit_amount_in_cents" = CASE
        WHEN "service_type" = 'ocr_pages_hundred' AND "amount_in_cents" > 0 THEN 1
        WHEN "amount_in_cents" > 0 THEN "amount_in_cents"
        ELSE 0
    END;