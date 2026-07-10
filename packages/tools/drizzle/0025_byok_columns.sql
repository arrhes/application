-- Drop billing tables
DROP TABLE IF EXISTS table_organization_payment;
DROP TABLE IF EXISTS table_organization_subscription;
DROP TABLE IF EXISTS table_invoice;

-- Remove billing columns from table_organization
ALTER TABLE table_organization
    DROP COLUMN IF EXISTS siren,
    DROP COLUMN IF EXISTS email,
    DROP COLUMN IF EXISTS mollie_customer_id,
    DROP COLUMN IF EXISTS licence_amount,
    DROP COLUMN IF EXISTS licence_amount_pending,
    DROP COLUMN IF EXISTS storage_limit_pending,
    DROP COLUMN IF EXISTS wallet_balance_in_cents,
    DROP COLUMN IF EXISTS ocr_pages_total_available,
    DROP COLUMN IF EXISTS ocr_pages_total_used,
    DROP COLUMN IF EXISTS tokens_total_available,
    DROP COLUMN IF EXISTS tokens_total_used;

-- Add BYOK storage columns to table_organization
ALTER TABLE table_organization
    ADD COLUMN storage_endpoint text,
    ADD COLUMN storage_access_key text,
    ADD COLUMN storage_secret_key text,
    ADD COLUMN storage_bucket_name text,
    ADD COLUMN storage_region varchar(64);

-- Add BYOK LLM/OCR columns to table_user
ALTER TABLE table_user
    ADD COLUMN llm_provider varchar(32),
    ADD COLUMN llm_api_key text,
    ADD COLUMN llm_base_url text,
    ADD COLUMN llm_model varchar(128),
    ADD COLUMN ocr_api_key text;
