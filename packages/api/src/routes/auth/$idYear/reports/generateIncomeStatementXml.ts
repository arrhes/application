import { generateIncomeStatementXmlRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "../../../../utilities/storage/generateGetSignedUrl.js"
import { putObject } from "../../../../utilities/storage/putObject.js"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Account = (typeof models.account)["$inferSelect"]
type EntryLine = (typeof models.entryLine)["$inferSelect"]
type IncomeStatement = (typeof models.incomeStatement)["$inferSelect"]
type Computation = (typeof models.computation)["$inferSelect"]
type ComputationIncomeStatement = (typeof models.computationIncomeStatement)["$inferSelect"]

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Sanitize a string into a valid XML local name segment */
function toXmlName(s: string): string {
    return s
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]/g, "_")
        .replace(/^_+/, "")
        .replace(/_+/g, "_")
}

function fmt(n: number): string {
    return n.toFixed(2)
}

function computeIncomeStatementAmounts(
    incomeStatements: IncomeStatement[],
    accounts: Account[],
    entryLines: EntryLine[],
): Map<string, number> {
    const amounts = new Map<string, number>()
    for (const row of incomeStatements) {
        let amount = 0
        accounts
            .filter((a) => a.idIncomeStatement === row.id)
            .forEach((account) => {
                let debit = 0
                let credit = 0
                entryLines
                    .filter((el) => el.idAccount === account.id)
                    .forEach((el) => {
                        debit += Number(el.debit)
                        credit += Number(el.credit)
                    })
                amount += Math.abs(debit - credit)
            })
        amounts.set(row.id, amount)
    }
    return amounts
}

function computeComputationAmounts(
    computations: Computation[],
    computationIncomeStatements: ComputationIncomeStatement[],
    incomeStatementAmounts: Map<string, number>,
): Map<string, number> {
    const amounts = new Map<string, number>()
    for (const computation of computations) {
        let amount = 0
        computationIncomeStatements
            .filter((cis) => cis.idComputation === computation.id)
            .forEach((cis) => {
                const lineAmount = incomeStatementAmounts.get(cis.idIncomeStatement) ?? 0
                amount += cis.operation === "plus" ? Math.abs(lineAmount) : -Math.abs(lineAmount)
            })
        amounts.set(computation.id, amount)
    }
    return amounts
}

// ---------------------------------------------------------------------------
// XBRL builder
// ---------------------------------------------------------------------------

function buildIncomeStatementXbrl(params: {
    organizationName: string
    siren: string | null
    startingAt: string
    endingAt: string
    incomeStatements: IncomeStatement[]
    computations: Computation[]
    computationIncomeStatements: ComputationIncomeStatement[]
    accounts: Account[]
    entryLines: EntryLine[]
}): string {
    const {
        organizationName,
        siren,
        startingAt,
        endingAt,
        incomeStatements,
        computations,
        computationIncomeStatements,
        accounts,
        entryLines,
    } = params

    const entityId = siren ?? organizationName
    const entityScheme = siren ? "http://www.insee.fr/siren" : "http://www.arrhes.fr/organization"

    const startDate = startingAt.slice(0, 10)
    const endDate = endingAt.slice(0, 10)
    const contextId = `D-${startDate}_${endDate}`

    const incomeStatementAmounts = computeIncomeStatementAmounts(incomeStatements, accounts, entryLines)
    const computationAmounts = computeComputationAmounts(
        computations,
        computationIncomeStatements,
        incomeStatementAmounts,
    )

    const facts: string[] = []

    // Income statement regular lines
    for (const row of incomeStatements) {
        const amount = incomeStatementAmounts.get(row.id) ?? 0
        const key = `CR${row.number}_${toXmlName(row.label)}`
        facts.push(`    <!-- ${row.label} (ligne ${row.number}) -->`)
        facts.push(
            `    <fr-gaap:${key} contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(amount)}</fr-gaap:${key}>`,
        )
    }

    // Computation rows (soldes intermédiaires de gestion)
    for (const computation of computations) {
        const amount = computationAmounts.get(computation.id) ?? 0
        const key = `Solde${computation.number}_${toXmlName(computation.label)}`
        facts.push(`    <!-- ${computation.label} (solde ${computation.number}) -->`)
        facts.push(
            `    <fr-gaap:${key} contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(amount)}</fr-gaap:${key}>`,
        )
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<!--
    Compte de Résultat (Income Statement) - French GAAP XBRL Instance Document
    Taxonomy: ANC French GAAP CI (Compte Individuel)
    Generated by Arrhes
-->
<xbrli:xbrl
    xmlns:xbrli="http://www.xbrl.org/2003/instance"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:link="http://www.xbrl.org/2003/linkbase"
    xmlns:iso4217="http://www.xbrl.org/2003/iso4217"
    xmlns:fr-gaap="http://www.xbrl.fr/fr-gaap-ci/2022-01-01">

    <link:schemaRef
        xlink:type="simple"
        xlink:href="http://www.xbrl.fr/fr-gaap-ci/2022-01-01/fr-gaap-ci.xsd"
        xlink:title="French GAAP CI taxonomy - ANC"/>

    <!-- Reporting period context (duration) -->
    <xbrli:context id="${contextId}">
        <xbrli:entity>
            <xbrli:identifier scheme="${entityScheme}">${entityId}</xbrli:identifier>
        </xbrli:entity>
        <xbrli:period>
            <xbrli:startDate>${startDate}</xbrli:startDate>
            <xbrli:endDate>${endDate}</xbrli:endDate>
        </xbrli:period>
    </xbrli:context>

    <xbrli:unit id="EUR">
        <xbrli:measure>iso4217:EUR</xbrli:measure>
    </xbrli:unit>

${facts.join("\n")}

</xbrli:xbrl>
`
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

export const generateIncomeStatementXmlRoute = apiFactory
    .createApp()
    .post(generateIncomeStatementXmlRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateIncomeStatementXmlRouteDefinition.schemas.body,
        })

        const [year, organization, entryLines, accounts, incomeStatements, computations, computationIncomeStatements] =
            await Promise.all([
                selectOne({
                    database: c.var.clients.sql,
                    table: models.year,
                    where: (t) => and(eq(t.idOrganization, idOrganization), eq(t.id, body.idYear)),
                }),
                selectOne({
                    database: c.var.clients.sql,
                    table: models.organization,
                    where: (t) => eq(t.id, idOrganization),
                }),
                selectMany({
                    database: c.var.clients.sql,
                    table: models.entryLine,
                    where: (t) =>
                        and(
                            eq(t.idOrganization, idOrganization),
                            eq(t.idYear, body.idYear),
                            eq(t.isComputedForIncomeStatementReport, true),
                        ),
                }),
                selectMany({
                    database: c.var.clients.sql,
                    table: models.account,
                    where: (t) => and(eq(t.idOrganization, idOrganization), eq(t.idYear, body.idYear)),
                }),
                selectMany({
                    database: c.var.clients.sql,
                    table: models.incomeStatement,
                    where: (t) => and(eq(t.idOrganization, idOrganization), eq(t.idYear, body.idYear)),
                }),
                selectMany({
                    database: c.var.clients.sql,
                    table: models.computation,
                    where: (t) => and(eq(t.idOrganization, idOrganization), eq(t.idYear, body.idYear)),
                }),
                selectMany({
                    database: c.var.clients.sql,
                    table: models.computationIncomeStatement,
                    where: (t) => and(eq(t.idOrganization, idOrganization), eq(t.idYear, body.idYear)),
                }),
            ])

        const xml = buildIncomeStatementXbrl({
            organizationName: organization.name,
            siren: organization.siren,
            startingAt: year.startingAt,
            endingAt: year.endingAt,
            incomeStatements,
            computations,
            computationIncomeStatements,
            accounts,
            entryLines,
        })

        const xmlBuffer = Buffer.from(xml, "utf-8")
        const storageKey = `organizations/${idOrganization}/${body.idYear}/reports/income-statement.xml`

        await putObject({
            var: c.var,
            body: xmlBuffer,
            storageKey,
            contentType: "application/xml",
            contentLength: xmlBuffer.length,
            metadata: {
                idOrganization,
                idYear: body.idYear,
                idUser: user.id,
            },
        })

        const url = await generateGetSignedUrl({
            var: c.var,
            storageKey,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateIncomeStatementXmlRouteDefinition.schemas.return,
            data: {
                url,
            },
        })
    })
