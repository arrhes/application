import { readAllOrganizationPaymentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Chip, type ChipColors, FormatDate, FormatDateTime, FormatPrice, formatDate } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconReceipt } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../components/layouts/emptyState.tsx"
import { ListTable, type ListTableColumn } from "../../../../components/layouts/listTable/listTable.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationSubscriptionHistoryRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionHistoryRoute.tsx"

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

const paymentCategoryOptions = [
    { key: "Abonnement", label: "Abonnement" },
    { key: "Moyen de paiement", label: "Moyen de paiement" },
    { key: "Portefeuille", label: "Portefeuille" },
    { key: "Recharge", label: "Recharge" },
    { key: "Retrait", label: "Retrait" },
]

const paymentServiceOptions = [
    { key: "-", label: "-" },
    { key: "Licence", label: "Licence" },
    { key: "OCR", label: "OCR" },
    { key: "Stockage", label: "Stockage" },
    { key: "Tokens", label: "Tokens" },
]

const paymentStatusOptions = [
    { key: "En attente", label: "En attente" },
    { key: "Payé", label: "Payé" },
    { key: "Remboursé", label: "Remboursé" },
    { key: "Échoué", label: "Échoué" },
]

type Payment = {
    category: string
    id: string
    idInvoice: string | null
    serviceType: string | null
    status: string
    amountInCents: number
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
    if (payment.category === "withdrawal" || payment.category === "wallet_spending") {
        return -payment.amountHTInCents
    }

    return payment.amountHTInCents
}

function getSignedAmountTVAInCents(payment: Payment): number {
    if (payment.category === "withdrawal" || payment.category === "wallet_spending") {
        return -payment.amountTVAInCents
    }

    return payment.amountTVAInCents
}

function getSignedAmountTTCInCents(payment: Payment): number {
    return getSignedAmountHTInCents(payment) + getSignedAmountTVAInCents(payment)
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

const columns: Array<ListTableColumn<Payment>> = [
    {
        id: "category",
        header: "Type",
        accessor: (payment) => getPaymentCategoryLabel(payment.category),
        filterVariant: "combobox",
        filterOptions: paymentCategoryOptions,
    },
    {
        id: "service",
        header: "Service",
        accessor: (payment) => getPaymentServiceLabel(payment.serviceType),
        filterVariant: "combobox",
        filterOptions: paymentServiceOptions,
    },
    {
        id: "period",
        header: "Période",
        accessor: (payment) =>
            payment.periodStart && payment.periodEnd
                ? `${formatDate(payment.periodStart)} - ${formatDate(payment.periodEnd)}`
                : null,
    },
    {
        id: "status",
        header: "Statut",
        accessor: (payment) => statusLabel[payment.status] ?? payment.status,
        filterVariant: "combobox",
        filterOptions: paymentStatusOptions,
    },
    {
        id: "amountHT",
        header: "Montant HT",
        accessor: (payment) => getSignedAmountHTInCents(payment),
    },
    {
        id: "amountTVA",
        header: "TVA",
        accessor: (payment) => getSignedAmountTVAInCents(payment),
    },
    {
        id: "amountTTC",
        header: "Montant TTC",
        accessor: (payment) => getSignedAmountTTCInCents(payment),
    },
    {
        id: "date",
        header: "Date",
        accessor: (payment) => payment.createdAt,
    },
]

function PaymentList(props: { payments: Array<Payment> }) {
    if (props.payments.length === 0) {
        return (
            <div
                className={css({
                    borderRadius: "xl",
                    border: "1px dashed token(colors.neutral/15)",
                    padding: "1rem",
                    fontSize: "sm",
                    color: "neutral/60",
                })}
            >
                Aucun paiement ne correspond aux filtres.
            </div>
        )
    }

    return (
        <ListTable.Root>
            {props.payments.map((payment) => (
                <ListTable.Row key={payment.id}>
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "1rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                            })}
                        >
                            <div
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                })}
                            >
                                <span
                                    className={css({
                                        fontSize: "sm",
                                        fontWeight: "medium",
                                    })}
                                >
                                    {payment.description ?? "Paiement"}
                                </span>
                                <Chip text={getPaymentCategoryLabel(payment.category)} color="neutral" />
                                {payment.serviceType !== null ? (
                                    <Chip text={getPaymentServiceLabel(payment.serviceType)} color="neutral" />
                                ) : null}
                            </div>
                            <div
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    fontSize: "xs",
                                    color: "neutral/50",
                                })}
                            >
                                {payment.periodStart && payment.periodEnd && (
                                    <span>
                                        Du <FormatDate date={payment.periodStart} /> au{" "}
                                        <FormatDate date={payment.periodEnd} />
                                    </span>
                                )}
                            </div>
                        </div>
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "end",
                                gap: "0.25rem",
                            })}
                        >
                            <span
                                className={css({
                                    flexShrink: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "end",
                                    gap: "0.25rem",
                                })}
                            >
                                <span className={css({ fontSize: "xs", color: "neutral/60" })}>
                                    HT: <FormatPrice price={getSignedAmountHTInCents(payment) / 100} />{" "}
                                    {payment.currency}
                                </span>
                                <span className={css({ fontSize: "xs", color: "neutral/60" })}>
                                    TVA: <FormatPrice price={getSignedAmountTVAInCents(payment) / 100} />{" "}
                                    {payment.currency}
                                </span>
                                <span className={css({ fontSize: "sm", fontWeight: "600" })}>
                                    TTC: <FormatPrice price={getSignedAmountTTCInCents(payment) / 100} />{" "}
                                    {payment.currency}
                                </span>
                            </span>
                            <Chip
                                text={statusLabel[payment.status] ?? payment.status}
                                color={statusColor[payment.status] ?? "neutral"}
                            />
                            <FormatDateTime date={payment.createdAt} />
                        </div>
                    </div>
                </ListTable.Row>
            ))}
        </ListTable.Root>
    )
}

export function OrganizationSubscriptionHistoryPage() {
    const _params = useParams({ from: organizationSubscriptionHistoryRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <SettingsSection.Root>
                    <SettingsSection.Header title="Historique des paiements" />
                    <DataWrapper routeDefinition={readAllOrganizationPaymentsRouteDefinition} body={{}}>
                        {(payments) => {
                            if (payments.length === 0) {
                                return (
                                    <EmptyState
                                        icon={<IconReceipt size={48} />}
                                        title="Aucun paiement"
                                        subtitle="Les paiements apparaîtront ici une fois votre premier abonnement souscrit."
                                    />
                                )
                            }

                            return (
                                <ListTable.Filterable items={payments} columns={columns}>
                                    {(filteredPayments) => <PaymentList payments={filteredPayments} />}
                                </ListTable.Filterable>
                            )
                        }}
                    </DataWrapper>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
