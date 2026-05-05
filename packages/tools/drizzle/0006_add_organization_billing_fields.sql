ALTER TABLE "table_organization"
ADD COLUMN "licence_amount" integer NOT NULL DEFAULT 0;

ALTER TABLE "table_organization"
ADD COLUMN "storage_max_usage" integer NOT NULL DEFAULT 1073741824;

ALTER TABLE "table_organization"
ADD COLUMN "ocr_pages_total_left" integer NOT NULL DEFAULT 100;

ALTER TABLE "table_organization"
ADD COLUMN "ocr_pages_total_used" integer NOT NULL DEFAULT 0;

ALTER TABLE "table_organization"
ADD COLUMN "tokens_total_left" integer NOT NULL DEFAULT 1000000;

ALTER TABLE "table_organization"
ADD COLUMN "tokens_total_used" integer NOT NULL DEFAULT 0;

UPDATE "table_organization"
SET
    "licence_amount" = COALESCE(
        (
            SELECT SUM(subscription."amount_in_cents")
            FROM "table_organization_subscription" AS subscription
            WHERE subscription."id_organization" = "table_organization"."id"
              AND subscription."type" = 'support'
              AND subscription."status" = 'active'
        ),
        0
    ),
    "storage_max_usage" = "storage_limit",
    "ocr_pages_total_left" = GREATEST("ocr_monthly_limit" - "ocr_current_month_pages_usage", 0),
    "ocr_pages_total_used" = "ocr_current_month_pages_usage",
    "tokens_total_left" = GREATEST("agent_tokens_monthly_limit" - "agent_tokens_current_month_usage", 0),
    "tokens_total_used" = "agent_tokens_current_month_usage";