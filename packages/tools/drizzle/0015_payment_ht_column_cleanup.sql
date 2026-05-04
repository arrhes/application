ALTER TABLE "table_organization_payment"
DROP COLUMN IF EXISTS "mollie_subscription_id";

ALTER TABLE "table_organization_payment"
DROP COLUMN IF EXISTS "amount_in_cents";

ALTER TABLE "table_organization_payment"
RENAME COLUMN "unit_amount_in_cents" TO "unit_amount_ht_in_cents";
