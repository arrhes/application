import { css } from "@arrhes/ui/utilities/cn.js"
import { useMemo } from "react"
import { parseInvoiceSummary } from "./parseInvoiceSummary.ts"

export function XMLHeader(props: { xmlContent: string }) {
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
                padding: "1rem",
                display: "grid",
                gridTemplateColumns: {
                    base: "1fr",
                    md: "1fr 1fr",
                },
                gap: "0.75rem",
                fontSize: "sm",
                color: "neutral",
            })}
        >
            <p>Facture: {parsed.invoiceNumber || "-"}</p>
            <p>Date émission: {parsed.issueDate || "-"}</p>
            <p>Date échéance: {parsed.dueDate || "-"}</p>
            <p>Devise: {parsed.currency || "-"}</p>
            <p>Fournisseur: {parsed.supplierName || "-"}</p>
            <p>Client: {parsed.customerName || "-"}</p>
        </div>
    )
}
