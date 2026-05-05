import { generateInvoiceGetSignedUrlRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "../../../../utilities/storage/generateGetSignedUrl.js"

export const generateInvoiceGetSignedUrlRoute = apiFactory
    .createApp()
    .post(generateInvoiceGetSignedUrlRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateInvoiceGetSignedUrlRouteDefinition.schemas.body,
        })

        await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
        })

        const invoice = await selectOne({
            database: c.var.clients.sql,
            table: models.invoice,
            where: (table) => and(eq(table.id, body.idInvoice), eq(table.idOrganization, idOrganization)),
        })

        if (invoice.xmlStorageKey === null) {
            throw new Exception({
                statusCode: 404,
                internalMessage: "Invoice PDF not yet generated",
                externalMessage: "La facture PDF n'est pas encore disponible",
            })
        }

        const url = await generateGetSignedUrl({
            var: c.var,
            storageKey: invoice.xmlStorageKey,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateInvoiceGetSignedUrlRouteDefinition.schemas.return,
            data: { url },
        })
    })
