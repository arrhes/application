import { createHash } from "node:crypto"
import { createOneApiKeyRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const createOneApiKeyRoute = apiFactory.createApp().post(createOneApiKeyRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneApiKeyRouteDefinition.schemas.body,
    })

    // Must be admin of the organization
    const organizationUser = await selectOne({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
    })
    if (organizationUser.isAdmin === false) {
        throw new Exception({
            statusCode: 401,
            internalMessage: "User is not admin of the organization",
            externalMessage: "Vous n'êtes pas administrateur de l'organisation",
        })
    }

    const rawKey = generateId()
    const keyHash = createHash("sha256").update(rawKey).digest("hex")

    const createOneApiKey = await insertOne({
        database: c.var.clients.sql,
        table: models.apiKey,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idUser: user.id,
            keyHash: keyHash,
            name: body.name ?? new Date().toISOString(),
            isDefault: false,
            isActive: true,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneApiKeyRouteDefinition.schemas.return,
        data: {
            ...createOneApiKey,
            rawKey: rawKey,
        },
    })
})
