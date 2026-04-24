import { models } from "@arrhes/application-metadata"
import { SequenceType } from "@mollie/api-client"
import { eq } from "drizzle-orm"
import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"
import { updateOne } from "../sql/updateOne.js"
import { productName } from "../variables.js"
import { formatAmountFromCents, recordOrganizationPayment } from "./wallet.js"

function getDaysInMonth(date: Date): number {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
}

function getLastDayOfMonth(from: Date): Date {
    return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + 1, 0, 23, 59, 59, 999))
}

function getFirstOfNextMonth(from: Date): Date {
    return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + 1, 1))
}

function formatMollieDate(date: Date): string {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    const day = String(date.getUTCDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

function calculateProRataAmountCents(totalMonthlyCents: number, from: Date): number {
    const daysInMonth = getDaysInMonth(from)
    const remainingDays = daysInMonth - from.getUTCDate() + 1
    return Math.round((remainingDays / daysInMonth) * totalMonthlyCents)
}

export type SyncMollieResult =
    | { needsCheckout: false; checkoutUrl: null }
    | { needsCheckout: true; checkoutUrl: string }

/**
 * Synchronise the Mollie subscription for an organisation to match its current
 * total monthly subscription amount (sum of all active subscriptions).
 *
 * Scenarios:
 * - totalMonthlyCents = 0 and org has a Mollie subscription → cancel it
 * - totalMonthlyCents > 0 and org has a Mollie mandate (mollieCustomerId + past payment) → update/create subscription
 * - totalMonthlyCents > 0 and org has no Mollie mandate yet → create first-payment checkout URL
 */
export async function syncMollieSubscription(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    idOrganization: string
    idUser: string | null
    totalMonthlyCents: number
}): Promise<SyncMollieResult> {
    const { var: varCtx, idOrganization, idUser, totalMonthlyCents } = parameters

    const organization = await varCtx.clients.sql
        .select()
        .from(models.organization)
        .where(eq(models.organization.id, idOrganization))
        .limit(1)
        .then((rows) => rows.at(0))

    if (!organization) {
        throw new Exception({ statusCode: 404, internalMessage: "Organization not found" })
    }

    const now = new Date()

    // Case 1: zero total — cancel the Mollie subscription if one exists
    if (totalMonthlyCents === 0) {
        if (organization.mollieCustomerId !== null && organization.mollieSubscriptionId !== null) {
            try {
                await varCtx.clients.mollie.customerSubscriptions.cancel(organization.mollieSubscriptionId, {
                    customerId: organization.mollieCustomerId,
                })
            } catch {
                // Ignore: subscription may already be cancelled on Mollie's side
            }

            await updateOne({
                database: varCtx.clients.sql,
                table: models.organization,
                data: {
                    mollieSubscriptionId: null,
                    lastUpdatedAt: now.toISOString(),
                },
                where: (table) => eq(table.id, idOrganization),
            })
        }
        return { needsCheckout: false, checkoutUrl: null }
    }

    // Case 2: non-zero total — org already has a Mollie customer ID (i.e. a mandate exists)
    if (organization.mollieCustomerId !== null) {
        const hasPremiumAccess =
            organization.subcriptionEndingAt !== null &&
            new Date(organization.subcriptionEndingAt).getTime() > now.getTime()

        const newMonthlyAmount = formatAmountFromCents(totalMonthlyCents)
        const subscriptionDescription = `${productName}-sub-${idOrganization}`

        if (hasPremiumAccess) {
            // Update or recreate Mollie subscription with new amount
            if (organization.mollieSubscriptionId !== null) {
                try {
                    // Cancel existing and create a new one with updated amount starting next month
                    await varCtx.clients.mollie.customerSubscriptions.cancel(organization.mollieSubscriptionId, {
                        customerId: organization.mollieCustomerId,
                    })
                } catch {
                    // Ignore
                }
            }

            const anchorDate = new Date(organization.subcriptionEndingAt ?? now.toISOString())
            const startDate = formatMollieDate(getFirstOfNextMonth(anchorDate))

            const subscription = await varCtx.clients.mollie.customerSubscriptions.create({
                customerId: organization.mollieCustomerId,
                amount: { currency: "EUR", value: newMonthlyAmount },
                interval: "1 month",
                startDate,
                description: subscriptionDescription,
                webhookUrl: `${varCtx.env.API_BASE_URL}/public/mollie-webhook`,
            })

            await updateOne({
                database: varCtx.clients.sql,
                table: models.organization,
                data: {
                    mollieSubscriptionId: subscription.id,
                    lastUpdatedAt: now.toISOString(),
                },
                where: (table) => eq(table.id, idOrganization),
            })

            return { needsCheckout: false, checkoutUrl: null }
        }

        // No current premium access: need a new first payment
        const proRataCents = calculateProRataAmountCents(totalMonthlyCents, now)
        const lastDayOfMonth = getLastDayOfMonth(now)

        // Ensure org email is present for Mollie
        if (organization.email === null) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Missing organization email for payment",
                externalMessage: "L'organisation n'a pas d'adresse email configurée",
            })
        }

        const molliePayment = await varCtx.clients.mollie.payments.create({
            amount: { currency: "EUR", value: formatAmountFromCents(proRataCents) },
            customerId: organization.mollieCustomerId,
            sequenceType: SequenceType.first,
            description: `${productName} - Activation abonnement`,
            redirectUrl: `${varCtx.env.WEBSITE_BASE_URL}/dashboard/organisations/${idOrganization}/abonnement`,
            webhookUrl: `${varCtx.env.API_BASE_URL}/public/mollie-webhook`,
        })

        await recordOrganizationPayment({
            database: varCtx.clients.sql,
            idOrganization,
            category: "subscription",
            status: "pending",
            amountInCents: proRataCents,
            description: "Activation abonnement",
            sequenceType: "first",
            molliePaymentId: molliePayment.id,
            periodStart: now.toISOString(),
            periodEnd: lastDayOfMonth.toISOString(),
            createdBy: idUser,
        })

        const checkoutUrl = molliePayment.getCheckoutUrl()
        if (checkoutUrl === null) {
            throw new Exception({ statusCode: 500, internalMessage: "Mollie checkout URL not available" })
        }
        return { needsCheckout: true, checkoutUrl }
    }

    // Case 3: no Mollie customer yet — create customer and first-payment checkout
    if (organization.email === null) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "Missing organization email for payment",
            externalMessage: "L'organisation n'a pas d'adresse email configurée",
        })
    }

    const customer = await varCtx.clients.mollie.customers.create({
        name: organization.name,
        email: organization.email,
        metadata: { product: productName },
    })

    await updateOne({
        database: varCtx.clients.sql,
        table: models.organization,
        data: { mollieCustomerId: customer.id, lastUpdatedAt: now.toISOString() },
        where: (table) => eq(table.id, idOrganization),
    })

    const proRataCents = calculateProRataAmountCents(totalMonthlyCents, now)
    const lastDayOfMonth = getLastDayOfMonth(now)

    const molliePayment = await varCtx.clients.mollie.payments.create({
        amount: { currency: "EUR", value: formatAmountFromCents(proRataCents) },
        customerId: customer.id,
        sequenceType: SequenceType.first,
        description: `${productName} - Activation abonnement`,
        redirectUrl: `${varCtx.env.WEBSITE_BASE_URL}/dashboard/organisations/${idOrganization}/abonnement`,
        webhookUrl: `${varCtx.env.API_BASE_URL}/public/mollie-webhook`,
    })

    await recordOrganizationPayment({
        database: varCtx.clients.sql,
        idOrganization,
        category: "subscription",
        status: "pending",
        amountInCents: proRataCents,
        description: "Activation abonnement",
        sequenceType: "first",
        molliePaymentId: molliePayment.id,
        periodStart: now.toISOString(),
        periodEnd: lastDayOfMonth.toISOString(),
        createdBy: idUser,
    })

    const checkoutUrl = molliePayment.getCheckoutUrl()
    if (checkoutUrl === null) {
        throw new Exception({ statusCode: 500, internalMessage: "Mollie checkout URL not available" })
    }
    return { needsCheckout: true, checkoutUrl }
}
