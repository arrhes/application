import { createWalletWithdrawalRouteDefinition, models } from "@arrhes/application-metadata"
import { and, desc, eq, gte, inArray, lt, ne } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import {
    formatAmountFromCents,
    mapMollieRefundStatusToPaymentStatus,
    recordOrganizationPayment,
} from "../../../../utilities/billing/wallet.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { productName } from "../../../../utilities/variables.js"

export const createWalletWithdrawalRoute = apiFactory
    .createApp()
    .post(createWalletWithdrawalRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createWalletWithdrawalRouteDefinition.schemas.body,
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

        if (organization.walletBalanceInCents < body.amountInCents) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Insufficient wallet balance",
                externalMessage: "Le solde du portefeuille est insuffisant pour ce retrait.",
            })
        }

        const now = new Date()
        const currentMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString()
        const nextMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString()

        const currentMonthWithdrawals = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.category, "withdrawal"),
                    ne(table.status, "failed"),
                    gte(table.createdAt, currentMonthStart),
                    lt(table.createdAt, nextMonthStart),
                ),
        })

        if (currentMonthWithdrawals.length > 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Monthly wallet withdrawal limit reached",
                externalMessage: "Un seul retrait portefeuille est autorisé par mois.",
            })
        }

        const topUpPayments = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            where: (table) =>
                and(eq(table.idOrganization, idOrganization), eq(table.category, "top_up"), eq(table.status, "paid")),
            orderBy: (table) => desc(table.createdAt),
        })

        const topUpPaymentIds = topUpPayments
            .map((payment) => payment.molliePaymentId)
            .filter((paymentId): paymentId is string => paymentId !== null)

        if (topUpPaymentIds.length === 0) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "No refundable top-up payment found",
                externalMessage: "Aucun rechargement remboursable n'a été trouvé pour effectuer ce retrait.",
            })
        }

        const withdrawalPayments = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationPayment,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.category, "withdrawal"),
                    inArray(table.molliePaymentId, topUpPaymentIds),
                ),
        })

        const reservedByPaymentId = withdrawalPayments.reduce<Record<string, number>>((acc, payment) => {
            if (payment.molliePaymentId === null || payment.status === "failed") {
                return acc
            }

            acc[payment.molliePaymentId] = (acc[payment.molliePaymentId] ?? 0) + payment.amountHTInCents
            return acc
        }, {})

        const sourcePayment = topUpPayments.find((payment) => {
            if (payment.molliePaymentId === null) {
                return false
            }

            const alreadyReserved = reservedByPaymentId[payment.molliePaymentId] ?? 0
            return payment.amountHTInCents - alreadyReserved >= body.amountInCents
        })

        if (sourcePayment?.molliePaymentId === null || sourcePayment === undefined) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "No single refundable top-up payment large enough",
                externalMessage:
                    "Aucun rechargement remboursable n'est assez élevé pour effectuer ce retrait en une fois.",
            })
        }

        const refund = await c.var.clients.mollie.paymentRefunds.create({
            paymentId: sourcePayment.molliePaymentId,
            amount: {
                currency: "EUR",
                value: formatAmountFromCents(body.amountInCents),
            },
            description: `${productName} - Retrait portefeuille`,
            metadata: {
                idOrganization,
            },
        })

        const mappedStatus = mapMollieRefundStatusToPaymentStatus(refund.status)
        if (mappedStatus === "failed") {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Wallet withdrawal refund failed",
                externalMessage: "Le retrait n'a pas pu être initié auprès de Mollie.",
            })
        }

        await recordOrganizationPayment({
            database: c.var.clients.sql,
            idOrganization,
            category: "withdrawal",
            status: mappedStatus,
            amountInCents: body.amountInCents,
            description: "Retrait portefeuille",
            molliePaymentId: sourcePayment.molliePaymentId,
            createdBy: user.id,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createWalletWithdrawalRouteDefinition.schemas.return,
            data: {},
        })
    })
