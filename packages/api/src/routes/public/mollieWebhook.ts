import { models, mollieWebhookRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { apiLog } from "../../utilities/apiLog.js"
import { registerRoute } from "../../utilities/registerRoute.js"
import { response } from "../../utilities/response.js"
import { updateOne } from "../../utilities/sql/updateOne.js"
import { validate } from "../../utilities/validate.js"

export const mollieWebhookRoute = registerRoute(mollieWebhookRouteDefinition, async (c) => {
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
            const previousStatus = organizationPayment.status

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

            if (mappedStatus === "paid" && previousStatus !== "paid" && organizationPayment.category === "top_up") {
                const organization = await c.var.clients.sql
                    .select()
                    .from(models.organization)
                    .where(eq(models.organization.id, organizationPayment.idOrganization))
                    .limit(1)
                    .then((rows) => rows.at(0))

                if (organization !== undefined) {
                    await updateOne({
                        database: c.var.clients.sql,
                        table: models.organization,
                        data: {
                            walletBalanceInCents:
                                organization.walletBalanceInCents + organizationPayment.amountHTInCents,
                            lastUpdatedAt: new Date().toISOString(),
                        },
                        where: (table) => eq(table.id, organization.id),
                    })
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
