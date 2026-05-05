import { readAllOrganizationPaymentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { getTaxAmountFromHTInCents, OCR_PAGE_PRICE_IN_CENTS } from "@arrhes/application-metadata/utilities"
import { FormatDateTime, FormatPrice } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"

function getPaymentServiceLabel(serviceType: string | null) {
    if (serviceType === "support") return "Licence"
    if (serviceType === "storage_gb") return "Stockage"
    if (serviceType === "agent_tokens_million") return "Tokens"
    if (serviceType === "ocr_pages_hundred") return "OCR"
    return "-"
}

function getResolvedPaymentAmounts(payment: {
    serviceType: string | null
    quantity: number
    unitAmountHTInCents: number
    amountHTInCents: number
    amountTVAInCents: number
}) {
    const quantity =
        payment.quantity > 0
            ? payment.quantity
            : payment.serviceType === "ocr_pages_hundred"
              ? Math.max(Math.round(payment.amountHTInCents / OCR_PAGE_PRICE_IN_CENTS), 1)
              : 1
    const unitAmountInCents =
        payment.unitAmountHTInCents > 0
            ? payment.unitAmountHTInCents
            : quantity > 0
              ? Math.round(payment.amountHTInCents / quantity)
              : payment.amountHTInCents

    const hasLegacyZeroTaxFields = payment.amountHTInCents > 0 && payment.amountTVAInCents === 0

    if (hasLegacyZeroTaxFields) {
        return {
            quantity,
            unitAmountInCents,
            amountHTInCents: payment.amountHTInCents,
            amountTVAInCents: getTaxAmountFromHTInCents(payment.amountHTInCents),
        }
    }

    return {
        quantity,
        unitAmountInCents,
        amountHTInCents: payment.amountHTInCents,
        amountTVAInCents: payment.amountTVAInCents,
    }
}

export function InvoicePaymentsTable(props: { idInvoice: string }) {
    return (
        <div
            className={css({
                border: "1px solid",
                borderColor: "neutral/15",
                borderRadius: "md",
                backgroundColor: "white",
                overflowX: "auto",
            })}
        >
            <DataWrapper routeDefinition={readAllOrganizationPaymentsRouteDefinition} body={{}}>
                {(payments) => {
                    const invoicePayments = payments.filter((payment) => payment.idInvoice === props.idInvoice)

                    const totals = invoicePayments.reduce(
                        (accumulator, payment) => {
                            const resolvedAmounts = getResolvedPaymentAmounts(payment)
                            accumulator.amountHTInCents += resolvedAmounts.amountHTInCents
                            accumulator.amountTVAInCents += resolvedAmounts.amountTVAInCents
                            return accumulator
                        },
                        {
                            amountHTInCents: 0,
                            amountTVAInCents: 0,
                        },
                    )

                    if (invoicePayments.length === 0) {
                        return (
                            <div
                                className={css({
                                    padding: "0.9rem",
                                    fontSize: "sm",
                                    color: "neutral/60",
                                })}
                            >
                                Aucun paiement n'est encore rattaché à cette facture.
                            </div>
                        )
                    }

                    return (
                        <table className={css({ width: "100%", borderCollapse: "collapse" })}>
                            <thead>
                                <tr className={css({ borderBottom: "1px solid token(colors.neutral/15)" })}>
                                    <th
                                        className={css({
                                            minWidth: "12rem",
                                            textAlign: "left",
                                            padding: "0.6rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                        })}
                                    >
                                        Date
                                    </th>
                                    <th
                                        className={css({
                                            minWidth: "8rem",
                                            textAlign: "left",
                                            padding: "0.6rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                        })}
                                    >
                                        Service
                                    </th>
                                    <th
                                        className={css({
                                            minWidth: "18rem",
                                            textAlign: "left",
                                            padding: "0.6rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                        })}
                                    >
                                        Description
                                    </th>
                                    <th
                                        className={css({
                                            minWidth: "7rem",
                                            textAlign: "right",
                                            padding: "0.6rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                        })}
                                    >
                                        Quantité
                                    </th>
                                    <th
                                        className={css({
                                            minWidth: "10rem",
                                            textAlign: "right",
                                            padding: "0.6rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                        })}
                                    >
                                        Montant unitaire
                                    </th>
                                    <th
                                        className={css({
                                            minWidth: "9rem",
                                            textAlign: "right",
                                            padding: "0.6rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                        })}
                                    >
                                        Montant HT
                                    </th>
                                    <th
                                        className={css({
                                            minWidth: "7rem",
                                            textAlign: "right",
                                            padding: "0.6rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                        })}
                                    >
                                        TVA
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoicePayments.map((payment) => {
                                    const resolvedAmounts = getResolvedPaymentAmounts(payment)

                                    return (
                                        <tr
                                            key={payment.id}
                                            className={css({ borderBottom: "1px solid token(colors.neutral/10)" })}
                                        >
                                            <td
                                                className={css({
                                                    padding: "0.6rem",
                                                    fontSize: "sm",
                                                    color: "neutral/70",
                                                })}
                                            >
                                                <FormatDateTime date={payment.createdAt} />
                                            </td>
                                            <td className={css({ padding: "0.6rem", fontSize: "sm" })}>
                                                {getPaymentServiceLabel(payment.serviceType)}
                                            </td>
                                            <td
                                                className={css({
                                                    padding: "0.6rem",
                                                    fontSize: "sm",
                                                    color: "neutral/70",
                                                })}
                                            >
                                                {payment.description ?? "-"}
                                            </td>
                                            <td
                                                className={css({
                                                    padding: "0.6rem",
                                                    fontSize: "sm",
                                                    textAlign: "right",
                                                })}
                                            >
                                                {resolvedAmounts.quantity}
                                            </td>
                                            <td
                                                className={css({
                                                    padding: "0.6rem",
                                                    fontSize: "sm",
                                                    textAlign: "right",
                                                })}
                                            >
                                                <FormatPrice price={resolvedAmounts.unitAmountInCents / 100} />
                                            </td>
                                            <td
                                                className={css({
                                                    padding: "0.6rem",
                                                    fontSize: "sm",
                                                    textAlign: "right",
                                                })}
                                            >
                                                <FormatPrice price={resolvedAmounts.amountHTInCents / 100} />
                                            </td>
                                            <td
                                                className={css({
                                                    padding: "0.6rem",
                                                    fontSize: "sm",
                                                    textAlign: "right",
                                                })}
                                            >
                                                <FormatPrice price={resolvedAmounts.amountTVAInCents / 100} />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr className={css({ borderTop: "2px solid token(colors.neutral/10)" })}>
                                    <td className={css({ padding: "0.6rem", fontSize: "sm", fontWeight: "600" })}>
                                        Total
                                    </td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                    <td
                                        className={css({
                                            padding: "0.6rem",
                                            fontSize: "sm",
                                            textAlign: "right",
                                            fontWeight: "600",
                                        })}
                                    >
                                        <FormatPrice price={totals.amountHTInCents / 100} />
                                    </td>
                                    <td
                                        className={css({
                                            padding: "0.6rem",
                                            fontSize: "sm",
                                            textAlign: "right",
                                            fontWeight: "600",
                                        })}
                                    >
                                        <FormatPrice price={totals.amountTVAInCents / 100} />
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    )
                }}
            </DataWrapper>
        </div>
    )
}
