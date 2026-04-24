-- Add flexible subscription and invoice tables
-- Also add per-org resource limits to organization

-- New enums
CREATE TYPE "enum_organization_subscription_status" AS ENUM ('active', 'cancelled');
CREATE TYPE "enum_organization_subscription_type" AS ENUM ('support', 'storage_gb', 'agent_tokens_million', 'ocr_pages_hundred');
CREATE TYPE "enum_invoice_status" AS ENUM ('draft', 'generated', 'paid');

-- New table: organization subscriptions (replaces single mollieSubscriptionId on org)
CREATE TABLE "table_organization_subscription" (
    "id" text PRIMARY KEY NOT NULL,
    "id_organization" text NOT NULL REFERENCES "table_organization"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "type" "enum_organization_subscription_type" NOT NULL,
    "quantity" integer NOT NULL DEFAULT 1,
    "amount_in_cents" integer NOT NULL,
    "mollie_subscription_id" text,
    "status" "enum_organization_subscription_status" NOT NULL DEFAULT 'active',
    "starts_at" timestamp NOT NULL,
    "ends_at" timestamp,
    "created_at" timestamp NOT NULL,
    "last_updated_at" timestamp,
    "created_by" text REFERENCES "table_dashboard_user"("id") ON DELETE SET NULL ON UPDATE CASCADE,
    "last_updated_by" text REFERENCES "table_dashboard_user"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE INDEX ON "table_organization_subscription" ("id_organization");

-- New table: invoices (generated monthly as PDF)
CREATE TABLE "table_invoice" (
    "id" text PRIMARY KEY NOT NULL,
    "id_organization" text NOT NULL REFERENCES "table_organization"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    "invoice_number" text NOT NULL,
    "period_start" timestamp NOT NULL,
    "period_end" timestamp NOT NULL,
    "amount_in_cents" integer NOT NULL,
    "currency" varchar(3) NOT NULL DEFAULT 'EUR',
    "storage_key" text,
    "status" "enum_invoice_status" NOT NULL DEFAULT 'draft',
    "created_at" timestamp NOT NULL,
    "last_updated_at" timestamp
);

CREATE INDEX ON "table_invoice" ("id_organization");

-- Add per-org resource limits to organization
ALTER TABLE "table_organization"
ADD COLUMN "ocr_monthly_limit" integer NOT NULL DEFAULT 100;

ALTER TABLE "table_organization"
ADD COLUMN "agent_tokens_monthly_limit" integer NOT NULL DEFAULT 1000000;

-- Link payments to invoices
ALTER TABLE "table_organization_payment"
ADD COLUMN "id_invoice" text REFERENCES "table_invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
