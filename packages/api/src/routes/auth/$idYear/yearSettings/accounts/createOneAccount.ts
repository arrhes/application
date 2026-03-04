import { createOneAccountRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"

export const createOneAccountRoute = apiFactory.createApp().post(createOneAccountRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
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

            isClass: body.isClass,
            isSelectable: body.isSelectable,
            isDefault: false,
            label: body.label,
            number: body.number,
            type: body.type,
            isMandatory: true,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: user.id,
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
