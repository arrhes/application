import { createHash } from "node:crypto"
import { createOneApiKeyRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { registerRoute } from "../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const createOneApiKeyRoute = registerRoute(createOneApiKeyRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneApiKeyRouteDefinition.schemas.body,
    })

    // Must be admin of the organization
    const organizationUser = await selectOne({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, auth.user.id), eq(table.idOrganization, idOrganization)),
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
            idUser: auth.user.id,
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
