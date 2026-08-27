import {
    executeScenarioRouteDefinition,
    getScenarioDefinition,
    models,
    type ScenarioDefinition,
} from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import * as v from "valibot"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../../utilities/exception.js"
import { registerRoute } from "../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../utilities/response.js"
import { createScenarioEntries } from "../../../../../../../utilities/scenarios/runScenario.js"
import { selectMany } from "../../../../../../../utilities/sql/selectMany.js"

export const executeScenarioRoute = registerRoute(executeScenarioRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: executeScenarioRouteDefinition.schemas.body,
    })

    const slug = c.req.param("scenario") ?? ""
    const definition: ScenarioDefinition | undefined = getScenarioDefinition(slug)
    if (definition === undefined) {
        throw new Exception({
            statusCode: 404,
            internalMessage: `Unknown scenario: ${slug}`,
            externalMessage: "Scénario inconnu",
        })
    }

    const accounts = await selectMany({
        database: c.var.clients.sql,
        table: models.account,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        limit: 10_000,
    })
    if (accounts.length === 0) {
        throw new Exception({
            statusCode: 404,
            internalMessage: "No accounts for this year",
            externalMessage: "Aucun compte pour cet exercice",
        })
    }

    let params: Record<string, unknown> = {}
    try {
        params = parseScenarioParams(definition.paramsSchema, body.params ?? {})
    } catch (error) {
        throw new Exception({
            statusCode: 400,
            internalMessage: String(error),
            externalMessage: error instanceof Error ? error.message : "Paramètres du scénario invalides",
        })
    }

    const created = await createScenarioEntries({
        database: c.var.clients.sql,
        idOrganization,
        idYear: body.idYear,
        userId: auth.user.id,
        definition,
        params,
        idJournal: body.idJournal,
        date: body.date ?? null,
        accounts: accounts.map((account) => ({
            id: account.id,
            number: account.number,
        })),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: executeScenarioRouteDefinition.schemas.return,
        data: {
            entries: created,
        } as v.InferOutput<typeof executeScenarioRouteDefinition.schemas.return>,
    })
})

export function parseScenarioParams(
    schema: ScenarioDefinition["paramsSchema"],
    data: Record<string, unknown>,
): Record<string, unknown> {
    const result = v.safeParse(schema, data)
    if (!result.success) {
        const issue = result.issues[0]
        const path = issue?.path?.map((item) => String(item.key)).join(".") ?? ""
        throw new Error(`${path ? `${path} — ` : ""}${issue?.message ?? "paramètres invalides"}`)
    }
    return result.output
}
