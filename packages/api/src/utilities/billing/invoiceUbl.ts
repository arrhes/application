import {
    getAmountTTCFromHTInCents,
    getTaxAmountFromHTInCents,
    VAT_PERCENT,
} from "@arrhes/application-metadata/utilities"

type InvoiceUblLine = {
    serviceType: string | null
    description: string | null
    amountInCents: number
    quantity: number
}

function escapeXml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;")
}

function formatDate(dateIso: string) {
    return new Date(dateIso).toISOString().slice(0, 10)
}

function formatAmount(amountInCents: number) {
    return (amountInCents / 100).toFixed(2)
}

function getServiceLabel(serviceType: string | null, fallbackDescription: string | null) {
    if (serviceType === "support") return "Licence mensuelle"
    if (serviceType === "storage_gb") return "Stockage supplementaire"
    if (serviceType === "agent_tokens_million") return "Achat tokens Assistant IA"
    if (serviceType === "ocr_pages_hundred") return "Achat pages OCR"

    if (fallbackDescription && fallbackDescription.trim().length > 0) {
        return fallbackDescription
    }

    return "Service Arrhes"
}

export function getInvoiceXmlStorageKey(pdfStorageKey: string) {
    if (pdfStorageKey.endsWith(".xml")) {
        return pdfStorageKey
    }

    if (pdfStorageKey.endsWith(".pdf")) {
        return `${pdfStorageKey.slice(0, -4)}.xml`
    }

    return `${pdfStorageKey}.xml`
}

export function buildInvoiceUblXml(parameters: {
    invoiceNumber: string
    issueDateIso: string
    dueDateIso: string
    periodStartIso: string
    periodEndIso: string
    amountInCents: number
    currency: string
    supplierName: string
    supplierSiren: string
    supplierVatId: string
    supplierAddress: string
    customerName: string
    customerSiren: string | null
    customerEmail: string | null
    lines: InvoiceUblLine[]
}) {
    const issueDate = formatDate(parameters.issueDateIso)
    const dueDate = formatDate(parameters.dueDateIso)
    const billingPeriodStart = formatDate(parameters.periodStartIso)
    const billingPeriodEnd = formatDate(parameters.periodEndIso)

    const normalizedLines =
        parameters.lines.length > 0
            ? parameters.lines
            : [
                  {
                      serviceType: null,
                      description: "Service Arrhes",
                      amountInCents: parameters.amountInCents,
                      quantity: 1,
                  },
              ]

    const totalAmountHTInCents = parameters.amountInCents
    const totalTaxAmountInCents = getTaxAmountFromHTInCents(totalAmountHTInCents)
    const totalAmountTTCInCents = getAmountTTCFromHTInCents(totalAmountHTInCents)

    const linesXml = normalizedLines
        .map((line, index) => {
            const quantity = line.quantity > 0 ? line.quantity : 1
            const unitPriceInCents = Math.round(line.amountInCents / quantity)
            const lineTaxAmountInCents = getTaxAmountFromHTInCents(line.amountInCents)
            const lineAmountTTCInCents = getAmountTTCFromHTInCents(line.amountInCents)

            return [
                "  <cac:InvoiceLine>",
                `    <cbc:ID>${index + 1}</cbc:ID>`,
                `    <cbc:InvoicedQuantity unitCode="C62">${quantity}</cbc:InvoicedQuantity>`,
                `    <cbc:LineExtensionAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(line.amountInCents)}</cbc:LineExtensionAmount>`,
                "    <cac:TaxTotal>",
                `      <cbc:TaxAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(lineTaxAmountInCents)}</cbc:TaxAmount>`,
                "    </cac:TaxTotal>",
                "    <cac:ItemPriceExtension>",
                `      <cbc:Amount currencyID="${escapeXml(parameters.currency)}">${formatAmount(lineAmountTTCInCents)}</cbc:Amount>`,
                "    </cac:ItemPriceExtension>",
                "    <cac:Item>",
                `      <cbc:Name>${escapeXml(getServiceLabel(line.serviceType, line.description))}</cbc:Name>`,
                "      <cac:ClassifiedTaxCategory>",
                "        <cbc:ID>S</cbc:ID>",
                `        <cbc:Percent>${VAT_PERCENT}</cbc:Percent>`,
                "        <cac:TaxScheme>",
                "          <cbc:ID>VAT</cbc:ID>",
                "        </cac:TaxScheme>",
                "      </cac:ClassifiedTaxCategory>",
                "    </cac:Item>",
                "    <cac:Price>",
                `      <cbc:PriceAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(unitPriceInCents)}</cbc:PriceAmount>`,
                "    </cac:Price>",
                "  </cac:InvoiceLine>",
            ].join("\n")
        })
        .join("\n")

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">',
        "  <cbc:CustomizationID>urn:cen.eu:en16931:2017</cbc:CustomizationID>",
        "  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>",
        `  <cbc:ID>${escapeXml(parameters.invoiceNumber)}</cbc:ID>`,
        "  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>",
        `  <cbc:IssueDate>${issueDate}</cbc:IssueDate>`,
        `  <cbc:DueDate>${dueDate}</cbc:DueDate>`,
        `  <cbc:DocumentCurrencyCode>${escapeXml(parameters.currency)}</cbc:DocumentCurrencyCode>`,
        "  <cac:InvoicePeriod>",
        `    <cbc:StartDate>${billingPeriodStart}</cbc:StartDate>`,
        `    <cbc:EndDate>${billingPeriodEnd}</cbc:EndDate>`,
        "  </cac:InvoicePeriod>",
        "  <cac:AccountingSupplierParty>",
        "    <cac:Party>",
        "      <cac:PartyIdentification>",
        `        <cbc:ID>${escapeXml(parameters.supplierSiren)}</cbc:ID>`,
        "      </cac:PartyIdentification>",
        "      <cac:PartyName>",
        `        <cbc:Name>${escapeXml(parameters.supplierName)}</cbc:Name>`,
        "      </cac:PartyName>",
        "      <cac:PostalAddress>",
        `        <cbc:StreetName>${escapeXml(parameters.supplierAddress)}</cbc:StreetName>`,
        "      </cac:PostalAddress>",
        "      <cac:PartyTaxScheme>",
        `        <cbc:CompanyID>${escapeXml(parameters.supplierVatId)}</cbc:CompanyID>`,
        "        <cac:TaxScheme>",
        "          <cbc:ID>VAT</cbc:ID>",
        "        </cac:TaxScheme>",
        "      </cac:PartyTaxScheme>",
        "    </cac:Party>",
        "  </cac:AccountingSupplierParty>",
        "  <cac:AccountingCustomerParty>",
        "    <cac:Party>",
        "      <cac:PartyName>",
        `        <cbc:Name>${escapeXml(parameters.customerName)}</cbc:Name>`,
        "      </cac:PartyName>",
        ...(parameters.customerSiren
            ? [
                  "      <cac:PartyIdentification>",
                  `        <cbc:ID>${escapeXml(parameters.customerSiren)}</cbc:ID>`,
                  "      </cac:PartyIdentification>",
              ]
            : []),
        ...(parameters.customerEmail
            ? [
                  "      <cac:Contact>",
                  `        <cbc:ElectronicMail>${escapeXml(parameters.customerEmail)}</cbc:ElectronicMail>`,
                  "      </cac:Contact>",
              ]
            : []),
        "    </cac:Party>",
        "  </cac:AccountingCustomerParty>",
        "  <cac:TaxTotal>",
        `    <cbc:TaxAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(totalTaxAmountInCents)}</cbc:TaxAmount>`,
        "    <cac:TaxSubtotal>",
        `      <cbc:TaxableAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(totalAmountHTInCents)}</cbc:TaxableAmount>`,
        `      <cbc:TaxAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(totalTaxAmountInCents)}</cbc:TaxAmount>`,
        "      <cac:TaxCategory>",
        "        <cbc:ID>S</cbc:ID>",
        `        <cbc:Percent>${VAT_PERCENT}</cbc:Percent>`,
        "        <cac:TaxScheme>",
        "          <cbc:ID>VAT</cbc:ID>",
        "        </cac:TaxScheme>",
        "      </cac:TaxCategory>",
        "    </cac:TaxSubtotal>",
        "  </cac:TaxTotal>",
        "  <cac:LegalMonetaryTotal>",
        `    <cbc:LineExtensionAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(totalAmountHTInCents)}</cbc:LineExtensionAmount>`,
        `    <cbc:TaxExclusiveAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(totalAmountHTInCents)}</cbc:TaxExclusiveAmount>`,
        `    <cbc:TaxInclusiveAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(totalAmountTTCInCents)}</cbc:TaxInclusiveAmount>`,
        `    <cbc:PayableAmount currencyID="${escapeXml(parameters.currency)}">${formatAmount(totalAmountTTCInCents)}</cbc:PayableAmount>`,
        "  </cac:LegalMonetaryTotal>",
        linesXml,
        "</Invoice>",
    ].join("\n")
}
