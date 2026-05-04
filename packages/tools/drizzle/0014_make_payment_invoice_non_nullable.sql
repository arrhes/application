WITH payments_without_invoice AS (
    SELECT
        p.id,
        p.id_organization,
        date_trunc('month', COALESCE(p.period_start, p.paid_at, p.created_at)) AS month_start
    FROM "table_organization_payment" p
    WHERE p.id_invoice IS NULL
),
invoice_candidates AS (
    SELECT
        pwi.id_organization,
        pwi.month_start,
        (date_trunc('month', pwi.month_start) + INTERVAL '1 month - 1 millisecond') AS month_end,
        SUM(p.amount_in_cents)::integer AS amount_in_cents,
        'MIGR-' || upper(substr(md5(pwi.id_organization || pwi.month_start::text), 1, 8)) AS reference
    FROM payments_without_invoice pwi
    INNER JOIN "table_organization_payment" p ON p.id = pwi.id
    GROUP BY pwi.id_organization, pwi.month_start
),
inserted_invoices AS (
    INSERT INTO "table_invoice" (
        "id",
        "id_organization",
        "invoice_number",
        "period_start",
        "period_end",
        "amount_in_cents",
        "currency",
        "storage_key",
        "status",
        "created_at",
        "last_updated_at"
    )
    SELECT
        'inv_migr_' || lower(replace(substr(md5(ic.id_organization || ic.month_start::text || random()::text), 1, 20), '-', '')),
        ic.id_organization,
        ic.reference,
        ic.month_start,
        ic.month_end,
        ic.amount_in_cents,
        'EUR',
        NULL,
        'draft',
        NOW(),
        NULL
    FROM invoice_candidates ic
    WHERE NOT EXISTS (
        SELECT 1
        FROM "table_invoice" i
        WHERE
            i.id_organization = ic.id_organization
            AND date_trunc('month', i.period_start) = ic.month_start
    )
)
UPDATE "table_organization_payment" p
SET "id_invoice" = i.id
FROM (
    SELECT
        min(i.id) AS id,
        i.id_organization,
        date_trunc('month', i.period_start) AS month_start
    FROM "table_invoice" i
    GROUP BY i.id_organization, date_trunc('month', i.period_start)
) i
WHERE
    p.id_invoice IS NULL
    AND p.id_organization = i.id_organization
    AND date_trunc('month', COALESCE(p.period_start, p.paid_at, p.created_at)) = i.month_start;

ALTER TABLE "table_organization_payment"
DROP CONSTRAINT IF EXISTS "table_organization_payment_id_invoice_table_invoice_id_fk";

ALTER TABLE "table_organization_payment"
ALTER COLUMN "id_invoice" SET NOT NULL;

ALTER TABLE "table_organization_payment"
ADD CONSTRAINT "table_organization_payment_id_invoice_table_invoice_id_fk"
FOREIGN KEY ("id_invoice") REFERENCES "table_invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
