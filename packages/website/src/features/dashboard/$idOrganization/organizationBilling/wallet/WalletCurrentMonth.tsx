import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    readAllInvoicesRouteDefinition,
    readAllOrganizationPaymentsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/DataWrapper.tsx"
import { formatEuros } from "../../../../../utilities/formatEuros.tsx"

function getPaymentLineType(payment: {
    category: string
    serviceType: string | null
    sequenceType: string | null
}): "subscription" | "storage_gb" | "agent_tokens_million" | "ocr_pages_hundred" | null {
    if (
        payment.category === "top_up" ||
        payment.category === "withdrawal" ||
        payment.category === "setup" ||
        payment.sequenceType === "setup"
    ) {
        return null
    }

    if (payment.serviceType === "storage_gb") {
        return "storage_gb"
    }

    if (payment.serviceType === "agent_tokens_million") {
        return "agent_tokens_million"
    }

    if (payment.serviceType === "ocr_pages_hundred") {
        return "ocr_pages_hundred"
    }

    return "subscription"
}

export function WalletCurrentMonth(props: { organization: v.InferOutput<typeof returnedSchemas.organization> }) {
    return (
        <DataWrapper
            routeDefinition={readAllInvoicesRouteDefinition}
            body={{}}
        >
            {(invoices) => (
                <DataWrapper
                    routeDefinition={readAllOrganizationPaymentsRouteDefinition}
                    body={{}}
                >
                    {(payments) => {
                        const now = new Date()
                        const currentPeriodStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
                        const currentInvoice = invoices.find((inv) => {
                            const invStart = new Date(inv.startingAt)
                            return (
                                invStart.getUTCFullYear() === currentPeriodStart.getUTCFullYear() &&
                                invStart.getUTCMonth() === currentPeriodStart.getUTCMonth()
                            )
                        })

                        const currentMonthPayments = currentInvoice
                            ? payments.filter(
                                  (payment) =>
                                      payment.idInvoice === currentInvoice.id &&
                                      payment.status !== "failed" &&
                                      payment.status !== "refunded",
                              )
                            : []

                        const lineItems = [
                            {
                                type: "subscription",
                                label: "Abonnement",
                                unit: null,
                            },
                            {
                                type: "storage_gb",
                                label: "Stockage",
                                unit: "1 Go / mois",
                            },
                            {
                                type: "agent_tokens_million",
                                label: "Tokens Assistant IA",
                                unit: "1 million de tokens",
                            },
                            {
                                type: "ocr_pages_hundred",
                                label: "Traitement de pages par OCR",
                                unit: "1 page",
                            },
                        ] as const

                        const totalsByType = currentMonthPayments.reduce<
                            Record<
                                string,
                                {
                                    amountHT: number
                                    amountTVA: number
                                    quantity: number
                                }
                            >
                        >((acc, payment) => {
                            const lineType = getPaymentLineType(payment)

                            if (lineType === null) return acc
                            if (!acc[lineType]) {
                                acc[lineType] = {
                                    amountHT: 0,
                                    amountTVA: 0,
                                    quantity: 0,
                                }
                            }

                            acc[lineType].amountHT += payment.amountHTInCents
                            acc[lineType].amountTVA += payment.amountTVAInCents
                            acc[lineType].quantity += 1

                            return acc
                        }, {})

                        // The first 1 Go of storage is always included free
                        // in the subscription — add it to the display so the
                        // quantity reflects the actual allocated storage.
                        if (props.organization.licenceAmount > 0) {
                            if (!totalsByType.storage_gb)
                                totalsByType.storage_gb = {
                                    amountHT: 0,
                                    amountTVA: 0,
                                    quantity: 0,
                                }
                            totalsByType.storage_gb.quantity += 1
                        }

                        const totalHTAmount = currentMonthPayments.reduce(
                            (sum, payment) =>
                                getPaymentLineType(payment) === null ? sum : sum + payment.amountHTInCents,
                            0,
                        )

                        const totalTVAAmount = currentMonthPayments.reduce(
                            (sum, payment) =>
                                getPaymentLineType(payment) === null ? sum : sum + payment.amountTVAInCents,
                            0,
                        )
                        const totalTTCAmount = totalHTAmount + totalTVAAmount

                        return (
                            <div
                                className={css({
                                    width: "100%",
                                    padding: "0.5rem 1rem 0.75rem",
                                })}
                            >
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                    })}
                                >
                                    <div
                                        className={css({
                                            display: "grid",
                                            gridTemplateColumns:
                                                "minmax(0, 2fr) minmax(0, 1.3fr) minmax(72px, 0.7fr) minmax(88px, 1fr) minmax(88px, 1fr) minmax(96px, 1fr)",
                                            gap: "0.75rem",
                                            padding: "0 0 0.5rem",
                                            borderBottom: "1px solid token(colors.neutral/10)",
                                            marginBottom: "0.125rem",
                                        })}
                                    >
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                fontWeight: "600",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                                color: "neutral/50",
                                            })}
                                        >
                                            Service
                                        </span>
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                fontWeight: "600",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                                color: "neutral/50",
                                            })}
                                        >
                                            Unité
                                        </span>
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                fontWeight: "600",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                                color: "neutral/50",
                                                textAlign: "right",
                                            })}
                                        >
                                            Quantité
                                        </span>
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                fontWeight: "600",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                                color: "neutral/50",
                                                textAlign: "right",
                                            })}
                                        >
                                            Montant HT
                                        </span>
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                fontWeight: "600",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                                color: "neutral/50",
                                                textAlign: "right",
                                            })}
                                        >
                                            TVA
                                        </span>
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                fontWeight: "600",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.04em",
                                                color: "neutral/50",
                                                textAlign: "right",
                                            })}
                                        >
                                            Montant TTC
                                        </span>
                                    </div>
                                    {lineItems.map((line, index) => {
                                        const data = totalsByType[line.type] ?? {
                                            amountHT: 0,
                                            amountTVA: 0,
                                            quantity: 0,
                                        }
                                        const amountTTC = data.amountHT + data.amountTVA

                                        return (
                                            <div
                                                key={line.type}
                                                className={css({
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "minmax(0, 2fr) minmax(0, 1.3fr) minmax(72px, 0.7fr) minmax(88px, 1fr) minmax(88px, 1fr) minmax(96px, 1fr)",
                                                    gap: "0.75rem",
                                                    alignItems: "center",
                                                    padding: "0.625rem 0",
                                                    borderBottom:
                                                        index < lineItems.length - 1
                                                            ? "1px solid token(colors.neutral/10)"
                                                            : "none",
                                                })}
                                            >
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        fontWeight: "500",
                                                        color: "neutral",
                                                    })}
                                                >
                                                    {line.label}
                                                </span>
                                                <span
                                                    className={css({
                                                        fontSize: "xs",
                                                        color: "neutral/60",
                                                    })}
                                                >
                                                    {line.unit ?? "-"}
                                                </span>
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        color: data.quantity === 0 ? "neutral/40" : "neutral/70",
                                                        textAlign: "right",
                                                        fontVariantNumeric: "tabular-nums",
                                                    })}
                                                >
                                                    {data.quantity === 0 ? "-" : data.quantity}
                                                </span>
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        color: data.amountHT === 0 ? "neutral/40" : "neutral",
                                                        fontVariantNumeric: "tabular-nums",
                                                        textAlign: "right",
                                                    })}
                                                >
                                                    {formatEuros(data.amountHT)}
                                                </span>
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        color: data.amountTVA === 0 ? "neutral/40" : "neutral",
                                                        fontVariantNumeric: "tabular-nums",
                                                        textAlign: "right",
                                                    })}
                                                >
                                                    {formatEuros(data.amountTVA)}
                                                </span>
                                                <span
                                                    className={css({
                                                        fontSize: "sm",
                                                        color: amountTTC === 0 ? "neutral/40" : "neutral",
                                                        fontVariantNumeric: "tabular-nums",
                                                        textAlign: "right",
                                                    })}
                                                >
                                                    {formatEuros(amountTTC)}
                                                </span>
                                            </div>
                                        )
                                    })}
                                    <div
                                        className={css({
                                            display: "grid",
                                            gridTemplateColumns:
                                                "minmax(0, 2fr) minmax(0, 1.3fr) minmax(72px, 0.7fr) minmax(88px, 1fr) minmax(88px, 1fr) minmax(96px, 1fr)",
                                            gap: "0.75rem",
                                            alignItems: "center",
                                            padding: "0.75rem 0 0.125rem",
                                            borderTop: "2px solid token(colors.neutral/20)",
                                            marginTop: "0.25rem",
                                        })}
                                    >
                                        <span
                                            className={css({
                                                fontWeight: "600",
                                                fontSize: "sm",
                                            })}
                                        >
                                            Total
                                        </span>
                                        <span />
                                        <span />
                                        <span
                                            className={css({
                                                fontWeight: "600",
                                                fontSize: "sm",
                                                fontVariantNumeric: "tabular-nums",
                                                textAlign: "right",
                                            })}
                                        >
                                            {formatEuros(totalHTAmount)}
                                        </span>
                                        <span
                                            className={css({
                                                fontWeight: "600",
                                                fontSize: "sm",
                                                fontVariantNumeric: "tabular-nums",
                                                textAlign: "right",
                                            })}
                                        >
                                            {formatEuros(totalTVAAmount)}
                                        </span>
                                        <span
                                            className={css({
                                                fontWeight: "600",
                                                fontSize: "sm",
                                                fontVariantNumeric: "tabular-nums",
                                                textAlign: "right",
                                            })}
                                        >
                                            {formatEuros(totalTTCAmount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </DataWrapper>
            )}
        </DataWrapper>
    )
}
