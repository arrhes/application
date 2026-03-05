import path from "node:path"
import { fileURLToPath } from "node:url"
import { generateId, generateIncomeStatementReportDocumentRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { launch } from "puppeteer"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { incomeStatementReportTemplate } from "../../../../utilities/email/templates/incomeStatementReport/incomeStatementReport.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"
import { putObject } from "../../../../utilities/storage/putObject.js"

export const generateIncomeStatementReportDocumentRoute = apiFactory
    .createApp()
    .post(generateIncomeStatementReportDocumentRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateIncomeStatementReportDocumentRouteDefinition.schemas.body,
        })

        const readAllRecordRows = await selectMany({
            database: c.var.clients.sql,
            table: models.recordRow,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllAccounts = await selectMany({
            database: c.var.clients.sql,
            table: models.account,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllIncomeStatements = await selectMany({
            database: c.var.clients.sql,
            table: models.incomeStatement,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllComputations = await selectMany({
            database: c.var.clients.sql,
            table: models.computation,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllComputationIncomeStatements = await selectMany({
            database: c.var.clients.sql,
            table: models.computationIncomeStatement,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const browser = await launch({
            args: ["--no-sandbox"],
            headless: true,
        })
        const page = await browser.newPage()

        const htmlResponse = await c.html(
            incomeStatementReportTemplate({
                accounts: readAllAccounts,
                recordRows: readAllRecordRows,
                incomeStatements: readAllIncomeStatements,
                computations: readAllComputations,
                computationIncomeStatements: readAllComputationIncomeStatements,
            }),
        )
        const htmlString = await htmlResponse.text()
        await page.setContent(htmlString)

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const fontPath = path.resolve(
            __dirname,
            "./packages/api/src/utilities/email/templates/fonts/SometypeMono-VariableFont_wght.ttf",
        )
        await page.addStyleTag({
            content: `
                @font-face {
                    font-family: "Sometype Mono";
                    src: url("file://${fontPath}") format("truetype");
                    font-style: normal;
                    font-weight: 400 500 600 700;
                    font-display: auto;
                }
                * {
                    box-sizing: border-box;
                    font-family: "Sometype Mono", sans-serif;
                }
                body {
                    margin: 0;
                }
            `,
        })

        const bodyHandle = await page.$("body")
        const boundingBox = await bodyHandle?.boundingBox()
        await bodyHandle?.dispose()

        const pdfBuffer = await page.pdf({
            landscape: false,
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            width: `${boundingBox?.width}px`,
            height: `${(boundingBox?.height ?? 0) + 64 + 16}px`,
            pageRanges: "1",
        })
        const pdfBody = Buffer.from(pdfBuffer)

        await browser.close()

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        if (organization.storageCurrentUsage + pdfBody.length > organization.storageLimit) {
            throw new Exception({
                internalMessage: "Storage limit exceeded",
                statusCode: 400,
                externalMessage: "Limite de stockage atteinte",
            })
        }

        const idDocument = generateId()
        const storageKey = `organizations/${idOrganization}/${body.idYear}/reports/${idDocument}`
        await putObject({
            var: c.var,
            body: pdfBody,
            storageKey: storageKey,
            contentType: "application/pdf",
            contentLength: pdfBody.length,
            metadata: {
                idOrganization: idOrganization,
                idYear: body.idYear,
                idUser: user.id,
            },
        })

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                storageCurrentUsage: sql`${models.organization.storageCurrentUsage} + ${pdfBody.length}`,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        const createOneDocument = await insertOne({
            database: c.var.clients.sql,
            table: models.document,
            data: {
                id: idDocument,
                idOrganization: idOrganization,
                idYear: body.idYear,
                label: `compte_de_résultat-${idOrganization}-${body.idYear}`,
                type: "compte_de_résultat",
                storageKey: storageKey,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateIncomeStatementReportDocumentRouteDefinition.schemas.return,
            data: createOneDocument,
        })
    })
