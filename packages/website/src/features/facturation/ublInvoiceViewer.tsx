import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFileTypePdf } from "@tabler/icons-react"
import { useMemo } from "react"
import { ValidEN16931XML } from "./ValidEN16931XML.tsx"
import { XMLHeader } from "./XMLHeader.tsx"
import { XMLTable } from "./XMLTable.tsx"

type ParsedInvoiceLine = {
    id: string
    name: string
    quantity: string
    amountHT: string
    amountTVA: string
    amountTTC: string
}


function findFirstTextWithin(element: Element, localName: string) {
    const node = Array.from(element.getElementsByTagName("*")).find((child) => child.localName === localName)
    return node?.textContent?.trim() ?? ""
}

function parseInvoiceSummary(xml: string) {
    const parser = new DOMParser()
    const document = parser.parseFromString(xml, "application/xml")
    const hasParserError = document.getElementsByTagName("parsererror").length > 0

    if (hasParserError) {
        return {
            isValid: false,
            invoiceNumber: "",
            issueDate: "",
            dueDate: "",
            currency: "",
            amountHT: "",
            amountTVA: "",
            amountTTC: "",
            supplierName: "",
            customerName: "",
            lines: [] as ParsedInvoiceLine[],
        }
    }

    const invoiceLines = Array.from(document.getElementsByTagName("*")).filter(
        (node) => node.localName === "InvoiceLine",
    )

    return {
        isValid: true,
        invoiceNumber: findFirstTextWithin(document.documentElement, "ID"),
        issueDate: findFirstTextWithin(document.documentElement, "IssueDate"),
        dueDate: findFirstTextWithin(document.documentElement, "DueDate"),
        currency: findFirstTextWithin(document.documentElement, "DocumentCurrencyCode"),
        amountHT: findFirstTextWithin(document.documentElement, "TaxExclusiveAmount"),
        amountTVA: findFirstTextWithin(document.documentElement, "TaxAmount"),
        amountTTC: findFirstTextWithin(document.documentElement, "PayableAmount"),
        supplierName:
            findFirstTextWithin(
                Array.from(document.getElementsByTagName("*")).find(
                    (node) => node.localName === "AccountingSupplierParty",
                ) ?? document.documentElement,
                "Name",
            ) || "-",
        customerName:
            findFirstTextWithin(
                Array.from(document.getElementsByTagName("*")).find(
                    (node) => node.localName === "AccountingCustomerParty",
                ) ?? document.documentElement,
                "Name",
            ) || "-",
        lines: invoiceLines.map((line) => ({
            id: findFirstTextWithin(line, "ID"),
            name: findFirstTextWithin(line, "Name"),
            quantity: findFirstTextWithin(line, "InvoicedQuantity"),
            amountHT: findFirstTextWithin(line, "LineExtensionAmount"),
            amountTVA: findFirstTextWithin(line, "TaxAmount"),
            amountTTC: findFirstTextWithin(line, "Amount"),
        })),
    }
}



export function UblInvoiceViewer(props: {
    xmlContent: string
    downloadFileName?: string
    title?: string
    onDownloadPdf?: () => void | Promise<void>
    isDownloadingPdf?: boolean
}) {
    const parsed = useMemo(() => parseInvoiceSummary(props.xmlContent), [props.xmlContent])

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                })}
            >
                <h2 className={css({ fontSize: "md", fontWeight: "semibold", color: "neutral" })}>
                    {props.title ?? "Facture"}
                </h2>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}>
                    {props.onDownloadPdf && (
                        <Button onClick={props.onDownloadPdf} isDisabled={props.isDownloadingPdf}>
                            <ButtonOutlineContent
                                leftIcon={<IconFileTypePdf />}
                                text={props.isDownloadingPdf ? "PDF..." : "Télécharger PDF"}
                            />
                        </Button>
                    )}
                </div>
            </div>

            {parsed.isValid ? (
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    <ValidEN16931XML xmlContent={props.xmlContent} />
                    <XMLHeader xmlContent={props.xmlContent} />
                    <XMLTable xmlContent={props.xmlContent} />
                </div>
            ) : (
                <div
                    className={css({
                        border: "1px solid",
                        borderColor: "danger/30",
                        borderRadius: "md",
                        backgroundColor: "danger/5",
                        color: "danger",
                        padding: "0.75rem",
                        fontSize: "sm",
                    })}
                >
                    Impossible d'interpréter ce XML comme une facture UBL.
                </div>
            )}
        </div>
    )
}
