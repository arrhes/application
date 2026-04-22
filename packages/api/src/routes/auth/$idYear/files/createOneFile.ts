import { createOneFileRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq, isNotNull } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const createOneFileRoute = apiFactory.createApp().post(createOneFileRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneFileRouteDefinition.schemas.body,
    })

    // Deduplication: if a hash is provided, check whether a fully-uploaded file
    // with the same content already exists for this organisation + year.
    if (body.hash !== null && body.hash !== undefined) {
        const existing = await selectMany({
            database: c.var.clients.sql,
            table: models.file,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    body.idYear !== null ? eq(table.idYear, body.idYear) : undefined,
                    eq(table.hash, body.hash as string),
                    isNotNull(table.storageKey),
                ),
            limit: 1,
        })

        if (existing.length > 0) {
            return response({
                context: c,
                statusCode: 200,
                schema: createOneFileRouteDefinition.schemas.return,
                data: existing[0],
            })
        }
    }

    const createOneFile = await insertOne({
        database: c.var.clients.sql,
        table: models.file,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,
            idFolder: body.idFolder ?? null,
            reference: body.reference,
            name: body.name,
            storageKey: null,
            type: null,
            size: null,
            hash: body.hash ?? null,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneFileRouteDefinition.schemas.return,
        data: createOneFile,
    })
})
