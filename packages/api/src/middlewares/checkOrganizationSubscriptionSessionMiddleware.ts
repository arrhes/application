import { models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type { Context } from "hono"
import { Exception } from "../utilities/exception.js"

export async function checkOrganizationSubscriptionSessionMiddleware(parameters: {
    context: Context<any>
    idOrganization: string
    checkType: "tokens" | "ocrPages" | "licence"
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

        if (parameters.checkType === "tokens" && organization.tokensTotalLeft <= 0) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Subscription check failed",
                externalMessage: "Vous n'avez plus de tokens disponibles",
                cause: "Organization has no tokens left",
            })
        }

        if (parameters.checkType === "ocrPages" && organization.ocrPagesTotalLeft <= 0) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Subscription check failed",
                externalMessage: "Vous n'avez plus de pages OCR disponibles",
                cause: "Organization has no OCR pages left",
            })
        }

        if (parameters.checkType === "licence" && organization.licenceAmount <= 0) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Subscription check failed",
                externalMessage: "Votre organisation ne dispose pas de licence active",
                cause: "Organization has no active licence",
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
