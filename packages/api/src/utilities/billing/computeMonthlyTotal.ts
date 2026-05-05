import { models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"
import { getStorageRecurringAmountInCents } from "./subscriptionPricing.js"

/**
 * Returns the total monthly recurring amount in cents for an organization,
 * derived directly from organization-owned billing fields.
 */
export async function computeMonthlyTotal(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    idOrganization: string
}): Promise<number> {
    const organization = await parameters.var.clients.sql
        .select()
        .from(models.organization)
        .where(eq(models.organization.id, parameters.idOrganization))
        .limit(1)
        .then((rows) => rows.at(0))

    if (organization === undefined) {
        return 0
    }

    return organization.licenceAmount + getStorageRecurringAmountInCents(organization.storageMaxUsage)
}
