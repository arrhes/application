import { models, updateOneInventoryItemRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../../utilities/sql/updateOne.js"

export const updateOneInventoryItemRoute = registerRoute(updateOneInventoryItemRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneInventoryItemRouteDefinition.schemas.body,
    })

    const updateOneInventoryItem = await updateOne({
        database: c.var.clients.sql,
        table: models.inventoryItem,
        data: {
            sku: body.sku ?? undefined,
            name: body.name ?? undefined,
            description: body.description ?? undefined,
            category: body.category ?? undefined,
            unit: body.unit ?? undefined,
            unitPrice: body.unitPrice ?? undefined,
            currentQuantity: body.currentQuantity ?? undefined,
            minimumThreshold: body.minimumThreshold ?? undefined,
            location: body.location ?? undefined,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: auth.user.id,
        },
        where: (table) =>
            and(
                eq(table.idOrganization, idOrganization),
                eq(table.idYear, body.idYear),
                eq(table.id, body.idInventoryItem),
            ),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneInventoryItemRouteDefinition.schemas.return,
        data: updateOneInventoryItem,
    })
})
