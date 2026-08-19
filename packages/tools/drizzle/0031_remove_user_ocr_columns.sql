-- Remove per-user BYOK OCR credentials (now provided via environment variables)
ALTER TABLE table_user
    DROP COLUMN IF EXISTS ocr_endpoint,
    DROP COLUMN IF EXISTS ocr_api_key,
    DROP COLUMN IF EXISTS ocr_model;
