import { generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type { sqlClient } from "../../clients/sqlClient.js"
import { insertOne } from "../sql/insertOne.js"

type DatabaseType =
    | ReturnType<typeof sqlClient>
    | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]

export function generateRandomInvoiceReference(_periodStart: Date): string {
    let randomSuffix = generateId()
        .replaceAll(/[^a-zA-Z0-9]/g, "")
        .toUpperCase()
        .slice(0, 8)

    while (randomSuffix.length < 8) {
        randomSuffix += generateId()
            .replaceAll(/[^a-zA-Z0-9]/g, "")
            .toUpperCase()
        randomSuffix = randomSuffix.slice(0, 8)
    }

    return randomSuffix
}

/**
 * Finds the existing draft invoice for the given billing period, or creates a new one.
 * Invoice records are created on the first payment of the period; PDFs are generated later
 * by the monthly worker job.
 */
export async function findOrCreateCurrentPeriodInvoice(params: {
    database: DatabaseType
    idOrganization: string
    periodStart: Date
    periodEnd: Date
    now: Date
}): Promise<string> {
    const periodStartISO = params.periodStart.toISOString()

    const existing = await params.database
        .select({ id: models.invoice.id })
        .from(models.invoice)
        .where(
            and(
                eq(models.invoice.idOrganization, params.idOrganization),
                eq(models.invoice.startingAt, periodStartISO),
            ),
        )
        .limit(1)

    if (existing.length > 0 && existing[0]) {
        return existing[0].id
    }

    const reference = generateRandomInvoiceReference(params.periodStart)

    const invoiceId = generateId()
    await insertOne({
        database: params.database,
        table: models.invoice,
        data: {
            id: invoiceId,
            idOrganization: params.idOrganization,
            reference,
            startingAt: periodStartISO,
            endingAt: params.periodEnd.toISOString(),
            amountInCents: 0,
            currency: "EUR",
            xmlStorageKey: null,
            status: "draft",
            createdAt: params.now.toISOString(),
            lastUpdatedAt: null,
        },
    })

    return invoiceId
}

export function getCurrentMonthRange(date: Date) {
    const periodStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
    const periodEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, 23, 59, 59, 999))
    return { periodStart, periodEnd }
}
