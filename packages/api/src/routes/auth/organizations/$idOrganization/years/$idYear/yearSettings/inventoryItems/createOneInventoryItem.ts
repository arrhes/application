import { createOneInventoryItemRouteDefinition, generateId, models } from "@comptasse/application-metadata"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"

export const createOneInventoryItemRoute = registerRoute(createOneInventoryItemRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneInventoryItemRouteDefinition.schemas.body,
    })

    const createOneInventoryItem = await insertOne({
        database: c.var.clients.sql,
        table: models.inventoryItem,
        data: {
            id: generateId(),
            idOrganization: idOrganization,
            idYear: body.idYear,

            sku: body.sku ?? null,
            name: body.name,
            description: body.description ?? null,
            category: body.category ?? null,
            unit: body.unit,
            unitPrice: body.unitPrice ?? null,
            currentQuantity: body.currentQuantity ?? "0",
            minimumThreshold: body.minimumThreshold ?? null,
            location: body.location ?? null,

            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: auth.user.id,
            lastUpdatedBy: null,
        },
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneInventoryItemRouteDefinition.schemas.return,
        data: createOneInventoryItem,
    })
})
