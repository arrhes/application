ALTER TABLE "table_organization_payment"
ADD COLUMN "amount_ht_in_cents" integer NOT NULL DEFAULT 0,
ADD COLUMN "amount_tva_in_cents" integer NOT NULL DEFAULT 0;

UPDATE "table_organization_payment"
SET
    "amount_ht_in_cents" = "amount_in_cents",
    "amount_tva_in_cents" = CASE
        WHEN "category" IN ('subscription', 'wallet_spending') THEN ROUND("amount_in_cents" * 0.20)
        ELSE 0
    END;