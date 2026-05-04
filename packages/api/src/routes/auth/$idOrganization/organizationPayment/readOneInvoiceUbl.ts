import { models, readOneInvoiceUblRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { buildInvoiceUblXml, getInvoiceXmlStorageKey } from "../../../../utilities/billing/invoiceUbl.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { getObject } from "../../../../utilities/storage/getObject.js"
import { putObject } from "../../../../utilities/storage/putObject.js"

export const readOneInvoiceUblRoute = apiFactory.createApp().post(readOneInvoiceUblRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: readOneInvoiceUblRouteDefinition.schemas.body,
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

    if (invoice.storageKey === null) {
        throw new Exception({
            statusCode: 404,
            internalMessage: "Invoice document is not yet generated",
            externalMessage: "La facture n'est pas encore generee",
        })
    }

    const xmlStorageKey = getInvoiceXmlStorageKey(invoice.storageKey)

    let xmlContent: string | undefined
    try {
        const xmlObject = await getObject({
            var: c.var,
            storageKey: xmlStorageKey,
        })
        xmlContent = await xmlObject.Body?.transformToString()
    } catch {
        // Fall back to on-demand regeneration for historical invoices without XML yet.
    }

    if (!xmlContent) {
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        const invoicePayments = await c.var.clients.sql
            .select({
                amountInCents: models.organizationPayment.amountInCents,
                description: models.organizationPayment.description,
                serviceType: models.organizationPayment.serviceType,
            })
            .from(models.organizationPayment)
            .where(eq(models.organizationPayment.idInvoice, invoice.id))

        xmlContent = buildInvoiceUblXml({
            invoiceNumber: invoice.invoiceNumber,
            issueDateIso: invoice.createdAt,
            dueDateIso: invoice.createdAt,
            periodStartIso: invoice.periodStart,
            periodEndIso: invoice.periodEnd,
            amountInCents: invoice.amountInCents,
            currency: invoice.currency,
            supplierName: "Barbote SAS",
            supplierSiren: "908719503",
            supplierVatId: "FR02908719503",
            supplierAddress: "93 rue Sedaine, 75011 Paris, FR",
            customerName: organization.name,
            customerSiren: organization.siren,
            customerEmail: organization.email,
            lines: invoicePayments.map((payment) => ({
                serviceType: payment.serviceType,
                description: payment.description,
                amountInCents: payment.amountInCents,
                quantity: 1,
            })),
        })

        const xmlBuffer = Buffer.from(xmlContent, "utf8")
        await putObject({
            var: c.var,
            body: xmlBuffer,
            storageKey: xmlStorageKey,
            contentType: "application/xml",
            contentLength: xmlBuffer.length,
            metadata: {
                idOrganization,
                invoiceNumber: invoice.invoiceNumber,
            },
        })
    }

    return response({
        context: c,
        statusCode: 200,
        schema: readOneInvoiceUblRouteDefinition.schemas.return,
        data: {
            invoiceNumber: invoice.invoiceNumber,
            fileName: `${invoice.invoiceNumber}.xml`,
            xml: xmlContent,
        },
    })
})
