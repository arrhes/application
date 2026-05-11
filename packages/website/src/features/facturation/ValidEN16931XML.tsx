import { css } from "@arrhes/ui/utilities/cn.js"
import { useMemo } from "react"

type En16931Validation = {
    isValid: boolean
    issues: string[]
}

function findFirstTextWithin(element: Element, localName: string) {
    const node = Array.from(element.getElementsByTagName("*")).find((child) => child.localName === localName)
    return node?.textContent?.trim() ?? ""
}

function parseDecimal(value: string) {
    const normalized = value.replaceAll(",", ".")
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : Number.NaN
}

function isDateString(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function validateEn16931(xml: string): En16931Validation {
    const parser = new DOMParser()
    const document = parser.parseFromString(xml, "application/xml")
    const issues: string[] = []

    if (document.getElementsByTagName("parsererror").length > 0) {
        return {
            isValid: false,
            issues: [
                "XML invalide (erreur de parsing).",
            ],
        }
    }

    const root = document.documentElement
    if (root.localName !== "Invoice") {
        issues.push("La racine doit etre Invoice (UBL).")
    }

    const customizationId = findFirstTextWithin(root, "CustomizationID")
    if (customizationId !== "urn:cen.eu:en16931:2017") {
        issues.push("CustomizationID EN16931 attendu: urn:cen.eu:en16931:2017")
    }

    const profileId = findFirstTextWithin(root, "ProfileID")
    if (!profileId) {
        issues.push("ProfileID manquant.")
    }

    const invoiceTypeCode = findFirstTextWithin(root, "InvoiceTypeCode")
    if (invoiceTypeCode !== "380") {
        issues.push("InvoiceTypeCode doit etre 380 (invoice).")
    }

    const issueDate = findFirstTextWithin(root, "IssueDate")
    const dueDate = findFirstTextWithin(root, "DueDate")
    if (!isDateString(issueDate)) {
        issues.push("IssueDate doit etre au format YYYY-MM-DD.")
    }
    if (!isDateString(dueDate)) {
        issues.push("DueDate doit etre au format YYYY-MM-DD.")
    }

    const currency = findFirstTextWithin(root, "DocumentCurrencyCode")
    if (!/^[A-Z]{3}$/.test(currency)) {
        issues.push("DocumentCurrencyCode doit etre un code ISO alpha-3 (ex: EUR).")
    }

    const supplierName =
        findFirstTextWithin(
            Array.from(document.getElementsByTagName("*")).find(
                (node) => node.localName === "AccountingSupplierParty",
            ) ?? root,
            "Name",
        ) || ""
    if (!supplierName) {
        issues.push("Nom fournisseur manquant (AccountingSupplierParty/Name).")
    }

    const customerName =
        findFirstTextWithin(
            Array.from(document.getElementsByTagName("*")).find(
                (node) => node.localName === "AccountingCustomerParty",
            ) ?? root,
            "Name",
        ) || ""
    if (!customerName) {
        issues.push("Nom client manquant (AccountingCustomerParty/Name).")
    }

    const invoiceLines = Array.from(document.getElementsByTagName("*")).filter(
        (node) => node.localName === "InvoiceLine",
    )
    if (invoiceLines.length === 0) {
        issues.push("Au moins une ligne de facture est requise (InvoiceLine).")
    }

    let lineSum = 0
    for (const [index, line] of invoiceLines.entries()) {
        const lineId = findFirstTextWithin(line, "ID")
        const quantity = parseDecimal(findFirstTextWithin(line, "InvoicedQuantity"))
        const amount = parseDecimal(findFirstTextWithin(line, "LineExtensionAmount"))
        const name = findFirstTextWithin(line, "Name")

        if (!lineId) {
            issues.push(`InvoiceLine #${index + 1}: ID manquant.`)
        }
        if (!Number.isFinite(quantity) || quantity <= 0) {
            issues.push(`InvoiceLine #${index + 1}: InvoicedQuantity invalide.`)
        }
        if (!Number.isFinite(amount)) {
            issues.push(`InvoiceLine #${index + 1}: LineExtensionAmount invalide.`)
        } else {
            lineSum += amount
        }
        if (!name) {
            issues.push(`InvoiceLine #${index + 1}: Item/Name manquant.`)
        }
    }

    const legalMonetaryTotal = Array.from(document.getElementsByTagName("*")).find(
        (node) => node.localName === "LegalMonetaryTotal",
    )
    if (!legalMonetaryTotal) {
        issues.push("LegalMonetaryTotal manquant.")
    }

    const taxTotal = Array.from(document.getElementsByTagName("*")).find((node) => node.localName === "TaxTotal")
    if (!taxTotal) {
        issues.push("TaxTotal manquant.")
    }

    const lineExtensionAmount = parseDecimal(findFirstTextWithin(root, "LineExtensionAmount"))
    const taxExclusiveAmount = parseDecimal(findFirstTextWithin(root, "TaxExclusiveAmount"))
    const taxInclusiveAmount = parseDecimal(findFirstTextWithin(root, "TaxInclusiveAmount"))
    const payableAmount = parseDecimal(findFirstTextWithin(root, "PayableAmount"))
    const taxAmount = parseDecimal(findFirstTextWithin(root, "TaxAmount"))

    if (
        !Number.isFinite(lineExtensionAmount) ||
        !Number.isFinite(taxExclusiveAmount) ||
        !Number.isFinite(taxInclusiveAmount) ||
        !Number.isFinite(payableAmount)
    ) {
        issues.push("Montants obligatoires manquants/invalides dans LegalMonetaryTotal.")
    } else {
        if (Math.abs(lineSum - lineExtensionAmount) > 0.01) {
            issues.push("Somme des lignes differente de LegalMonetaryTotal/LineExtensionAmount.")
        }
        if (Math.abs(lineExtensionAmount - taxExclusiveAmount) > 0.01) {
            issues.push("TaxExclusiveAmount doit correspondre a LineExtensionAmount.")
        }
        if (Math.abs(taxInclusiveAmount - payableAmount) > 0.01) {
            issues.push("PayableAmount doit correspondre a TaxInclusiveAmount.")
        }
    }

    if (Number.isFinite(taxAmount) && Math.abs(taxAmount) < 0.00001) {
        if (Number.isFinite(taxExclusiveAmount) && Number.isFinite(taxInclusiveAmount)) {
            if (Math.abs(taxExclusiveAmount - taxInclusiveAmount) > 0.01) {
                issues.push("TaxAmount = 0 implique TaxExclusiveAmount = TaxInclusiveAmount.")
            }
        }
    }

    return {
        isValid: issues.length === 0,
        issues,
    }
}

export function ValidEN16931XML(props: { xmlContent: string }) {
    const en16931 = useMemo(
        () => validateEn16931(props.xmlContent),
        [
            props.xmlContent,
        ],
    )
    return (
        <div
            className={css({
                border: "1px solid",
                borderColor: en16931.isValid ? "success/40" : "danger/30",
                borderRadius: "md",
                backgroundColor: en16931.isValid ? "success/5" : "danger/5",
                padding: "0.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            })}
        >
            <p
                className={css({
                    fontSize: "sm",
                    color: en16931.isValid ? "success" : "danger",
                })}
            >
                {en16931.isValid
                    ? "Validation EN16931: conforme"
                    : `Validation EN16931: ${en16931.issues.length} non-conformite(s)`}
            </p>
            {!en16931.isValid && (
                <ul
                    className={css({
                        margin: 0,
                        paddingLeft: "1rem",
                        fontSize: "xs",
                        color: "danger",
                    })}
                >
                    {en16931.issues.map((issue) => (
                        <li key={issue}>{issue}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
