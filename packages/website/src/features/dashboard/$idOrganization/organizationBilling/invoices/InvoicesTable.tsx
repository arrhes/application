import type { returnedSchemas } from "@arrhes/application-metadata"
import { getAmountTTCFromHTInCents, getTaxAmountFromHTInCents } from "@arrhes/application-metadata/utilities"
import { Chip, type ChipColors } from "@arrhes/ui"
import type { ColumnDef } from "@tanstack/react-table"
import type * as v from "valibot"
import { DataTable } from "../../../../../components/layouts/dataTable.tsx"
import { InvoiceActionsPopover } from "./InvoiceActionsPopover.tsx"

const invoiceStatusLabel: Record<string, string> = {
    draft: "En cours",
    generated: "Disponible",
}

const invoiceStatusColor: Record<string, ChipColors> = {
    draft: "neutral",
    generated: "success",
}

function formatInvoicePeriod(periodStart: string): string {
    return new Intl.DateTimeFormat("fr-FR", {
        month: "long",
        year: "numeric",
    }).format(new Date(periodStart))
}

function formatInvoiceAmount(amountInCents: number, currency: string) {
    return `${(amountInCents / 100).toFixed(2).replace(".", ",")} ${currency}`
}

function getInvoiceTaxAmountInCents(invoice: Invoice) {
    return getTaxAmountFromHTInCents(invoice.amountInCents)
}

function getInvoiceTotalAmountInCents(invoice: Invoice) {
    return getAmountTTCFromHTInCents(invoice.amountInCents)
}

type Invoice = v.InferOutput<typeof returnedSchemas.invoice>

export function InvoicesTable(props: { invoices: Array<Invoice>; idOrganization: string }) {
    const columns: Array<ColumnDef<Invoice>> = [
        {
            id: "period",
            accessorFn: (invoice) => formatInvoicePeriod(invoice.startingAt),
            header: "Periode",
        },
        {
            accessorKey: "reference",
            header: "Reference",
        },
        {
            id: "amountHT",
            accessorFn: (invoice) => formatInvoiceAmount(invoice.amountInCents, invoice.currency),
            header: "Montant HT",
        },
        {
            id: "amountTVA",
            accessorFn: (invoice) => formatInvoiceAmount(getInvoiceTaxAmountInCents(invoice), invoice.currency),
            header: "TVA",
        },
        {
            id: "amountTTC",
            accessorFn: (invoice) => formatInvoiceAmount(getInvoiceTotalAmountInCents(invoice), invoice.currency),
            header: "Montant TTC",
        },
        {
            id: "status",
            accessorKey: "status",
            header: "Statut",
            cell: (context) => {
                const status = context.row.original.status
                return (
                    <Chip
                        text={invoiceStatusLabel[status] ?? status}
                        color={invoiceStatusColor[status] ?? "neutral"}
                    />
                )
            },
        },
        {
            id: "actions",
            meta: {
                fit: true,
            },
            enableSorting: false,
            enableGlobalFilter: false,
            header: " ",
            cell: (context) => (
                <InvoiceActionsPopover
                    idOrganization={props.idOrganization}
                    invoice={context.row.original}
                />
            ),
        },
    ]

    const sortedInvoices = [
        ...props.invoices,
    ].sort((a, b) => b.startingAt.localeCompare(a.startingAt))

    return (
        <DataTable
            data={sortedInvoices}
            columns={columns}
            pageSize={12}
        />
    )
}
