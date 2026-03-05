import { models, readAllComputationsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"

export const readAllComputationsRoute = apiFactory
    .createApp()
    .post(readAllComputationsRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readAllComputationsRouteDefinition.schemas.body,
        })

        const readAllComputations = await selectMany({
            database: c.var.clients.sql,
            table: models.computation,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readAllComputationsRouteDefinition.schemas.return,
            data: readAllComputations,
        })
    })
