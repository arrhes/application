import { models, OCR_PAGE_PRICE_IN_CENTS } from "@arrhes/application-metadata"
import { and, eq, inArray, isNotNull } from "drizzle-orm"
import * as v from "valibot"
import { apiFactory } from "../../utilities/apiFactory.js"
import { apiLog } from "../../utilities/apiLog.js"
import { findOrCreateCurrentPeriodInvoice } from "../../utilities/billing/billingInvoice.js"
import { buildInvoiceUblXml } from "../../utilities/billing/invoiceUbl.js"
import {
    getResourceSubscriptionUnitPriceInCents,
    getStorageAddonQuantity,
    getStorageRecurringAmountInCents,
} from "../../utilities/billing/subscriptionPricing.js"
import { recordOrganizationPayment } from "../../utilities/billing/wallet.js"
import { Exception } from "../../utilities/exception.js"
import { response } from "../../utilities/response.js"
import { updateOne } from "../../utilities/sql/updateOne.js"
import { putObject } from "../../utilities/storage/putObject.js"

const generateMonthlyInvoicesReturnSchema = v.object({
    generatedCount: v.number(),
})

type InvoiceLineType = "support" | "storage_gb" | "agent_tokens_million" | "ocr_pages_hundred"
type ServicePaymentRecord = {
    id: string
    idOrganization: string
    serviceType: InvoiceLineType
    amountInCents: number
    quantity: number
    unitAmountInCents: number
    paidAt: string | null
    createdAt: string
}

function getCurrentMonthRange(date: Date) {
    const periodStart = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
    const periodEnd = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0, 23, 59, 59, 999))

    return {
        periodStart,
        periodEnd,
    }
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

function getInvoiceLineQuantity(type: InvoiceLineType, amountInCents: number) {
    if (type === "support") {
        return 1
    }

    if (type === "ocr_pages_hundred") {
        return Math.max(Math.round(amountInCents / OCR_PAGE_PRICE_IN_CENTS), 1)
    }

    const unitPrice = getResourceSubscriptionUnitPriceInCents(type)
    return Math.max(Math.round(amountInCents / unitPrice), 1)
}

function getResolvedPaymentQuantity(payment: ServicePaymentRecord) {
    if (payment.quantity > 0) {
        return payment.quantity
    }

    return getInvoiceLineQuantity(payment.serviceType, payment.amountInCents)
}

function getResolvedPaymentUnitAmountInCents(payment: ServicePaymentRecord) {
    if (payment.unitAmountInCents > 0) {
        return payment.unitAmountInCents
    }

    const quantity = getResolvedPaymentQuantity(payment)
    return quantity > 0 ? Math.round(payment.amountInCents / quantity) : payment.amountInCents
}

function buildRecurringInvoiceLines(organization: typeof models.organization.$inferSelect) {
    const lines: Array<{
        type: "support" | "storage_gb"
        quantity: number
        amountInCents: number
    }> = []

    if (organization.licenceAmount > 0) {
        lines.push({
            type: "support",
            quantity: 1,
            amountInCents: organization.licenceAmount,
        })
    }

    const storageAddonQuantity = getStorageAddonQuantity(organization.storageLimit)
    const storageAmountInCents = getStorageRecurringAmountInCents(organization.storageLimit)

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
            throw new Exception({
                statusCode: 401,
                internalMessage: "Unauthorized",
            })
        }

        const now = new Date()
        const { periodStart: currentPeriodStart, periodEnd: currentPeriodEnd } = getCurrentMonthRange(now)
        const currentPeriodStartISO = currentPeriodStart.toISOString()
        const currentPeriodEndISO = currentPeriodEnd.toISOString()

        const organizations = await c.var.clients.sql.select().from(models.organization)
        const orgIds = organizations.map((organization) => organization.id)

        if (orgIds.length === 0) {
            return response({
                context: c,
                statusCode: 200,
                schema: generateMonthlyInvoicesReturnSchema,
                data: {
                    generatedCount: 0,
                },
            })
        }

        const orgMap = new Map(
            organizations.map((organization) => [
                organization.id,
                organization,
            ]),
        )

        // ── Phase 0: Apply pending subscription changes ──────────────────────────
        // Changes set by users during the previous month are applied now before billing.
        const orgsWithPendingChanges = organizations.filter(
            (org) => org.licenceAmountPending !== null || org.storageLimitPending !== null,
        )

        for (const org of orgsWithPendingChanges) {
            try {
                await updateOne({
                    database: c.var.clients.sql,
                    table: models.organization,
                    data: {
                        ...(org.licenceAmountPending !== null
                            ? {
                                  licenceAmount: org.licenceAmountPending,
                                  licenceAmountPending: null,
                              }
                            : {}),
                        ...(org.storageLimitPending !== null
                            ? {
                                  storageLimit: org.storageLimitPending,
                                  storageLimitPending: null,
                              }
                            : {}),
                        lastUpdatedAt: now.toISOString(),
                    },
                    where: (table) => eq(table.id, org.id),
                })

                const orgInMap = orgMap.get(org.id)
                if (orgInMap) {
                    if (org.licenceAmountPending !== null) {
                        orgInMap.licenceAmount = org.licenceAmountPending
                        orgInMap.licenceAmountPending = null
                    }
                    if (org.storageLimitPending !== null) {
                        orgInMap.storageLimit = org.storageLimitPending
                        orgInMap.storageLimitPending = null
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

        // ── Phase 1: Generate XML invoices for all pending draft invoices ─────────
        // Invoices are created when payments are recorded, then rendered here.
        // Processes drafts from any period so that historical seed data or catch-up invoices
        // are also rendered - not only the immediately-previous month.
        const draftInvoicesLastMonth = await c.var.clients.sql
            .select({
                id: models.invoice.id,
                idOrganization: models.invoice.idOrganization,
                reference: models.invoice.reference,
                startingAt: models.invoice.startingAt,
                endingAt: models.invoice.endingAt,
            })
            .from(models.invoice)
            .where(and(inArray(models.invoice.idOrganization, orgIds), eq(models.invoice.status, "draft")))

        let generatedCount = 0

        // Generate XML invoices for all pending draft invoices
        for (const draftInvoice of draftInvoicesLastMonth) {
            const organization = orgMap.get(draftInvoice.idOrganization)
            if (!organization) continue

            // Derive period prefix from the invoice's own startingAt (not the global previous-month)
            const invPeriodDate = new Date(draftInvoice.startingAt)
            const invPrefix = `${String(invPeriodDate.getUTCFullYear())}-${String(invPeriodDate.getUTCMonth() + 1).padStart(2, "0")}`

            try {
                const invoicePaymentsRaw = await c.var.clients.sql
                    .select({
                        id: models.organizationPayment.id,
                        idOrganization: models.organizationPayment.idOrganization,
                        serviceType: models.organizationPayment.serviceType,
                        amountInCents: models.organizationPayment.amountHTInCents,
                        quantity: models.organizationPayment.quantity,
                        unitAmountInCents: models.organizationPayment.unitAmountHTInCents,
                        paidAt: models.organizationPayment.paidAt,
                        createdAt: models.organizationPayment.createdAt,
                    })
                    .from(models.organizationPayment)
                    .where(eq(models.organizationPayment.idInvoice, draftInvoice.id))

                const servicePayments = invoicePaymentsRaw.filter((p) =>
                    isInvoiceLineType(p.serviceType),
                ) as ServicePaymentRecord[]

                if (servicePayments.length === 0) continue

                const totalAmountInCents = servicePayments.reduce((sum, payment) => sum + payment.amountInCents, 0)

                const xmlStorageKey = `organizations/${draftInvoice.idOrganization}/invoices/${invPrefix}.xml`
                const internalXmlStorageKey = `invoices/${draftInvoice.idOrganization}/${invPrefix}.xml`
                const xmlContent = buildInvoiceUblXml({
                    invoiceNumber: draftInvoice.reference,
                    issueDateIso: now.toISOString(),
                    dueDateIso: now.toISOString(),
                    periodStartIso: draftInvoice.startingAt,
                    periodEndIso: draftInvoice.endingAt,
                    amountInCents: totalAmountInCents,
                    currency: "EUR",
                    supplierName: "Barbote SAS",
                    supplierSiren: "908719503",
                    supplierVatId: "FR02908719503",
                    supplierAddress: "93 rue Sedaine, 75011 Paris, FR",
                    customerName: organization.name,
                    customerSiren: organization.siren,
                    customerEmail: organization.email,
                    lines: servicePayments.map((payment) => ({
                        serviceType: payment.serviceType,
                        description: getServicePaymentDescription(payment.serviceType),
                        amountInCents: payment.amountInCents,
                        quantity: getResolvedPaymentQuantity(payment),
                        unitAmountInCents: getResolvedPaymentUnitAmountInCents(payment),
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
                        idOrganization: draftInvoice.idOrganization,
                        invoiceNumber: draftInvoice.reference,
                        period: invPrefix,
                    },
                })

                // Mirror invoice XML under /invoices for internal tooling compatibility.
                await putObject({
                    var: c.var,
                    body: xmlBuffer,
                    storageKey: internalXmlStorageKey,
                    contentType: "application/xml",
                    contentLength: xmlBuffer.length,
                    metadata: {
                        idOrganization: draftInvoice.idOrganization,
                        invoiceNumber: draftInvoice.reference,
                        period: invPrefix,
                    },
                })

                await updateOne({
                    database: c.var.clients.sql,
                    table: models.invoice,
                    data: {
                        amountInCents: totalAmountInCents,
                        xmlStorageKey,
                        status: "generated",
                        lastUpdatedAt: now.toISOString(),
                    },
                    where: (table) => eq(table.id, draftInvoice.id),
                })

                generatedCount++
            } catch (error) {
                apiLog({
                    var: c.var,
                    type: "error",
                    internalMessage: `Failed to generate invoice XML for org ${draftInvoice.idOrganization}`,
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
                        const unitAmountInCents =
                            recurringLine.quantity > 0
                                ? Math.round(recurringLine.amountInCents / recurringLine.quantity)
                                : recurringLine.amountInCents

                        await recordOrganizationPayment({
                            database: c.var.clients.sql,
                            idOrganization,
                            category: "subscription",
                            status: "paid",
                            amountHTInCents: recurringLine.amountInCents,
                            quantity: recurringLine.quantity,
                            unitAmountHTInCents: unitAmountInCents,
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

        return response({
            context: c,
            statusCode: 200,
            schema: generateMonthlyInvoicesReturnSchema,
            data: {
                generatedCount,
            },
        })
    })
