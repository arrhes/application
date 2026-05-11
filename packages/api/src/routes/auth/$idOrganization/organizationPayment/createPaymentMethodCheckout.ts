import { createPaymentMethodCheckoutRouteDefinition, models } from "@arrhes/application-metadata"
import { SequenceType } from "@mollie/api-client"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { recordOrganizationPayment } from "../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"
import { productName } from "../../../../utilities/variables.js"

const SETUP_PAYMENT_AMOUNT_IN_CENTS = 1

function formatAmountFromCents(cents: number): string {
    return (cents / 100).toFixed(2)
}

export const createPaymentMethodCheckoutRoute = apiFactory
    .createApp()
    .post(createPaymentMethodCheckoutRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({
            context: c,
        })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: createPaymentMethodCheckoutRouteDefinition.schemas.body,
        })

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

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        if (organization.email === null || organization.siren === null) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Missing organization billing information",
                externalMessage: "Veuillez renseigner l'email et le SIREN de l'organisation avant d'ajouter une carte",
            })
        }

        let mollieCustomerId = organization.mollieCustomerId

        if (mollieCustomerId === null) {
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
                    lastUpdatedBy: user.id,
                },
                where: (table) => eq(table.id, organization.id),
            })
        }

        const molliePayment = await c.var.clients.mollie.payments.create({
            amount: {
                currency: "EUR",
                value: formatAmountFromCents(SETUP_PAYMENT_AMOUNT_IN_CENTS),
            },
            customerId: mollieCustomerId,
            sequenceType: SequenceType.first,
            description: `${productName} - Ajout du moyen de paiement`,
            redirectUrl: `${c.var.env.WEBSITE_BASE_URL}/dashboard/organisations/${organization.id}/abonnement/moyens-de-paiement`,
            webhookUrl: `${c.var.env.API_BASE_URL}/public/mollie-webhook`,
        })

        await recordOrganizationPayment({
            database: c.var.clients.sql,
            idOrganization: organization.id,
            category: "setup",
            status: "pending",
            amountInCents: SETUP_PAYMENT_AMOUNT_IN_CENTS,
            description: "Ajout du moyen de paiement",
            sequenceType: "setup",
            molliePaymentId: molliePayment.id,
            createdBy: user.id,
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
            schema: createPaymentMethodCheckoutRouteDefinition.schemas.return,
            data: {
                checkoutUrl,
            },
        })
    })
