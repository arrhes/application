import { VAT_PERCENT, VAT_RATE } from "@arrhes/application-metadata/utilities"

function escapePdfText(value: string) {
    return value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)")
}

function findFirstTextWithin(element: Element, localName: string) {
    const node = Array.from(element.getElementsByTagName("*")).find((child) => child.localName === localName)
    return node?.textContent?.trim() ?? ""
}

function parseDecimal(value: string) {
    if (!value) return Number.NaN
    const normalized = value.replaceAll(",", ".")
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : Number.NaN
}

function clampToTwoDecimals(value: number) {
    return Math.round(value * 100) / 100
}

function formatCurrency(amount: number, currency: string) {
    if (!Number.isFinite(amount)) return `- ${currency}`
    return `${amount.toFixed(2)} ${currency}`
}

function truncateText(value: string, maxLength: number) {
    if (value.length <= maxLength) return value
    return `${value.slice(0, maxLength - 1)}...`
}

function formatDateFr(isoDate: string) {
    if (!isoDate) return "-"
    return new Date(isoDate).toLocaleDateString("fr-FR")
}

function byteLength(value: string) {
    return new TextEncoder().encode(value).length
}

function buildStyledPdf(parameters: {
    invoiceNumber: string
    issueDate: string
    dueDate: string
    supplier: string
    customer: string
    currency: string
    totalAmount: number
    subtotalAmount: number
    taxAmount: number
    invoiceLines: Array<{
        service: string
        quantity: number
        unitPrice: number
        subtotal: number
        tax: number
    }>
}) {
    const pageWidth = 595
    const pageHeight = 842
    const left = 44
    const right = pageWidth - 44
    const contentWidth = right - left
    const commands: string[] = []

    let y = pageHeight - 48

    const setFillRgb = (r: number, g: number, b: number) => {
        commands.push(`${r} ${g} ${b} rg`)
    }

    const setStrokeRgb = (r: number, g: number, b: number) => {
        commands.push(`${r} ${g} ${b} RG`)
    }

    const text = (value: string, x: number, currentY: number, fontSize: number, align: "left" | "right" = "left") => {
        const safeValue = escapePdfText(value)
        const estimatedWidth = value.length * fontSize * 0.6
        const finalX = align === "right" ? x - estimatedWidth : x
        commands.push("BT")
        commands.push(`/F1 ${fontSize} Tf`)
        commands.push(`1 0 0 1 ${finalX} ${currentY} Tm`)
        commands.push(`(${safeValue}) Tj`)
        commands.push("ET")
    }

    const separator = (currentY: number) => {
        setStrokeRgb(0.72, 0.75, 0.78)
        commands.push(`${left} ${currentY} m ${right} ${currentY} l S`)
    }

    const filledRow = (currentY: number, height: number, fillGray: number) => {
        setFillRgb(fillGray, fillGray, fillGray)
        commands.push(`${left} ${currentY - height} ${contentWidth} ${height} re f`)
    }

    setFillRgb(0.02, 0.12, 0.26)
    text("Barbote SAS", left, y, 20)
    setFillRgb(0.22, 0.25, 0.3)
    text("Facture", right, y + 1, 16, "right")
    y -= 21
    setFillRgb(0.45, 0.48, 0.52)
    text("arrhes.app", left, y, 10)
    text(`Reference: ${parameters.invoiceNumber}`, right, y, 10, "right")
    y -= 18

    separator(y)
    y -= 18

    setFillRgb(0.12, 0.16, 0.2)
    text("Prestataire", left, y, 11)
    text("Client", left + contentWidth * 0.55, y, 11)
    y -= 14
    setFillRgb(0.18, 0.2, 0.24)
    text(parameters.supplier, left, y, 10)
    text(parameters.customer, left + contentWidth * 0.55, y, 10)
    y -= 13
    setFillRgb(0.38, 0.41, 0.45)
    text("SIREN 908 719 503", left, y, 9)
    text(`Date emission: ${formatDateFr(parameters.issueDate)}`, right, y, 9, "right")
    y -= 13
    text("TVA FR02908719503", left, y, 9)
    text(`Date echeance: ${formatDateFr(parameters.dueDate)}`, right, y, 9, "right")
    y -= 20

    separator(y)
    y -= 18

    setFillRgb(0.1, 0.12, 0.15)
    text("Lignes de facturation", left, y, 12)
    y -= 14

    filledRow(y + 4, 18, 0.95)
    setFillRgb(0.18, 0.2, 0.24)
    text("Service", left + 6, y - 8, 9)
    text("Qte", left + 280, y - 8, 9, "right")
    text("Prix unitaire HT", left + 372, y - 8, 9, "right")
    text("Sous-total HT", left + 460, y - 8, 9, "right")
    text(`TVA ${VAT_PERCENT}%`, right - 6, y - 8, 9, "right")
    y -= 18

    for (const [index, line] of parameters.invoiceLines.entries()) {
        if (y < 160) {
            setFillRgb(0.45, 0.48, 0.52)
            text("... lignes supplementaires non affichees", left + 6, y - 10, 9)
            y -= 18
            break
        }

        if (index % 2 === 0) {
            filledRow(y + 2, 16, 0.985)
        }

        setFillRgb(0.18, 0.2, 0.24)
        text(truncateText(line.service, 42), left + 6, y - 9, 9)
        text(String(line.quantity), left + 280, y - 9, 9, "right")
        text(formatCurrency(line.unitPrice, parameters.currency), left + 372, y - 9, 9, "right")
        text(formatCurrency(line.subtotal, parameters.currency), left + 460, y - 9, 9, "right")
        text(formatCurrency(line.tax, parameters.currency), right - 6, y - 9, 9, "right")
        y -= 16
    }

    y -= 10
    separator(y)
    y -= 18

    const summaryRight = right
    const summaryLabelX = summaryRight - 180
    const summaryValueX = summaryRight - 6

    setFillRgb(0.14, 0.16, 0.2)
    text("Total HT", summaryLabelX, y, 10)
    text(formatCurrency(parameters.subtotalAmount, parameters.currency), summaryValueX, y, 10, "right")
    y -= 14
    text(`TVA ${VAT_PERCENT}%`, summaryLabelX, y, 10)
    text(formatCurrency(parameters.taxAmount, parameters.currency), summaryValueX, y, 10, "right")
    y -= 14

    setFillRgb(0.02, 0.12, 0.26)
    text("Total TTC", summaryLabelX, y, 12)
    text(formatCurrency(parameters.totalAmount, parameters.currency), summaryValueX, y, 12, "right")

    const footerY = 56
    separator(footerY + 18)
    setFillRgb(0.45, 0.48, 0.52)
    text("Reglement comptant - Escompte: neant", left, footerY + 4, 8)
    text("Penalites de retard: taux legal + indemnite forfaitaire 40 EUR", left, footerY - 8, 8)
    text(`Montants d'abonnement et credits exprimes HT - TVA ${VAT_PERCENT}% appliquee`, left, footerY - 20, 8)
    text("Document genere depuis le flux UBL Arrhes", right, footerY - 20, 8, "right")

    const stream = commands.join("\n")

    const objects = [
        "<< /Type /Catalog /Pages 2 0 R >>",
        "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
        "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
        `<< /Length ${byteLength(stream)} >>\nstream\n${stream}\nendstream`,
    ]

    let body = "%PDF-1.4\n"
    const offsets: number[] = [0]

    for (let index = 0; index < objects.length; index++) {
        offsets.push(byteLength(body))
        body += `${index + 1} 0 obj\n${objects[index]}\nendobj\n`
    }

    const xrefOffset = byteLength(body)
    body += `xref\n0 ${objects.length + 1}\n`
    body += "0000000000 65535 f \n"
    body += offsets
        .slice(1)
        .map((offset) => `${offset.toString().padStart(10, "0")} 00000 n \n`)
        .join("")
    body += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`

    return new Blob([body], { type: "application/pdf" })
}

export function generatePdfFromUblXml(parameters: { xmlContent: string; fallbackFileName?: string }) {
    const parser = new DOMParser()
    const document = parser.parseFromString(parameters.xmlContent, "application/xml")

    if (document.getElementsByTagName("parsererror").length > 0) {
        throw new Error("XML invalide")
    }

    const root = document.documentElement
    const invoiceNumber = findFirstTextWithin(root, "ID") || parameters.fallbackFileName || "invoice"
    const issueDate = findFirstTextWithin(root, "IssueDate") || "-"
    const dueDate = findFirstTextWithin(root, "DueDate") || "-"
    const currency = findFirstTextWithin(root, "DocumentCurrencyCode") || "EUR"
    const supplier =
        findFirstTextWithin(
            Array.from(document.getElementsByTagName("*")).find(
                (node) => node.localName === "AccountingSupplierParty",
            ) ?? root,
            "Name",
        ) || "-"
    const customer =
        findFirstTextWithin(
            Array.from(document.getElementsByTagName("*")).find(
                (node) => node.localName === "AccountingCustomerParty",
            ) ?? root,
            "Name",
        ) || "-"
    const invoiceLines = Array.from(document.getElementsByTagName("*")).filter(
        (node) => node.localName === "InvoiceLine",
    )

    const normalizedLines = invoiceLines.map((line) => {
        const service = findFirstTextWithin(line, "Name") || "Service"
        const quantityRaw = parseDecimal(findFirstTextWithin(line, "InvoicedQuantity"))
        const lineSubtotalRaw = parseDecimal(findFirstTextWithin(line, "LineExtensionAmount"))
        const priceRaw = parseDecimal(findFirstTextWithin(line, "PriceAmount"))

        const quantity = Number.isFinite(quantityRaw) && quantityRaw > 0 ? quantityRaw : 1
        const subtotal = Number.isFinite(lineSubtotalRaw) ? clampToTwoDecimals(lineSubtotalRaw) : 0
        const unitPrice = Number.isFinite(priceRaw)
            ? clampToTwoDecimals(priceRaw)
            : clampToTwoDecimals(subtotal / quantity)
        const tax = clampToTwoDecimals(subtotal * VAT_RATE)

        return {
            service,
            quantity,
            unitPrice,
            subtotal,
            tax,
        }
    })

    const subtotalAmount = clampToTwoDecimals(normalizedLines.reduce((sum, line) => sum + line.subtotal, 0))
    const taxAmount = clampToTwoDecimals(normalizedLines.reduce((sum, line) => sum + line.tax, 0))
    const resolvedTotal = clampToTwoDecimals(subtotalAmount + taxAmount)

    const pdfBlob = buildStyledPdf({
        invoiceNumber,
        issueDate,
        dueDate,
        supplier,
        customer,
        currency,
        totalAmount: resolvedTotal,
        subtotalAmount,
        taxAmount,
        invoiceLines: normalizedLines,
    })

    return {
        blob: pdfBlob,
        fileName: `${invoiceNumber}.pdf`,
    }
}

export function downloadPdfFromUblXml(parameters: { xmlContent: string; fallbackFileName?: string }) {
    const generated = generatePdfFromUblXml(parameters)
    const objectUrl = URL.createObjectURL(generated.blob)
    const anchor = document.createElement("a")
    anchor.href = objectUrl
    anchor.download = generated.fileName
    document.body.append(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(objectUrl)
}
