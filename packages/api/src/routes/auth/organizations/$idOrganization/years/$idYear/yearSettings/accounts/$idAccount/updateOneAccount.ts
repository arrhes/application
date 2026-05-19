import { models, updateOneAccountRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneAccountRoute = registerRoute(updateOneAccountRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneAccountRouteDefinition.schemas.body,
    })

    const updateOneAccount = await updateOne({
        database: c.var.clients.sql,
        table: models.account,
        data: {
            idAccountParent: body.idAccountParent,

            idBalanceSheetAsset: body.idBalanceSheetAsset,
            balanceSheetAssetColumn: body.balanceSheetAssetColumn,
            balanceSheetAssetFlow: body.balanceSheetAssetFlow,

            idBalanceSheetLiability: body.idBalanceSheetLiability,
            balanceSheetLiabilityColumn: body.balanceSheetLiabilityColumn,
            balanceSheetLiabilityFlow: body.balanceSheetLiabilityFlow,

            idIncomeStatement: body.idIncomeStatement,

            isSelectable: body.isSelectable,
            number: body.number,
            label: body.label,
            type: body.type,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: auth.user.id,
        },
        where: (table) =>
            and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear), eq(table.id, body.idAccount)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneAccountRouteDefinition.schemas.return,
        data: updateOneAccount,
    })
})
