import { generateId, models, mollieWebhookRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { apiFactory } from "../../utilities/apiFactory.js"
import { apiLog } from "../../utilities/apiLog.js"
import { response } from "../../utilities/response.js"
import { insertOne } from "../../utilities/sql/insertOne.js"
import { updateOne } from "../../utilities/sql/updateOne.js"
import { validate } from "../../utilities/validate.js"

const MONTHLY_PRICE = "30.00"

/**
 * Get the last day of a given month (e.g. 2026-02-01 -> 2026-02-28T23:59:59.999Z).
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

export const mollieWebhookRoute = apiFactory.createApp().post(mollieWebhookRouteDefinition.path, async (c) => {
    try {
        // Mollie sends webhooks as application/x-www-form-urlencoded (body: id=tr_xxx)
        const rawBody = await c.req.parseBody()
        const body = validate({
            schema: mollieWebhookRouteDefinition.schemas.body,
            data: rawBody,
        })
        // Fetch the payment from Mollie to verify its status
        const molliePayment = await c.var.clients.mollie.payments.get(body.id)

        apiLog({
            var: c.var,
            type: "information",
            message: `Mollie webhook received for payment ${body.id}, status: ${molliePayment.status}`,
        })

        // Find the matching payment in our database (may not exist for recurring payments)
        const organizationPayment = await c.var.clients.sql
            .select()
            .from(models.organizationPayment)
            .where(eq(models.organizationPayment.molliePaymentId, body.id))
            .limit(1)
            .then((rows) => rows.at(0))

        // Map Mollie status to our status
        const statusMap: Record<string, "pending" | "paid" | "failed" | "refunded"> = {
            open: "pending",
            pending: "pending",
            authorized: "pending",
            paid: "paid",
            failed: "failed",
            canceled: "failed",
            expired: "failed",
            refunded: "refunded",
        }
        const mappedStatus = statusMap[molliePayment.status] ?? "pending"

        if (organizationPayment !== undefined) {
            // Update existing payment
            await updateOne({
                database: c.var.clients.sql,
                table: models.organizationPayment,
                data: {
                    status: mappedStatus,
                    paidAt: mappedStatus === "paid" ? new Date().toISOString() : organizationPayment.paidAt,
                    lastUpdatedAt: new Date().toISOString(),
                },
                where: (table) => eq(table.id, organizationPayment.id),
            })

            // If first payment is paid, create a Mollie subscription
            if (mappedStatus === "paid" && organizationPayment.sequenceType === "first") {
                const organization = await c.var.clients.sql
                    .select()
                    .from(models.organization)
                    .where(eq(models.organization.id, organizationPayment.idOrganization))
                    .limit(1)
                    .then((rows) => rows.at(0))

                if (
                    organization !== undefined &&
                    organization.mollieCustomerId !== null &&
                    organization.mollieSubscriptionId === null
                ) {
                    const now = new Date()

                    // The first payment covers the pro-rata period up to periodEnd (last day of current month)
                    // The recurring subscription starts on the 1st of the next month
                    const firstOfNextMonth =
                        organizationPayment.periodEnd !== null
                            ? getFirstOfNextMonth(new Date(organizationPayment.periodEnd))
                            : getFirstOfNextMonth(now)

                    const startDate = `${firstOfNextMonth.getUTCFullYear()}-${String(firstOfNextMonth.getUTCMonth() + 1).padStart(2, "0")}-${String(firstOfNextMonth.getUTCDate()).padStart(2, "0")}`

                    const subscription = await c.var.clients.mollie.customerSubscriptions.create({
                        customerId: organization.mollieCustomerId,
                        amount: {
                            currency: "EUR",
                            value: MONTHLY_PRICE,
                        },
                        interval: "1 month",
                        startDate: startDate,
                        description: "Arrhes - Abonnement mensuel",
                        webhookUrl: `${c.var.env.API_BASE_URL}/public/mollie-webhook`,
                    })

                    // Set subcriptionEndingAt to the end of the current first-payment period.
                    // The first payment covers from now until periodEnd (end of current month).
                    // The recurring subscription will extend this when each subsequent payment is confirmed.
                    const subscriptionEndingAt =
                        organizationPayment.periodEnd !== null
                            ? new Date(organizationPayment.periodEnd)
                            : getLastDayOfMonth(now)

                    // Update organization with subscription info and premium status
                    await updateOne({
                        database: c.var.clients.sql,
                        table: models.organization,
                        data: {
                            mollieSubscriptionId: subscription.id,
                            subcriptionEndingAt: subscriptionEndingAt.toISOString(),
                            lastUpdatedAt: now.toISOString(),
                        },
                        where: (table) => eq(table.id, organization.id),
                    })
                }
            }
        } else {
            // This is a subscription payment (Mollie created it automatically)
            // Find the organization by the customer ID from the Mollie payment
            const mollieCustomerId = molliePayment.customerId

            if (mollieCustomerId !== null && mollieCustomerId !== undefined) {
                const organization = await c.var.clients.sql
                    .select()
                    .from(models.organization)
                    .where(eq(models.organization.mollieCustomerId, mollieCustomerId))
                    .limit(1)
                    .then((rows) => rows.at(0))

                if (organization !== undefined) {
                    const now = new Date()

                    // Recurring payments are charged on the 1st of each month
                    // Period = 1st to last day of the month being paid for
                    const periodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
                    const periodEnd = getLastDayOfMonth(now)

                    // Create a new payment record for this subscription payment
                    await insertOne({
                        database: c.var.clients.sql,
                        table: models.organizationPayment,
                        data: {
                            id: generateId(),
                            idOrganization: organization.id,
                            status: mappedStatus,
                            molliePaymentId: body.id,
                            mollieSubscriptionId: molliePayment.subscriptionId ?? null,
                            sequenceType: "recurring",
                            amountInCents: Math.round(Number.parseFloat(molliePayment.amount.value) * 100),
                            currency: molliePayment.amount.currency,
                            description: molliePayment.description,
                            periodStart: periodStart.toISOString(),
                            periodEnd: periodEnd.toISOString(),
                            paidAt: mappedStatus === "paid" ? now.toISOString() : null,
                            createdAt: now.toISOString(),
                            lastUpdatedAt: null,
                            createdBy: null,
                            lastUpdatedBy: null,
                        },
                    })

                    // If payment is paid, extend premium to the end of this billing period
                    if (mappedStatus === "paid") {
                        await updateOne({
                            database: c.var.clients.sql,
                            table: models.organization,
                            data: {
                                subcriptionEndingAt: periodEnd.toISOString(),
                                lastUpdatedAt: now.toISOString(),
                            },
                            where: (table) => eq(table.id, organization.id),
                        })
                    }
                }
            }
        }
    } catch (error) {
        apiLog({
            var: c.var,
            type: "error",
            internalMessage: "Mollie webhook error",
            cause: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
        })
    }

    // Always return 200 to Mollie
    return response({
        context: c,
        statusCode: 200,
        schema: mollieWebhookRouteDefinition.schemas.return,
        data: {},
    })
})
