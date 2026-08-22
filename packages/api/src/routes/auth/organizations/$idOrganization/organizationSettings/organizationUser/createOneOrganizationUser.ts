import { pbkdf2Sync, randomBytes } from "node:crypto"
import { createOneOrganizationUserRouteDefinition, generateId, models } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"
import { response } from "../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const createOneOrganizationUserRoute = apiFactory
    .createApp()
    .post(createOneOrganizationUserRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneOrganizationUserRouteDefinition.schemas.body,
        })

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

        let toAddUser = (
            await selectMany({
                database: c.var.clients.sql,
                table: models.user,
                where: (table) => eq(table.email, body.user.email),
                limit: 1,
            })
        ).at(0)

        let temporaryPassword: string | null = null
        if (toAddUser === undefined) {
            temporaryPassword = randomBytes(12).toString("base64url")
            const passwordSalt = randomBytes(32).toString("hex")
            const passwordHash = pbkdf2Sync(temporaryPassword, passwordSalt, 128000, 64, "sha512").toString("hex")
            toAddUser = await insertOne({
                database: c.var.clients.sql,
                table: models.user,
                data: {
                    id: generateId(),
                    isActive: true,
                    alias: null,
                    email: body.user.email,
                    passwordHash,
                    passwordSalt,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                },
            })
        }

        const createOneOrganizationUser = await insertOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            data: {
                id: generateId(),
                idOrganization: organizationUser.idOrganization,
                idUser: toAddUser.id,
                isOwner: false,
                isAdmin: body.isAdmin,
                status: "active",
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: auth.user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneOrganizationUserRouteDefinition.schemas.return,
            data: {
                ...createOneOrganizationUser,
                temporaryPassword,
            },
        })
    })
