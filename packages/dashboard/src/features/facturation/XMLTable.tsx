import { css } from "@arrhes/ui/utilities/cn.js"
import { useMemo } from "react"
import { parseInvoiceSummary } from "./parseInvoiceSummary.ts"

export function XMLTable(props: { xmlContent: string }) {
    const parsed = useMemo(
        () => parseInvoiceSummary(props.xmlContent),
        [
            props.xmlContent,
        ],
    )
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
            <table
                className={css({
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "sm",
                })}
            >
                <thead>
                    <tr
                        className={css({
                            borderBottom: "1px solid token(colors.neutral/15)",
                        })}
                    >
                        <th
                            className={css({
                                textAlign: "left",
                                padding: "0.6rem",
                            })}
                        >
                            #
                        </th>
                        <th
                            className={css({
                                textAlign: "left",
                                padding: "0.6rem",
                            })}
                        >
                            Service
                        </th>
                        <th
                            className={css({
                                textAlign: "right",
                                padding: "0.6rem",
                            })}
                        >
                            Quantité
                        </th>
                        <th
                            className={css({
                                textAlign: "right",
                                padding: "0.6rem",
                            })}
                        >
                            Montant HT
                        </th>
                        <th
                            className={css({
                                textAlign: "right",
                                padding: "0.6rem",
                            })}
                        >
                            TVA
                        </th>
                        <th
                            className={css({
                                textAlign: "right",
                                padding: "0.6rem",
                            })}
                        >
                            Montant TTC
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {parsed.lines.map((line) => (
                        <tr key={`${line.id}-${line.name}`}>
                            <td
                                className={css({
                                    padding: "0.6rem",
                                })}
                            >
                                {line.id || "-"}
                            </td>
                            <td
                                className={css({
                                    padding: "0.6rem",
                                })}
                            >
                                {line.name || "-"}
                            </td>
                            <td
                                className={css({
                                    textAlign: "right",
                                    padding: "0.6rem",
                                })}
                            >
                                {line.quantity || "-"}
                            </td>
                            <td
                                className={css({
                                    textAlign: "right",
                                    padding: "0.6rem",
                                })}
                            >
                                {line.amountHT || "-"}
                            </td>
                            <td
                                className={css({
                                    textAlign: "right",
                                    padding: "0.6rem",
                                })}
                            >
                                {line.amountTVA || "-"}
                            </td>
                            <td
                                className={css({
                                    textAlign: "right",
                                    padding: "0.6rem",
                                })}
                            >
                                {line.amountTTC || "-"}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr
                        className={css({
                            borderTop: "2px solid token(colors.neutral/10)",
                        })}
                    >
                        <td
                            className={css({
                                padding: "0.6rem",
                                fontWeight: "600",
                            })}
                        >
                            Total
                        </td>
                        <td />
                        <td />
                        <td
                            className={css({
                                textAlign: "right",
                                padding: "0.6rem",
                                fontWeight: "600",
                            })}
                        >
                            {parsed.amountHT || "-"}
                        </td>
                        <td
                            className={css({
                                textAlign: "right",
                                padding: "0.6rem",
                                fontWeight: "600",
                            })}
                        >
                            {parsed.amountTVA || "-"}
                        </td>
                        <td
                            className={css({
                                textAlign: "right",
                                padding: "0.6rem",
                                fontWeight: "700",
                            })}
                        >
                            {parsed.amountTTC || "-"}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
