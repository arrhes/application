import { createWalletTopUpCheckoutRouteDefinition, models } from "@arrhes/application-metadata"
import { SequenceType } from "@mollie/api-client"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { formatAmountFromCents, recordOrganizationPayment } from "../../../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"
import { productName } from "../../../../../../utilities/variables.js"

export const createWalletTopUpCheckoutRoute = apiFactory
    .createApp()
    .post(createWalletTopUpCheckoutRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createWalletTopUpCheckoutRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, auth.user.id), eq(table.idOrganization, idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
                externalMessage: "Vous n'êtes pas administrateur de l'organisation",
            })
        }

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        let mollieCustomerId = organization.mollieCustomerId

        if (mollieCustomerId === null && organization.email !== null) {
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
                    mollieCustomerId,
                    lastUpdatedAt: new Date().toISOString(),
                    lastUpdatedBy: auth.user.id,
                },
                where: (table) => eq(table.id, organization.id),
            })
        }

        const molliePayment = await c.var.clients.mollie.payments.create({
            amount: {
                currency: "EUR",
                value: formatAmountFromCents(body.amountInCents),
            },
            customerId: mollieCustomerId ?? undefined,
            sequenceType: SequenceType.oneoff,
            description: `${productName} - Recharge portefeuille`,
            redirectUrl: `${c.var.env.WEBSITE_BASE_URL}/dashboard/organisations/${organization.id}/abonnement/moyens-de-paiement`,
            webhookUrl: `${c.var.env.API_BASE_URL}/public/mollie-webhook`,
        })

        await recordOrganizationPayment({
            database: c.var.clients.sql,
            idOrganization: organization.id,
            category: "top_up",
            status: "pending",
            amountInCents: body.amountInCents,
            description: "Recharge portefeuille",
            sequenceType: "oneoff",
            molliePaymentId: molliePayment.id,
            createdBy: auth.user.id,
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
            schema: createWalletTopUpCheckoutRouteDefinition.schemas.return,
            data: {
                checkoutUrl,
            },
        })
    })
