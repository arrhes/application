import { models, readAllInvoicesRouteDefinition } from "@arrhes/application-metadata"
import { and, desc, eq, inArray, isNotNull, sum } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const readAllInvoicesRoute = apiFactory.createApp().post(readAllInvoicesRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({
        context: c,
    })
    const _body = await validateBodyMiddleware({
        context: c,
        schema: readAllInvoicesRouteDefinition.schemas.body,
    })

    await selectOne({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
    })

    const invoices = await selectMany({
        database: c.var.clients.sql,
        table: models.invoice,
        where: (table) => eq(table.idOrganization, idOrganization),
        orderBy: (table) => desc(table.startingAt),
    })

    // For draft invoices, `amountInCents` is 0 at creation and only updated when the monthly
    // worker finalizes them. Compute the live amount from linked payments instead so that the
    // invoices page matches the wallet "Mois en cours" total.
    const draftInvoiceIds = invoices.filter((inv) => inv.status === "draft").map((inv) => inv.id)

    let draftAmounts: Map<string, number> = new Map()

    if (draftInvoiceIds.length > 0) {
        const rows = await c.var.clients.sql
            .select({
                idInvoice: models.organizationPayment.idInvoice,
                total: sum(models.organizationPayment.amountHTInCents),
            })
            .from(models.organizationPayment)
            .where(
                and(
                    inArray(models.organizationPayment.idInvoice, draftInvoiceIds),
                    isNotNull(models.organizationPayment.serviceType),
                    eq(models.organizationPayment.status, "paid"),
                ),
            )
            .groupBy(models.organizationPayment.idInvoice)

        draftAmounts = new Map(
            rows.map((row) => [
                row.idInvoice as string,
                Number(row.total ?? 0),
            ]),
        )
    }

    const data = invoices.map((inv) => {
        if (inv.status !== "draft") return inv
        return {
            ...inv,
            amountInCents: draftAmounts.get(inv.id) ?? 0,
        }
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllInvoicesRouteDefinition.schemas.return,
        data,
    })
})
