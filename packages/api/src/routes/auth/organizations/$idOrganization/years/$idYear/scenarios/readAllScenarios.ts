import { listScenarioDefinitions, readAllScenariosRouteDefinition } from "@comptasse/application-metadata"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { registerRoute } from "../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../utilities/response.js"

export const readAllScenariosRoute = registerRoute(readAllScenariosRouteDefinition, async (c) => {
    await checkAuthMiddleware({
        context: c,
    })
    await requireOrganizationMiddleware({
        idOrganization: c.req.param("idOrganization"),
    })
    return response({
        context: c,
        statusCode: 200,
        schema: readAllScenariosRouteDefinition.schemas.return,
        data: listScenarioDefinitions().map((scenario) => ({
            scenario: scenario.slug,
            title: scenario.title,
            description: scenario.description,
        })),
    })
})
