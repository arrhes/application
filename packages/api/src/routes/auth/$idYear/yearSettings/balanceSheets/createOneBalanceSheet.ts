import { createOneBalanceSheetRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"

export const createOneBalanceSheetRoute = apiFactory
    .createApp()
    .post(createOneBalanceSheetRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneBalanceSheetRouteDefinition.schemas.body,
        })

        const createOneBalanceSheet = await insertOne({
            database: c.var.clients.sql,
            table: models.balanceSheet,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,
                idBalanceSheetParent: body.idBalanceSheetParent,
                isDefault: false,
                isComputed: body.isComputed,
                side: body.side,
                number: body.number,
                label: body.label,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneBalanceSheetRouteDefinition.schemas.return,
            data: createOneBalanceSheet,
        })
    })
