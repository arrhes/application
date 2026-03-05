import { models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type { Context } from "hono"
import { Exception } from "../utilities/exception.js"

export async function checkOrganizationSubscriptionSessionMiddleware(parameters: {
    context: Context<any>
    idOrganization: string
}) {
    try {
        const organizationUsers = await parameters.context.var.clients.sql
            .select()
            .from(models.organizationUser)
            .where(
                and(
                    eq(models.organizationUser.idOrganization, parameters.idOrganization),
                    eq(models.organizationUser.idUser, parameters.context.var.user.id),
                ),
            )
            .limit(1)

        const organizationUser = organizationUsers.at(0)
        if (organizationUser === undefined) {
            throw new Exception({
                internalMessage: "Subscription check failed",
                cause: "User is not a member of this organization",
            })
        }

        const organizations = await parameters.context.var.clients.sql
            .select()
            .from(models.organization)
            .where(eq(models.organization.id, parameters.idOrganization))
            .limit(1)

        const organization = organizations.at(0)
        if (organization === undefined) {
            throw new Exception({
                internalMessage: "Subscription check failed",
                cause: "Organization not found",
            })
        }

        if (organization.subcriptionEndingAt === null) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Subscription check failed",
                externalMessage: "This feature requires a premium subscription",
                cause: "Organization does not have a premium subscription",
            })
        }

        if (new Date(organization.subcriptionEndingAt) < new Date()) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Subscription check failed",
                externalMessage: "This feature requires a premium subscription",
                cause: "Organization does not have a premium subscription",
            })
        }

        return organization
    } catch (error: unknown) {
        if (error instanceof Exception) {
            throw error
        }

        throw new Exception({
            statusCode: 403,
            internalMessage: "Subscription check failed",
            externalMessage: "This feature requires a premium subscription",
            rawError: error,
        })
    }
}
