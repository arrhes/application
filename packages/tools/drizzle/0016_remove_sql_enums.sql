ALTER TABLE "table_account"
ALTER COLUMN "balance_sheet_asset_column" TYPE varchar(32) USING "balance_sheet_asset_column"::text,
ALTER COLUMN "balance_sheet_asset_flow" TYPE varchar(32) USING "balance_sheet_asset_flow"::text,
ALTER COLUMN "balance_sheet_liability_column" TYPE varchar(32) USING "balance_sheet_liability_column"::text,
ALTER COLUMN "balance_sheet_liability_flow" TYPE varchar(32) USING "balance_sheet_liability_flow"::text,
ALTER COLUMN "type" TYPE varchar(16) USING "type"::text;

ALTER TABLE "table_agent_message"
ALTER COLUMN "state" TYPE varchar(16) USING "state"::text;

ALTER TABLE "table_balance_sheet"
ALTER COLUMN "side" TYPE varchar(16) USING "side"::text;

ALTER TABLE "table_computation_income_statement"
ALTER COLUMN "operation" TYPE varchar(16) USING "operation"::text;

ALTER TABLE "table_document"
ALTER COLUMN "type" TYPE varchar(64) USING "type"::text;

ALTER TABLE "table_invoice"
ALTER COLUMN "status" TYPE varchar(16) USING "status"::text;

ALTER TABLE "table_organization"
ALTER COLUMN "scope" TYPE varchar(32) USING "scope"::text;

ALTER TABLE "table_organization_payment"
ALTER COLUMN "category" TYPE varchar(32) USING "category"::text,
ALTER COLUMN "status" TYPE varchar(16) USING "status"::text;

ALTER TABLE "table_organization_subscription"
ALTER COLUMN "type" TYPE varchar(32) USING "type"::text,
ALTER COLUMN "status" TYPE varchar(16) USING "status"::text;

ALTER TABLE "table_organization_user"
ALTER COLUMN "status" TYPE varchar(16) USING "status"::text;

ALTER TABLE "table_ticket"
ALTER COLUMN "category" TYPE varchar(32) USING "category"::text,
ALTER COLUMN "status" TYPE varchar(16) USING "status"::text;

ALTER TABLE "table_worker_job"
ALTER COLUMN "status" TYPE varchar(16) USING "status"::text;

DROP TYPE IF EXISTS "enum_account_balance_sheet_flow";
DROP TYPE IF EXISTS "enum_account_balance_sheet_column";
DROP TYPE IF EXISTS "enum_account_type";
DROP TYPE IF EXISTS "enum_agent_message_state";
DROP TYPE IF EXISTS "enum_balance_sheet_side";
DROP TYPE IF EXISTS "enum_computation_incomeStatement_operation";
DROP TYPE IF EXISTS "enum_document_type";
DROP TYPE IF EXISTS "enum_invoice_status";
DROP TYPE IF EXISTS "enum_organization_scope";
DROP TYPE IF EXISTS "enum_organization_payment_status";
DROP TYPE IF EXISTS "enum_organization_payment_category";
DROP TYPE IF EXISTS "enum_organization_subscription_status";
DROP TYPE IF EXISTS "enum_organization_subscription_type";
DROP TYPE IF EXISTS "enum_organization_user_status";
DROP TYPE IF EXISTS "enum_ticket_status";
DROP TYPE IF EXISTS "enum_ticket_type";
DROP TYPE IF EXISTS "enum_worker_job_status";
