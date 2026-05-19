import { createOneAccountRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"

export const createOneAccountRoute = registerRoute(createOneAccountRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneAccountRouteDefinition.schemas.body,
    })

    const readOneAccount = await selectOne({
        database: c.var.clients.sql,
        table: models.account,
        where: (table) => {
            if (body.idAccountParent === null) {
                return
            }
            return and(
                eq(table.idOrganization, idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idAccountParent),
            )
        },
    })

    const createOneAccount = await insertOne({
        database: c.var.clients.sql,
        table: models.account,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,
            idAccountParent: body.idAccountParent,

            idBalanceSheetAsset: body.idBalanceSheetAsset ?? readOneAccount?.idBalanceSheetAsset,
            balanceSheetAssetColumn: body.balanceSheetAssetColumn ?? readOneAccount?.balanceSheetAssetColumn,
            balanceSheetAssetFlow: body.balanceSheetAssetFlow ?? readOneAccount?.balanceSheetAssetFlow,

            idBalanceSheetLiability: body.idBalanceSheetLiability ?? readOneAccount?.idBalanceSheetLiability,
            balanceSheetLiabilityColumn:
                body.balanceSheetLiabilityColumn ?? readOneAccount?.balanceSheetLiabilityColumn,
            balanceSheetLiabilityFlow: body.balanceSheetLiabilityFlow ?? readOneAccount?.balanceSheetLiabilityFlow,

            idIncomeStatement: body.idIncomeStatement,

            isSelectable: body.isSelectable,
            isDefault: false,
            label: body.label,
            number: body.number,
            type: body.type,
            isOptional: false,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: auth.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneAccountRouteDefinition.schemas.return,
        data: createOneAccount,
    })
})
