import {
    generateId,
    models,
    type organizationPaymentCategory,
    type organizationSubscriptionType,
} from "@arrhes/application-metadata"
import { eq, sql } from "drizzle-orm"
import type { sqlClient } from "../../clients/sqlClient.js"
import { Exception } from "../exception.js"
import { insertOne } from "../sql/insertOne.js"
import { selectOne } from "../sql/selectOne.js"
import { updateOne } from "../sql/updateOne.js"

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

export async function recordOrganizationPayment(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    idOrganization: string
    category: (typeof organizationPaymentCategory)[number]
    status: "pending" | "paid" | "failed" | "refunded"
    amountInCents: number
    currency?: string
    description: string
    sequenceType?: string | null
    serviceType?: (typeof organizationSubscriptionType)[number] | null
    molliePaymentId?: string | null
    mollieSubscriptionId?: string | null
    periodStart?: string | null
    periodEnd?: string | null
    paidAt?: string | null
    idInvoice?: string | null
    createdBy: string | null
}) {
    const nowISO = new Date().toISOString()

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
                walletBalanceInCents: sql`${models.organization.walletBalanceInCents} - ${parameters.amountInCents}`,
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
                walletBalanceInCents: sql`${models.organization.walletBalanceInCents} + ${parameters.amountInCents}`,
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
            status: parameters.status,
            molliePaymentId: parameters.molliePaymentId ?? null,
            mollieSubscriptionId: parameters.mollieSubscriptionId ?? null,
            sequenceType: parameters.sequenceType ?? null,
            serviceType: parameters.serviceType ?? null,
            amountInCents: parameters.amountInCents,
            currency: parameters.currency ?? "EUR",
            description: parameters.description,
            periodStart: parameters.periodStart ?? null,
            periodEnd: parameters.periodEnd ?? null,
            paidAt: parameters.paidAt ?? (parameters.status === "paid" ? nowISO : null),
            idInvoice: parameters.idInvoice ?? null,
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
    amountInCents: number
    description: string
    serviceType?: (typeof organizationSubscriptionType)[number] | null
}) {
    if (parameters.amountInCents <= 0) {
        return
    }

    const organization = await selectOne({
        database: parameters.database,
        table: models.organization,
        where: (table) => eq(table.id, parameters.idOrganization),
    })

    if (organization.walletBalanceInCents < parameters.amountInCents) {
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
        amountInCents: parameters.amountInCents,
        description: parameters.description,
        serviceType: parameters.serviceType ?? null,
        createdBy: parameters.idUser,
    })
}

export async function creditOrganizationWallet(parameters: {
    database: ReturnType<typeof sqlClient> | Parameters<Parameters<ReturnType<typeof sqlClient>["transaction"]>[0]>[0]
    idOrganization: string
    idUser: string | null
    amountInCents: number
    description: string
    serviceType?: (typeof organizationSubscriptionType)[number] | null
}) {
    if (parameters.amountInCents <= 0) {
        return
    }

    await recordOrganizationPayment({
        database: parameters.database,
        idOrganization: parameters.idOrganization,
        category: "top_up",
        status: "paid",
        amountInCents: parameters.amountInCents,
        description: parameters.description,
        serviceType: parameters.serviceType ?? null,
        createdBy: parameters.idUser,
    })
}
