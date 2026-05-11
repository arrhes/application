ALTER TABLE "table_organization"
RENAME COLUMN "pending_licence_amount" TO "licence_amount_pending";

ALTER TABLE "table_organization"
RENAME COLUMN "pending_storage_max_usage" TO "storage_limit_pending";

ALTER TABLE "table_organization"
RENAME COLUMN "ocr_pages_total_left" TO "ocr_pages_total_available";

ALTER TABLE "table_organization"
RENAME COLUMN "tokens_total_left" TO "tokens_total_available";

ALTER TABLE "table_organization"
DROP COLUMN IF EXISTS "storage_max_usage";

ALTER TABLE "table_organization"
DROP COLUMN IF EXISTS "usage_month_start_at";

ALTER TABLE "table_organization"
DROP COLUMN IF EXISTS "ocr_current_month_pages_usage";

ALTER TABLE "table_organization"
DROP COLUMN IF EXISTS "agent_tokens_current_month_usage";

ALTER TABLE "table_organization"
DROP COLUMN IF EXISTS "ocr_monthly_limit";

ALTER TABLE "table_organization"
DROP COLUMN IF EXISTS "agent_tokens_monthly_limit";
