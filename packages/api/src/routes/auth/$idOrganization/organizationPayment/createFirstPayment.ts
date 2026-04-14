import { createFirstPaymentRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { SequenceType } from "@mollie/api-client"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"
import { productName } from "../../../../utilities/variables.js"

const MONTHLY_PRICE_CENTS = 3000
const MONTHLY_PRICE = "30.00"

/**
 * Calculate the number of days in the month for a given date.
 */
function getDaysInMonth(date: Date): number {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate()
}

/**
 * Get the last day of the current month (e.g. 2026-02-20 -> 2026-02-28T23:59:59.999Z).
 */
function getLastDayOfMonth(from: Date): Date {
    return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + 1, 0, 23, 59, 59, 999))
}

/**
 * Get the first day of the next month from a given date.
 */
function getFirstOfNextMonth(from: Date): Date {
    return new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth() + 1, 1))
}

/**
 * Format a date as YYYY-MM-DD for Mollie.
 */
function formatMollieDate(date: Date): string {
    const year = date.getUTCFullYear()
    const month = String(date.getUTCMonth() + 1).padStart(2, "0")
    const day = String(date.getUTCDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
}

/**
 * Calculate pro-rata amount in cents for the remaining days in the current month (including today).
 * Example: if today is the 20th of a 30-day month, remaining = 11 days (20th to 30th inclusive),
 * amount = 11/30 * 3000 = 1100 cents.
 * If today is the last day (30th of 30), remaining = 1 day, amount = 1/30 * 3000 = 100 cents.
 */
function calculateProRataAmountCents(from: Date): number {
    const daysInMonth = getDaysInMonth(from)
    const remainingDays = daysInMonth - from.getUTCDate() + 1 // +1 to include today

    return Math.round((remainingDays / daysInMonth) * MONTHLY_PRICE_CENTS)
}

/**
 * Format cents as a Mollie-compatible amount string (e.g. 1050 -> "10.50").
 */
function formatAmountFromCents(cents: number): string {
    return (cents / 100).toFixed(2)
}

export const createFirstPaymentRoute = apiFactory
    .createApp()
    .post(createFirstPaymentRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: createFirstPaymentRouteDefinition.schemas.body,
        })

        // Verify user is admin of the organization
        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
                externalMessage: "Vous n'êtes pas administrateur de l'organisation",
            })
        }

        // Get the organization
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        if (organization.mollieSubscriptionId !== null) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Subscription is already active",
                externalMessage: "L'abonnement est déjà actif",
            })
        }

        // Create or retrieve Mollie customer
        let mollieCustomerId = organization.mollieCustomerId

        if (mollieCustomerId === null) {
            if (organization.email === null) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Missing organization information",
                    externalMessage: "Informations de l'organisation manquantes",
                })
            }
            const customer = await c.var.clients.mollie.customers.create({
                name: organization.name,
                email: organization.email,
                metadata: {
                    product: productName,
                },
            })
            mollieCustomerId = customer.id

            await updateOne({
                database: c.var.clients.sql,
                table: models.organization,
                data: {
                    mollieCustomerId: mollieCustomerId,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: user.id,
                },
                where: (table) => eq(table.id, organization.id),
            })
        }

        const now = new Date()
        const hasPremiumAccess =
            organization.subcriptionEndingAt !== null &&
            new Date(organization.subcriptionEndingAt).getTime() > now.getTime()

        // Generic restart path: if premium access is still active but payments were cancelled,
        // recreate recurring payments for the next billing cycle without charging a new first payment.
        if (hasPremiumAccess) {
            const anchorDate = new Date(organization.subcriptionEndingAt ?? now.toISOString())
            const startDate = formatMollieDate(getFirstOfNextMonth(anchorDate))
            const subscriptionDescription = `Arrhes abonnement ${organization.id} ${now.getTime()}`

            const subscription = await c.var.clients.mollie.customerSubscriptions.create({
                customerId: mollieCustomerId,
                amount: {
                    currency: "EUR",
                    value: MONTHLY_PRICE,
                },
                interval: "1 month",
                startDate: startDate,
                description: subscriptionDescription,
                webhookUrl: `${c.var.env.API_BASE_URL}/public/mollie-webhook`,
            })

            await updateOne({
                database: c.var.clients.sql,
                table: models.organization,
                data: {
                    mollieSubscriptionId: subscription.id,
                    lastUpdatedAt: now.toISOString(),
                    lastUpdatedBy: user.id,
                },
                where: (table) => eq(table.id, organization.id),
            })

            return response({
                context: c,
                statusCode: 200,
                schema: createFirstPaymentRouteDefinition.schemas.return,
                data: {
                    checkoutUrl: `${c.var.env.WEBSITE_BASE_URL}/dashboard/organisations/${organization.id}/abonnement`,
                },
            })
        }

        // Calculate pro-rata amount for the remaining days of the current month (including today)
        const proRataCents = calculateProRataAmountCents(now)
        const lastDayOfMonth = getLastDayOfMonth(now)

        // Create the first payment with the pro-rata amount
        const molliePayment = await c.var.clients.mollie.payments.create({
            amount: {
                currency: "EUR",
                value: formatAmountFromCents(proRataCents),
            },
            customerId: mollieCustomerId,
            sequenceType: SequenceType.first,
            description: "Arrhes - Activation de l'abonnement",
            redirectUrl: `${c.var.env.WEBSITE_BASE_URL}/dashboard/organisations/${organization.id}/abonnement`,
            webhookUrl: `${c.var.env.API_BASE_URL}/public/mollie-webhook`,
        })

        // Store the payment in our database
        await insertOne({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            data: {
                id: generateId(),
                idOrganization: organization.id,
                status: "pending",
                molliePaymentId: molliePayment.id,
                sequenceType: "first",
                amountInCents: proRataCents,
                currency: "EUR",
                description: "Activation de l'abonnement",
                periodStart: now.toISOString(),
                periodEnd: lastDayOfMonth.toISOString(),
                paidAt: null,
                createdAt: now.toISOString(),
                lastUpdatedAt: null,
                createdBy: user.id,
                lastUpdatedBy: null,
            },
        })

        const checkoutUrl = molliePayment.getCheckoutUrl()
        if (checkoutUrl === null) {
            throw new Exception({
                statusCode: 500,
                internalMessage: "Mollie checkout URL not available",
            })
        }

        return response({
            context: c,
            statusCode: 200,
            schema: createFirstPaymentRouteDefinition.schemas.return,
            data: {
                checkoutUrl: checkoutUrl,
            },
        })
    })
