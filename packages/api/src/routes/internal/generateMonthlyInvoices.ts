import path from "node:path"
import { fileURLToPath } from "node:url"
import { generateId, models } from "@arrhes/application-metadata"
import { and, eq, inArray, isNotNull, isNull } from "drizzle-orm"
import { launch } from "puppeteer"
import * as v from "valibot"
import { apiFactory } from "../../utilities/apiFactory.js"
import { apiLog } from "../../utilities/apiLog.js"
import {
    findOrCreateCurrentPeriodInvoice,
    generateRandomInvoiceReference,
} from "../../utilities/billing/billingInvoice.js"
import {
    getResourceSubscriptionUnitPriceInCents,
    getStorageAddonQuantity,
    getStorageRecurringAmountInCents,
} from "../../utilities/billing/subscriptionPricing.js"
import { recordOrganizationPayment } from "../../utilities/billing/wallet.js"
import { invoiceTemplate } from "../../utilities/email/templates/invoice/invoiceTemplate.js"
import { Exception } from "../../utilities/exception.js"
import { response } from "../../utilities/response.js"
import { insertOne } from "../../utilities/sql/insertOne.js"
import { updateOne } from "../../utilities/sql/updateOne.js"
import { putObject } from "../../utilities/storage/putObject.js"

const generateMonthlyInvoicesReturnSchema = v.object({ generatedCount: v.number() })

type InvoiceLineType = "support" | "storage_gb" | "agent_tokens_million" | "ocr_pages_hundred"
type ServicePaymentRecord = {
    id: string
    idOrganization: string
    serviceType: InvoiceLineType
    amountInCents: number
    paidAt: string | null
    createdAt: string
}

async function createInvoicePdf(parameters: {
    browser: Awaited<ReturnType<typeof launch>>
    fontPath: string
    invoiceNumber: string
    periodStartISO: string
    periodEndISO: string
    organizationName: string
    organizationEmail: string
    amountInCents: number
    subscriptions: Array<{ type: InvoiceLineType; quantity: number; amountInCents: number }>
}) {
    const page = await parameters.browser.newPage()

    try {
        const htmlContent = invoiceTemplate({
            invoiceNumber: parameters.invoiceNumber,
            periodStart: parameters.periodStartISO,
            periodEnd: parameters.periodEndISO,
            organizationName: parameters.organizationName,
            organizationEmail: parameters.organizationEmail,
            amountInCents: parameters.amountInCents,
            subscriptions: parameters.subscriptions,
        })

        await page.setContent(htmlContent)
        await page.addStyleTag({
            content: `
                @font-face {
                    font-family: "Sometype Mono";
                    src: url("file://${parameters.fontPath}") format("truetype");
                    font-style: normal;
                    font-weight: 400 500 600 700;
                    font-display: auto;
                }
            `,
        })

        const pdfBuffer = await page.pdf({
            format: "A4",
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 },
        })

        return Buffer.from(pdfBuffer)
    } finally {
        await page.close()
    }
}

function getCurrentMonthRange(date: Date) {
    const periodStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
    const periodEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, 23, 59, 59, 999))

    return { periodStart, periodEnd }
}

function getPreviousMonthRange(date: Date) {
    const periodStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, 1))
    const periodEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 0, 23, 59, 59, 999))

    return { periodStart, periodEnd }
}

function isInvoiceLineType(value: string | null): value is InvoiceLineType {
    return (
        value === "support" ||
        value === "storage_gb" ||
        value === "agent_tokens_million" ||
        value === "ocr_pages_hundred"
    )
}

function getServicePaymentDescription(type: InvoiceLineType) {
    if (type === "support") return "Licence mensuelle"
    if (type === "storage_gb") return "Stockage mensuel"
    if (type === "agent_tokens_million") return "Achat tokens Assistant IA"
    return "Achat pages OCR"
}

function isDateWithinRange(dateISO: string, start: Date, end: Date) {
    const date = new Date(dateISO)
    return date.getTime() >= start.getTime() && date.getTime() <= end.getTime()
}

function getInvoiceLineQuantity(type: InvoiceLineType, amountInCents: number) {
    if (type === "support") {
        return 1
    }

    const unitPrice = getResourceSubscriptionUnitPriceInCents(type)
    return Math.max(Math.round(amountInCents / unitPrice), 1)
}

function buildInvoiceLinesFromPayments(payments: ServicePaymentRecord[]) {
    const aggregates = new Map<InvoiceLineType, { quantity: number; amountInCents: number }>()

    for (const payment of payments) {
        const aggregate = aggregates.get(payment.serviceType) ?? { quantity: 0, amountInCents: 0 }
        aggregate.quantity += getInvoiceLineQuantity(payment.serviceType, payment.amountInCents)
        aggregate.amountInCents += payment.amountInCents
        aggregates.set(payment.serviceType, aggregate)
    }

    const orderedTypes: InvoiceLineType[] = ["support", "storage_gb", "agent_tokens_million", "ocr_pages_hundred"]

    return orderedTypes.flatMap((type) => {
        const aggregate = aggregates.get(type)
        if (!aggregate) {
            return []
        }

        return [
            {
                type,
                quantity: aggregate.quantity,
                amountInCents: aggregate.amountInCents,
            },
        ]
    })
}

function buildRecurringInvoiceLines(organization: typeof models.organization.$inferSelect) {
    const lines: Array<{ type: "support" | "storage_gb"; quantity: number; amountInCents: number }> = []

    if (organization.licenceAmount > 0) {
        lines.push({
            type: "support",
            quantity: 1,
            amountInCents: organization.licenceAmount,
        })
    }

    const storageAddonQuantity = getStorageAddonQuantity(organization.storageMaxUsage)
    const storageAmountInCents = getStorageRecurringAmountInCents(organization.storageMaxUsage)

    if (storageAddonQuantity > 0 && storageAmountInCents > 0) {
        lines.push({
            type: "storage_gb",
            quantity: storageAddonQuantity,
            amountInCents: storageAmountInCents,
        })
    }

    return lines
}

export const generateMonthlyInvoicesRoute = apiFactory
    .createApp()
    .post("/internal/generate-monthly-invoices", async (c) => {
        // Protect this route with the INTERNAL_API_KEY
        const apiKey = c.req.header("x-internal-api-key")
        if (!c.var.env.INTERNAL_API_KEY || apiKey !== c.var.env.INTERNAL_API_KEY) {
            throw new Exception({ statusCode: 401, internalMessage: "Unauthorized" })
        }

        const now = new Date()
        const { periodStart: previousPeriodStart, periodEnd: previousPeriodEnd } = getPreviousMonthRange(now)
        const { periodStart: currentPeriodStart, periodEnd: currentPeriodEnd } = getCurrentMonthRange(now)

        const previousPeriodStartISO = previousPeriodStart.toISOString()
        const previousPeriodEndISO = previousPeriodEnd.toISOString()
        const currentPeriodStartISO = currentPeriodStart.toISOString()
        const currentPeriodEndISO = currentPeriodEnd.toISOString()

        const invoicePrefix = `${String(previousPeriodStart.getUTCFullYear())}-${String(previousPeriodStart.getUTCMonth() + 1).padStart(2, "0")}`

        const organizations = await c.var.clients.sql.select().from(models.organization)
        const orgIds = organizations.map((organization) => organization.id)

        if (orgIds.length === 0) {
            return response({
                context: c,
                statusCode: 200,
                schema: generateMonthlyInvoicesReturnSchema,
                data: { generatedCount: 0 },
            })
        }

        const orgMap = new Map(organizations.map((organization) => [organization.id, organization]))

        // ── Phase 0: Apply pending subscription changes ──────────────────────────
        // Changes set by users during the previous month are applied now before billing.
        const orgsWithPendingChanges = organizations.filter(
            (org) => org.pendingLicenceAmount !== null || org.pendingStorageMaxUsage !== null,
        )

        for (const org of orgsWithPendingChanges) {
            try {
                await updateOne({
                    database: c.var.clients.sql,
                    table: models.organization,
                    data: {
                        ...(org.pendingLicenceAmount !== null
                            ? { licenceAmount: org.pendingLicenceAmount, pendingLicenceAmount: null }
                            : {}),
                        ...(org.pendingStorageMaxUsage !== null
                            ? {
                                  storageMaxUsage: org.pendingStorageMaxUsage,
                                  storageLimit: org.pendingStorageMaxUsage,
                                  pendingStorageMaxUsage: null,
                              }
                            : {}),
                        lastUpdatedAt: now.toISOString(),
                    },
                    where: (table) => eq(table.id, org.id),
                })

                const orgInMap = orgMap.get(org.id)
                if (orgInMap) {
                    if (org.pendingLicenceAmount !== null) {
                        orgInMap.licenceAmount = org.pendingLicenceAmount
                        orgInMap.pendingLicenceAmount = null
                    }
                    if (org.pendingStorageMaxUsage !== null) {
                        orgInMap.storageMaxUsage = org.pendingStorageMaxUsage
                        orgInMap.storageLimit = org.pendingStorageMaxUsage
                        orgInMap.pendingStorageMaxUsage = null
                    }
                }
            } catch (error) {
                apiLog({
                    var: c.var,
                    type: "error",
                    internalMessage: `Failed to apply pending subscription changes for org ${org.id}`,
                    cause: error instanceof Error ? error.message : String(error),
                    stack: error instanceof Error ? error.stack : undefined,
                })
            }
        }

        // ── Phase 1: Generate PDFs for all pending draft invoices ────────────────
        // Path A: invoices already created as drafts when payments were made during the month.
        // Processes drafts from any period so that historical seed data or catch-up invoices
        // are also rendered — not only the immediately-previous month.
        const draftInvoicesLastMonth = await c.var.clients.sql
            .select({
                id: models.invoice.id,
                idOrganization: models.invoice.idOrganization,
                invoiceNumber: models.invoice.invoiceNumber,
                periodStart: models.invoice.periodStart,
                periodEnd: models.invoice.periodEnd,
            })
            .from(models.invoice)
            .where(and(inArray(models.invoice.idOrganization, orgIds), eq(models.invoice.status, "draft")))

        // Only orgs with a previous-month draft are excluded from Path B (orphan-payment handling).
        // Orgs with drafts from other periods still need Path B to run for last-month orphans.
        const orgsWithPreviousMonthDraftInvoice = new Set(
            draftInvoicesLastMonth
                .filter((inv) => inv.periodStart === previousPeriodStartISO)
                .map((inv) => inv.idOrganization),
        )

        // Path B: backward compat — orgs with uninvoiced payments from last month (pre-migration data)
        const uninvoicedPreviousMonthPaymentsRaw = await c.var.clients.sql
            .select({
                id: models.organizationPayment.id,
                idOrganization: models.organizationPayment.idOrganization,
                serviceType: models.organizationPayment.serviceType,
                amountInCents: models.organizationPayment.amountInCents,
                paidAt: models.organizationPayment.paidAt,
                createdAt: models.organizationPayment.createdAt,
            })
            .from(models.organizationPayment)
            .where(
                and(
                    inArray(models.organizationPayment.idOrganization, orgIds),
                    eq(models.organizationPayment.status, "paid"),
                    isNotNull(models.organizationPayment.serviceType),
                    isNull(models.organizationPayment.idInvoice),
                ),
            )

        const prevMonthOrphanPayments = uninvoicedPreviousMonthPaymentsRaw.reduce<Map<string, ServicePaymentRecord[]>>(
            (accumulator, payment) => {
                if (isInvoiceLineType(payment.serviceType) === false) return accumulator
                const effectiveDate = payment.paidAt ?? payment.createdAt
                if (isDateWithinRange(effectiveDate, previousPeriodStart, previousPeriodEnd) === false)
                    return accumulator
                // Skip orgs that already have a draft invoice for the previous month — handled via Path A
                if (orgsWithPreviousMonthDraftInvoice.has(payment.idOrganization)) return accumulator
                const list = accumulator.get(payment.idOrganization) ?? []
                list.push({
                    id: payment.id,
                    idOrganization: payment.idOrganization,
                    serviceType: payment.serviceType,
                    amountInCents: payment.amountInCents,
                    paidAt: payment.paidAt,
                    createdAt: payment.createdAt,
                } satisfies ServicePaymentRecord)
                accumulator.set(payment.idOrganization, list)
                return accumulator
            },
            new Map(),
        )

        let browser: Awaited<ReturnType<typeof launch>> | null = null

        try {
            browser = await launch({ args: ["--no-sandbox"], headless: true })
        } catch (error) {
            apiLog({
                var: c.var,
                type: "information",
                message: `Monthly invoice PDF rendering unavailable, continuing without PDF: ${error instanceof Error ? error.message : String(error)}`,
            })
        }

        const __filename = fileURLToPath(import.meta.url)
        const __dirname = path.dirname(__filename)
        const fontPath = path.resolve(
            __dirname,
            "./packages/api/src/utilities/email/templates/fonts/SometypeMono-VariableFont_wght.ttf",
        )

        let generatedCount = 0

        // Path A: generate PDFs for all pending draft invoices
        for (const draftInvoice of draftInvoicesLastMonth) {
            const organization = orgMap.get(draftInvoice.idOrganization)
            if (!organization) continue

            // Derive period prefix from the invoice's own periodStart (not the global previous-month)
            const invPeriodDate = new Date(draftInvoice.periodStart)
            const invPrefix = `${String(invPeriodDate.getUTCFullYear())}-${String(invPeriodDate.getUTCMonth() + 1).padStart(2, "0")}`

            try {
                const invoicePaymentsRaw = await c.var.clients.sql
                    .select({
                        id: models.organizationPayment.id,
                        idOrganization: models.organizationPayment.idOrganization,
                        serviceType: models.organizationPayment.serviceType,
                        amountInCents: models.organizationPayment.amountInCents,
                        paidAt: models.organizationPayment.paidAt,
                        createdAt: models.organizationPayment.createdAt,
                    })
                    .from(models.organizationPayment)
                    .where(eq(models.organizationPayment.idInvoice, draftInvoice.id))

                const servicePayments = invoicePaymentsRaw.filter((p) =>
                    isInvoiceLineType(p.serviceType),
                ) as ServicePaymentRecord[]

                if (servicePayments.length === 0) continue

                const invoiceLines = buildInvoiceLinesFromPayments(servicePayments)
                const totalAmountInCents = invoiceLines.reduce((sum, line) => sum + line.amountInCents, 0)

                let storageKey: string | null = null

                if (browser !== null) {
                    const pdfBody = await createInvoicePdf({
                        browser,
                        fontPath,
                        invoiceNumber: draftInvoice.invoiceNumber,
                        periodStartISO: draftInvoice.periodStart,
                        periodEndISO: draftInvoice.periodEnd,
                        organizationName: organization.name,
                        organizationEmail: organization.email ?? "",
                        amountInCents: totalAmountInCents,
                        subscriptions: invoiceLines,
                    })

                    storageKey = `invoices/${draftInvoice.idOrganization}/${invPrefix}.pdf`

                    await putObject({
                        var: c.var,
                        body: pdfBody,
                        storageKey,
                        contentType: "application/pdf",
                        contentLength: pdfBody.length,
                        metadata: {
                            idOrganization: draftInvoice.idOrganization,
                            invoiceNumber: draftInvoice.invoiceNumber,
                            period: invPrefix,
                        },
                    })
                }

                await updateOne({
                    database: c.var.clients.sql,
                    table: models.invoice,
                    data: {
                        amountInCents: totalAmountInCents,
                        storageKey,
                        status: "paid",
                        lastUpdatedAt: now.toISOString(),
                    },
                    where: (table) => eq(table.id, draftInvoice.id),
                })

                generatedCount++
            } catch (error) {
                apiLog({
                    var: c.var,
                    type: "error",
                    internalMessage: `Failed to generate invoice PDF for org ${draftInvoice.idOrganization}`,
                    cause: error instanceof Error ? error.message : String(error),
                    stack: error instanceof Error ? error.stack : undefined,
                })
            }
        }

        // Path B: backward compat — create and immediately generate invoices for orphaned payments
        for (const [idOrganization, payments] of prevMonthOrphanPayments) {
            const organization = orgMap.get(idOrganization)
            if (!organization || payments.length === 0) continue

            try {
                const invoiceNumber = generateRandomInvoiceReference(previousPeriodStart)

                const invoiceLines = buildInvoiceLinesFromPayments(payments)
                const totalAmountInCents = invoiceLines.reduce((sum, line) => sum + line.amountInCents, 0)

                let storageKey: string | null = null

                if (browser !== null) {
                    const pdfBody = await createInvoicePdf({
                        browser,
                        fontPath,
                        invoiceNumber,
                        periodStartISO: previousPeriodStartISO,
                        periodEndISO: previousPeriodEndISO,
                        organizationName: organization.name,
                        organizationEmail: organization.email ?? "",
                        amountInCents: totalAmountInCents,
                        subscriptions: invoiceLines,
                    })

                    storageKey = `invoices/${idOrganization}/${invoicePrefix}.pdf`

                    await putObject({
                        var: c.var,
                        body: pdfBody,
                        storageKey,
                        contentType: "application/pdf",
                        contentLength: pdfBody.length,
                        metadata: { idOrganization, invoiceNumber, period: invoicePrefix },
                    })
                }

                const invoiceId = generateId()
                await insertOne({
                    database: c.var.clients.sql,
                    table: models.invoice,
                    data: {
                        id: invoiceId,
                        idOrganization,
                        invoiceNumber,
                        periodStart: previousPeriodStartISO,
                        periodEnd: previousPeriodEndISO,
                        amountInCents: totalAmountInCents,
                        currency: "EUR",
                        storageKey,
                        status: "paid",
                        createdAt: now.toISOString(),
                        lastUpdatedAt: null,
                    },
                })

                await c.var.clients.sql
                    .update(models.organizationPayment)
                    .set({ idInvoice: invoiceId, lastUpdatedAt: now.toISOString() })
                    .where(
                        inArray(
                            models.organizationPayment.id,
                            payments.map((p) => p.id),
                        ),
                    )

                generatedCount++
            } catch (error) {
                apiLog({
                    var: c.var,
                    type: "error",
                    internalMessage: `Failed to create legacy invoice for org ${idOrganization}`,
                    cause: error instanceof Error ? error.message : String(error),
                    stack: error instanceof Error ? error.stack : undefined,
                })
            }
        }

        // ── Phase 2: Charge recurring billing for current month ───────────────────
        // Uses updated values after pending changes have been applied in Phase 0.
        const currentRecurringPaymentsRaw = await c.var.clients.sql
            .select({
                idOrganization: models.organizationPayment.idOrganization,
                serviceType: models.organizationPayment.serviceType,
            })
            .from(models.organizationPayment)
            .where(
                and(
                    inArray(models.organizationPayment.idOrganization, orgIds),
                    eq(models.organizationPayment.status, "paid"),
                    eq(models.organizationPayment.sequenceType, "recurring"),
                    eq(models.organizationPayment.periodStart, currentPeriodStartISO),
                    isNotNull(models.organizationPayment.serviceType),
                ),
            )

        const currentRecurringServiceTypesByOrganizationId = currentRecurringPaymentsRaw.reduce<
            Map<string, Set<InvoiceLineType>>
        >((accumulator, payment) => {
            if (isInvoiceLineType(payment.serviceType) === false) {
                return accumulator
            }

            const serviceTypes = accumulator.get(payment.idOrganization) ?? new Set<InvoiceLineType>()
            serviceTypes.add(payment.serviceType)
            accumulator.set(payment.idOrganization, serviceTypes)
            return accumulator
        }, new Map())

        for (const idOrganization of orgIds) {
            const organization = orgMap.get(idOrganization)
            if (!organization) continue

            try {
                const currentRecurringServiceTypes =
                    currentRecurringServiceTypesByOrganizationId.get(idOrganization) ?? new Set<InvoiceLineType>()
                const recurringLinesToCharge = buildRecurringInvoiceLines(organization).filter(
                    (line) => currentRecurringServiceTypes.has(line.type) === false,
                )
                const recurringTotalAmountInCents = recurringLinesToCharge.reduce(
                    (sum, line) => sum + line.amountInCents,
                    0,
                )

                if (
                    recurringTotalAmountInCents > 0 &&
                    organization.walletBalanceInCents >= recurringTotalAmountInCents
                ) {
                    const nextWalletBalanceInCents = organization.walletBalanceInCents - recurringTotalAmountInCents

                    await updateOne({
                        database: c.var.clients.sql,
                        table: models.organization,
                        data: {
                            walletBalanceInCents: nextWalletBalanceInCents,
                            lastUpdatedAt: now.toISOString(),
                        },
                        where: (table) => eq(table.id, idOrganization),
                    })

                    organization.walletBalanceInCents = nextWalletBalanceInCents

                    // Create (or find) the draft invoice for this billing period
                    const idInvoice = await findOrCreateCurrentPeriodInvoice({
                        database: c.var.clients.sql,
                        idOrganization,
                        periodStart: currentPeriodStart,
                        periodEnd: currentPeriodEnd,
                        now,
                    })

                    for (const recurringLine of recurringLinesToCharge) {
                        await recordOrganizationPayment({
                            database: c.var.clients.sql,
                            idOrganization,
                            category: "subscription",
                            status: "paid",
                            amountInCents: recurringLine.amountInCents,
                            description: getServicePaymentDescription(recurringLine.type),
                            sequenceType: "recurring",
                            serviceType: recurringLine.type,
                            periodStart: currentPeriodStartISO,
                            periodEnd: currentPeriodEndISO,
                            idInvoice,
                            createdBy: null,
                        })
                    }
                }
            } catch (error) {
                apiLog({
                    var: c.var,
                    type: "error",
                    internalMessage: `Failed to generate invoice for org ${idOrganization}`,
                    cause: error instanceof Error ? error.message : String(error),
                    stack: error instanceof Error ? error.stack : undefined,
                })
            }
        }

        if (browser !== null) {
            await browser.close()
        }

        return response({
            context: c,
            statusCode: 200,
            schema: generateMonthlyInvoicesReturnSchema,
            data: { generatedCount },
        })
    })
