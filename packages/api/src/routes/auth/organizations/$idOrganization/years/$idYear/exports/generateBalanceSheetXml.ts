import { generateBalanceSheetXmlRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../../utilities/sql/selectOne.js"
import { generateGetSignedUrl } from "../../../../../../../utilities/storage/generateGetSignedUrl.js"
import { putObject } from "../../../../../../../utilities/storage/putObject.js"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getAllDescendants(
    root: {
        id: string
    },
    all: Array<{
        id: string
        idBalanceSheetParent: string | null
    }>,
): Array<{
    id: string
    idBalanceSheetParent: string | null
}> {
    const direct = all.filter((bs) => bs.idBalanceSheetParent === root.id)
    return direct.flatMap((child) => [
        child,
        ...getAllDescendants(child, all),
    ])
}

type Account = (typeof models.account)["$inferSelect"]
type EntryLine = (typeof models.entryLine)["$inferSelect"]
type BalanceSheet = (typeof models.balanceSheet)["$inferSelect"]

function computeAssetRow(
    row: BalanceSheet,
    all: BalanceSheet[],
    accounts: Account[],
    entryLines: EntryLine[],
): {
    gross: number
    amortization: number
    net: number
} {
    const descendants = getAllDescendants(row, all)
    let gross = 0
    let amortization = 0

    accounts
        .filter((a) => a.idBalanceSheetAsset === row.id || descendants.some((d) => d.id === a.idBalanceSheetAsset))
        .forEach((account) => {
            let debit = 0
            let credit = 0
            entryLines
                .filter((el) => el.idAccount === account.id)
                .forEach((el) => {
                    debit += Number(el.debit)
                    credit += Number(el.credit)
                })
            const balance = debit - credit
            if (balance < 0 && account.balanceSheetAssetFlow === "debit") return
            if (balance > 0 && account.balanceSheetAssetFlow === "credit") return
            const signed = account.balanceSheetAssetFlow === "debit" ? Math.abs(balance) : -Math.abs(balance)
            if (account.balanceSheetAssetColumn === "gross") gross += signed
            if (account.balanceSheetAssetColumn === "amortization") amortization += signed
        })

    return {
        gross,
        amortization,
        net: gross + amortization,
    }
}

function computeLiabilityRow(
    row: BalanceSheet,
    all: BalanceSheet[],
    accounts: Account[],
    entryLines: EntryLine[],
): number {
    const descendants = getAllDescendants(row, all)
    let net = 0

    accounts
        .filter(
            (a) => a.idBalanceSheetLiability === row.id || descendants.some((d) => d.id === a.idBalanceSheetLiability),
        )
        .forEach((account) => {
            let debit = 0
            let credit = 0
            entryLines
                .filter((el) => el.idAccount === account.id)
                .forEach((el) => {
                    debit += Number(el.debit)
                    credit += Number(el.credit)
                })
            const balance = credit - debit
            if (balance > 0 && account.balanceSheetLiabilityFlow === "debit") return
            if (balance < 0 && account.balanceSheetLiabilityFlow === "credit") return
            net += balance
        })

    return net
}

/** Sanitize a string into a valid XML local name segment (no spaces, no special chars) */
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

// ---------------------------------------------------------------------------
// XBRL builder
// ---------------------------------------------------------------------------

function buildBalanceSheetXbrl(params: {
    organizationName: string
    siren: string | null
    startingAt: string
    endingAt: string
    accounts: Account[]
    entryLines: EntryLine[]
    balanceSheets: BalanceSheet[]
}): string {
    const { organizationName, siren, startingAt, endingAt, accounts, entryLines, balanceSheets } = params

    const entityId = siren ?? organizationName
    const entityScheme = siren ? "http://www.insee.fr/siren" : "http://www.arrhes.fr/organization"

    const endDate = endingAt.slice(0, 10)
    const startDate = startingAt.slice(0, 10)
    const contextId = `D-${startDate}_${endDate}`

    const facts: string[] = []

    // Assets
    const assetRows = balanceSheets.filter((bs) => bs.side === "asset")
    let totalGross = 0
    let totalAmort = 0
    let totalNet = 0

    for (const row of assetRows) {
        const { gross, amortization, net } = computeAssetRow(row, balanceSheets, accounts, entryLines)
        const key = `Actif${row.number}_${toXmlName(row.label)}`
        facts.push(`    <!-- ${row.label} (Actif, ligne ${row.number}) -->`)
        facts.push(
            `    <fr-gaap:${key}Brut contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(gross)}</fr-gaap:${key}Brut>`,
        )
        facts.push(
            `    <fr-gaap:${key}AmortissementsDepreciations contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(Math.abs(amortization))}</fr-gaap:${key}AmortissementsDepreciations>`,
        )
        facts.push(
            `    <fr-gaap:${key}Net contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(net)}</fr-gaap:${key}Net>`,
        )
        if (row.idBalanceSheetParent === null) {
            totalGross += gross
            totalAmort += amortization
            totalNet += net
        }
    }

    facts.push(`    <!-- Total Actif -->`)
    facts.push(
        `    <fr-gaap:TotalActifBrut contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(totalGross)}</fr-gaap:TotalActifBrut>`,
    )
    facts.push(
        `    <fr-gaap:TotalActifAmortissementsDepreciations contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(Math.abs(totalAmort))}</fr-gaap:TotalActifAmortissementsDepreciations>`,
    )
    facts.push(
        `    <fr-gaap:TotalActifNet contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(totalNet)}</fr-gaap:TotalActifNet>`,
    )

    // Liabilities
    const liabilityRows = balanceSheets.filter((bs) => bs.side === "liability")
    let totalLiabilityNet = 0

    for (const row of liabilityRows) {
        const net = computeLiabilityRow(row, balanceSheets, accounts, entryLines)
        const key = `Passif${row.number}_${toXmlName(row.label)}`
        facts.push(`    <!-- ${row.label} (Passif, ligne ${row.number}) -->`)
        facts.push(
            `    <fr-gaap:${key}Net contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(net)}</fr-gaap:${key}Net>`,
        )
        if (row.idBalanceSheetParent === null) totalLiabilityNet += net
    }

    facts.push(`    <!-- Total Passif -->`)
    facts.push(
        `    <fr-gaap:TotalPassifNet contextRef="${contextId}" unitRef="EUR" decimals="2">${fmt(totalLiabilityNet)}</fr-gaap:TotalPassifNet>`,
    )

    return `<?xml version="1.0" encoding="UTF-8"?>
<!--
    Bilan (Balance Sheet) - French GAAP XBRL Instance Document
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

    <!-- Reporting period context (duration for balance sheet snapshot) -->
    <xbrli:context id="${contextId}">
        <xbrli:entity>
            <xbrli:identifier scheme="${entityScheme}">${entityId}</xbrli:identifier>
        </xbrli:entity>
        <xbrli:period>
            <xbrli:instant>${endDate}</xbrli:instant>
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

export const generateBalanceSheetXmlRoute = apiFactory
    .createApp()
    .post(generateBalanceSheetXmlRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateBalanceSheetXmlRouteDefinition.schemas.body,
        })

        const [year, organization, entryLines, accounts, balanceSheets] = await Promise.all([
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
                        eq(t.isComputedForBalanceSheetReport, true),
                    ),
            }),
            selectMany({
                database: c.var.clients.sql,
                table: models.account,
                where: (t) => and(eq(t.idOrganization, idOrganization), eq(t.idYear, body.idYear)),
            }),
            selectMany({
                database: c.var.clients.sql,
                table: models.balanceSheet,
                where: (t) => and(eq(t.idOrganization, idOrganization), eq(t.idYear, body.idYear)),
            }),
        ])

        const xml = buildBalanceSheetXbrl({
            organizationName: organization.name,
            siren: null,
            startingAt: year.startingAt,
            endingAt: year.endingAt,
            accounts,
            entryLines,
            balanceSheets,
        })

        const xmlBuffer = Buffer.from(xml, "utf-8")
        const storageKey = `organizations/${idOrganization}/${body.idYear}/exports/balance-sheet.xml`

        await putObject({
            var: c.var,
            body: xmlBuffer,
            storageKey,
            contentType: "application/xml",
            contentLength: xmlBuffer.length,
            metadata: {
                idOrganization,
                idYear: body.idYear,
                idUser: auth.user.id,
            },
        })

        const url = await generateGetSignedUrl({
            var: c.var,
            storageKey,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateBalanceSheetXmlRouteDefinition.schemas.return,
            data: {
                url,
            },
        })
    })
