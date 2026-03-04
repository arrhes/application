import { readAllOrganizationPaymentsRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconReceipt } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { FormatDate, formatDate } from "../../../../../components/formats/formatDate.tsx"
import { FormatDateTime } from "../../../../../components/formats/formatDateTime.tsx"
import { FormatPrice } from "../../../../../components/formats/formatPrice.tsx"
import type { ChipColors } from "../../../../../components/layouts/chip.tsx"
import { Chip } from "../../../../../components/layouts/chip.tsx"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { ListTable, type ListTableColumn } from "../../../../../components/layouts/listTable/listTable.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationSubscriptionHistoryRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionHistoryRoute.tsx"

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
    id: string
    status: string
    amountInCents: number
    currency: string
    description: string | null
    periodStart: string | null
    periodEnd: string | null
    createdAt: string
    sequenceType: string | null
}

const columns: Array<ListTableColumn<Payment>> = [
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
    },
    {
        id: "amount",
        header: "Montant",
        accessor: (payment) => payment.amountInCents,
    },
    {
        id: "date",
        header: "Date",
        accessor: (payment) => payment.createdAt,
    },
]

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
                                    {(filteredPayments) => (
                                        <ListTable.Root>
                                            {filteredPayments.map((payment) => (
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
                                                                    alignItems: "center",
                                                                    gap: "0.25rem",
                                                                })}
                                                            >
                                                                <FormatPrice price={payment.amountInCents / 100} />
                                                                <span
                                                                    className={css({
                                                                        fontSize: "xs",
                                                                        color: "neutral/50",
                                                                        fontFamily: "mono",
                                                                    })}
                                                                >
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
                                    )}
                                </ListTable.Filterable>
                            )
                        }}
                    </DataWrapper>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
