import { readAllOrganizationPaymentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Chip, type ChipColors, FormatPrice, formatDate } from "@arrhes/ui"
import { IconReceipt } from "@tabler/icons-react"
import type { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../../../../components/layouts/DataTable.tsx"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { EmptyState } from "../../../../components/layouts/EmptyState.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"

const statusLabel: Record<string, string> = {
    pending: "En attente",
    paid: "Payé",
    failed: "Échoué",
    refunded: "Remboursé",
}

const statusColor: Record<string, ChipColors> = {
    pending: "warning",
    paid: "success",
    failed: "error",
    refunded: "neutral",
}

type Payment = {
    category: string
    flow: "debit" | "credit"
    id: string
    idInvoice: string
    serviceType: string | null
    status: string
    amountHTInCents: number
    amountTVAInCents: number
    currency: string
    description: string | null
    periodStart: string | null
    periodEnd: string | null
    createdAt: string
    sequenceType: string | null
}

function getSignedAmountHTInCents(payment: Payment): number {
    return payment.flow === "debit" ? payment.amountHTInCents : -payment.amountHTInCents
}

function getSignedAmountTVAInCents(payment: Payment): number {
    return payment.flow === "debit" ? payment.amountTVAInCents : -payment.amountTVAInCents
}

function getPaymentCategoryLabel(category: string): string {
    if (category === "top_up") return "Recharge"
    if (category === "withdrawal") return "Retrait"
    if (category === "wallet_spending") return "Portefeuille"
    if (category === "setup") return "Moyen de paiement"
    return "Abonnement"
}

function getPaymentServiceLabel(serviceType: string | null): string {
    if (serviceType === "support") return "Licence"
    if (serviceType === "storage_gb") return "Stockage"
    if (serviceType === "agent_tokens_million") return "Tokens"
    if (serviceType === "ocr_pages_hundred") return "OCR"
    return "-"
}

const columns: Array<ColumnDef<Payment>> = [
    {
        accessorKey: "createdAt",
        header: "Date",
        minSize: 150,
        size: 170,
        cell: (context) => formatDate(context.row.original.createdAt),
    },
    {
        id: "type",
        header: "Type",
        minSize: 130,
        size: 150,
        accessorFn: (payment) => getPaymentCategoryLabel(payment.category),
    },
    {
        id: "service",
        header: "Service",
        minSize: 120,
        size: 140,
        accessorFn: (payment) => getPaymentServiceLabel(payment.serviceType),
    },
    {
        accessorKey: "description",
        header: "Description",
        minSize: 280,
        size: 360,
        cell: (context) => context.row.original.description ?? "-",
    },
    {
        id: "period",
        header: "Période",
        minSize: 250,
        size: 300,
        accessorFn: (payment) =>
            payment.periodStart && payment.periodEnd
                ? `${formatDate(payment.periodStart)} - ${formatDate(payment.periodEnd)}`
                : null,
    },
    {
        id: "status",
        header: "Statut",
        minSize: 130,
        size: 150,
        accessorFn: (payment) => statusLabel[payment.status] ?? payment.status,
        cell: (context) => {
            const status = context.row.original.status
            return (
                <Chip
                    text={statusLabel[status] ?? status}
                    color={statusColor[status] ?? "neutral"}
                />
            )
        },
    },
    {
        id: "amountHT",
        header: "Montant HT",
        minSize: 150,
        size: 170,
        accessorFn: (payment) => getSignedAmountHTInCents(payment),
        cell: (context) => <FormatPrice price={getSignedAmountHTInCents(context.row.original) / 100} />,
    },
    {
        id: "amountTVA",
        header: "TVA",
        minSize: 130,
        size: 150,
        accessorFn: (payment) => getSignedAmountTVAInCents(payment),
        cell: (context) => <FormatPrice price={getSignedAmountTVAInCents(context.row.original) / 100} />,
    },
]

export function OrganizationBillingHistoryPage() {
    return (
        <Page.Root>
            <Page.Content>
                <SettingsSection.Root>
                    <SettingsSection.Header title="Historique des paiements" />
                    <DataWrapper
                        routeDefinition={readAllOrganizationPaymentsRouteDefinition}
                        body={{}}
                    >
                        {(payments) => {
                            if (payments.length === 0) {
                                return (
                                    <EmptyState
                                        icon={<IconReceipt />}
                                        title="Aucun paiement"
                                        subtitle="Les paiements apparaîtront ici."
                                    />
                                )
                            }

                            return (
                                <DataTable
                                    data={[
                                        ...payments,
                                    ].sort((a, b) => b.createdAt.localeCompare(a.createdAt))}
                                    columns={columns}
                                    pageSize={12}
                                    defaultColumnVisibility={{
                                        type: false,
                                        service: false,
                                    }}
                                />
                            )
                        }}
                    </DataWrapper>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
