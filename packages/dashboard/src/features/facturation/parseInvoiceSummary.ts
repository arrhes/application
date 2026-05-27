export type ParsedInvoiceLine = {
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

export function parseInvoiceSummary(xml: string) {
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
