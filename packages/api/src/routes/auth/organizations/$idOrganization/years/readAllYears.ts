import { models, readAllYearsRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../utilities/exception.js"
import { registerRoute } from "../../../../../utilities/registerRoute.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"

export const readAllYearsRoute = registerRoute(readAllYearsRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    if (!idOrganization) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "idOrganization is required for readAllYears",
            externalMessage: "Organization identifier is required",
        })
    }
    const _body = await validateBodyMiddleware({
        context: c,
        schema: readAllYearsRouteDefinition.schemas.body,
    })

    const readAllYears = await selectMany({
        database: c.var.clients.sql,
        table: models.year,
        where: (table) => and(eq(table.idOrganization, idOrganization)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllYearsRouteDefinition.schemas.return,
        data: readAllYears,
    })
})
