import {
    generateId,
    getTaxAmountFromHTInCents,
    models,
    OCR_PAGE_PRICE_IN_CENTS,
    type organizationBillingType,
    type organizationPaymentCategory,
} from "@arrhes/application-metadata"
import { eq, sql } from "drizzle-orm"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../exception.js"
import { insertOne } from "../sql/insertOne.js"
import { selectOne } from "../sql/selectOne.js"
import { updateOne } from "../sql/updateOne.js"
import { findOrCreateCurrentPeriodInvoice } from "./billingInvoice.js"

function getMonthRange(date: Date) {
    const periodStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
    const periodEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, 23, 59, 59, 999))

    return { periodStart, periodEnd }
}

export function formatAmountFromCents(cents: number): string {
    return (cents / 100).toFixed(2)
}

export function mapMollieRefundStatusToPaymentStatus(status: string): "pending" | "paid" | "failed" | "refunded" {
    if (status === "refunded") {
        return "paid"
    }

    if (status === "queued" || status === "pending" || status === "processing") {
        return "pending"
    }

    return "failed"
}

function getOrganizationPaymentFlowFromCategory(
    category: (typeof organizationPaymentCategory)[number],
): "debit" | "credit" {
    if (category === "top_up" || category === "setup") {
        return "debit"
    }

    return "credit"
}

export async function recordOrganizationPayment(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    idOrganization: string
    category: (typeof organizationPaymentCategory)[number]
    status: "pending" | "paid" | "failed" | "refunded"
    amountHTInCents?: number
    amountInCents?: number
    quantity?: number
    unitAmountHTInCents?: number
    amountTVAInCents?: number
    currency?: string
    description: string
    sequenceType?: string | null
    serviceType?: (typeof organizationBillingType)[number] | null
    molliePaymentId?: string | null
    periodStart?: string | null
    periodEnd?: string | null
    paidAt?: string | null
    idInvoice?: string
    createdBy: string | null
}) {
    const nowISO = new Date().toISOString()
    const now = new Date(nowISO)
    const resolvedAmountHTInCents = parameters.amountHTInCents ?? parameters.amountInCents ?? 0
    const isTaxableCategory = parameters.category === "subscription" || parameters.category === "wallet_spending"
    const defaultQuantity =
        parameters.serviceType === "ocr_pages_hundred"
            ? Math.max(Math.round(resolvedAmountHTInCents / OCR_PAGE_PRICE_IN_CENTS), 1)
            : 1
    const quantity = parameters.quantity ?? defaultQuantity
    const unitAmountHTInCents =
        parameters.unitAmountHTInCents ??
        (quantity > 0 ? Math.round(resolvedAmountHTInCents / quantity) : resolvedAmountHTInCents)
    const amountHTInCents = resolvedAmountHTInCents
    const amountTVAInCents =
        parameters.amountTVAInCents ?? (isTaxableCategory ? getTaxAmountFromHTInCents(amountHTInCents) : 0)
    const flow = getOrganizationPaymentFlowFromCategory(parameters.category)

    const effectiveDate =
        parameters.periodStart !== undefined && parameters.periodStart !== null
            ? new Date(parameters.periodStart)
            : parameters.paidAt !== undefined && parameters.paidAt !== null
                ? new Date(parameters.paidAt)
                : now

    const { periodStart, periodEnd } = getMonthRange(effectiveDate)
    const idInvoice =
        parameters.idInvoice ??
        (await findOrCreateCurrentPeriodInvoice({
            database: parameters.database,
            idOrganization: parameters.idOrganization,
            periodStart,
            periodEnd,
            now,
        }))

    // Keep organization wallet balance in sync when creating wallet-related payments.
    // Only apply deltas for statuses that should have an accounting effect at creation time.
    if (
        (parameters.category === "wallet_spending" && parameters.status === "paid") ||
        (parameters.category === "withdrawal" && parameters.status !== "failed")
    ) {
        await updateOne({
            database: parameters.database,
            table: models.organization,
            data: {
                walletBalanceInCents: sql`${models.organization.walletBalanceInCents} - ${amountHTInCents}`,
                lastUpdatedAt: nowISO,
                lastUpdatedBy: parameters.createdBy,
            },
            where: (table) => eq(table.id, parameters.idOrganization),
        })
    }

    if (parameters.category === "top_up" && parameters.status === "paid") {
        await updateOne({
            database: parameters.database,
            table: models.organization,
            data: {
                walletBalanceInCents: sql`${models.organization.walletBalanceInCents} + ${amountHTInCents}`,
                lastUpdatedAt: nowISO,
                lastUpdatedBy: parameters.createdBy,
            },
            where: (table) => eq(table.id, parameters.idOrganization),
        })
    }

    await insertOne({
        database: parameters.database,
        table: models.organizationPayment,
        data: {
            id: generateId(),
            idOrganization: parameters.idOrganization,
            category: parameters.category,
            flow,
            status: parameters.status,
            molliePaymentId: parameters.molliePaymentId ?? null,
            sequenceType: parameters.sequenceType ?? null,
            serviceType: parameters.serviceType ?? null,
            quantity,
            unitAmountHTInCents,
            amountHTInCents,
            amountTVAInCents,
            currency: parameters.currency ?? "EUR",
            description: parameters.description,
            periodStart: parameters.periodStart ?? null,
            periodEnd: parameters.periodEnd ?? null,
            paidAt: parameters.paidAt ?? (parameters.status === "paid" ? nowISO : null),
            idInvoice,
            createdAt: nowISO,
            lastUpdatedAt: null,
            createdBy: parameters.createdBy,
            lastUpdatedBy: null,
        },
    })
}

export async function debitOrganizationWallet(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    idOrganization: string
    idUser: string | null
    amountHTInCents: number
    quantity?: number
    unitAmountHTInCents?: number
    description: string
    serviceType?: (typeof organizationBillingType)[number] | null
}) {
    if (parameters.amountHTInCents <= 0) {
        return
    }

    const organization = await selectOne({
        database: parameters.database,
        table: models.organization,
        where: (table) => eq(table.id, parameters.idOrganization),
    })

    if (organization.walletBalanceInCents < parameters.amountHTInCents) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "Insufficient wallet balance",
            externalMessage: "Le solde du portefeuille est insuffisant pour cette opération.",
        })
    }

    await recordOrganizationPayment({
        database: parameters.database,
        idOrganization: parameters.idOrganization,
        category: "wallet_spending",
        status: "paid",
        amountHTInCents: parameters.amountHTInCents,
        quantity: parameters.quantity,
        unitAmountHTInCents: parameters.unitAmountHTInCents,
        description: parameters.description,
        serviceType: parameters.serviceType ?? null,
        createdBy: parameters.idUser,
    })
}

export async function creditOrganizationWallet(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    idOrganization: string
    idUser: string | null
    amountHTInCents: number
    quantity?: number
    unitAmountHTInCents?: number
    description: string
    serviceType?: (typeof organizationBillingType)[number] | null
}) {
    if (parameters.amountHTInCents <= 0) {
        return
    }

    await recordOrganizationPayment({
        database: parameters.database,
        idOrganization: parameters.idOrganization,
        category: "top_up",
        status: "paid",
        amountHTInCents: parameters.amountHTInCents,
        quantity: parameters.quantity,
        unitAmountHTInCents: parameters.unitAmountHTInCents,
        description: parameters.description,
        serviceType: parameters.serviceType ?? null,
        createdBy: parameters.idUser,
    })
}
