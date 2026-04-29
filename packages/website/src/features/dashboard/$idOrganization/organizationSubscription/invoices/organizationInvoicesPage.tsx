import { readAllInvoicesRouteDefinition } from "@arrhes/application-metadata/routes"
import { Chip, type ChipColors } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFileInvoice } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationInvoicesRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationInvoicesRoute.tsx"
import { DownloadInvoiceButton } from "./DownloadInvoiceButton.tsx"

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

export function OrganizationInvoicesPage() {
    const _params = useParams({ from: organizationInvoicesRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <SettingsSection.Root>
                    <SettingsSection.Header title="Factures" />
                    <DataWrapper routeDefinition={readAllInvoicesRouteDefinition} body={{}}>
                        {(invoices) => {
                            if (invoices.length === 0) {
                                return (
                                    <EmptyState
                                        icon={<IconFileInvoice size={48} />}
                                        title="Aucune facture"
                                        subtitle="Vos factures mensuelles apparaîtront ici à partir du mois suivant votre premier abonnement."
                                    />
                                )
                            }

                            return (
                                <div
                                    className={css({
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                    })}
                                >
                                    {/* Header row */}
                                    <div
                                        className={css({
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                                            padding: "0.5rem 1rem",
                                            fontSize: "xs",
                                            color: "neutral/60",
                                            fontWeight: "600",
                                            textTransform: "uppercase",
                                            letterSpacing: "wider",
                                            borderBottom: "1px solid token(colors.neutral/20)",
                                            gap: "1rem",
                                        })}
                                    >
                                        <span>Période</span>
                                        <span>Référence</span>
                                        <span>Montant</span>
                                        <span>Statut</span>
                                        <span />
                                    </div>
                                    {invoices.map((invoice) => (
                                        <div
                                            key={invoice.id}
                                            className={css({
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                                                padding: "0.75rem 1rem",
                                                borderBottom: "1px solid token(colors.neutral/10)",
                                                alignItems: "center",
                                                gap: "1rem",
                                            })}
                                        >
                                            <span className={css({ fontSize: "sm" })}>
                                                {formatInvoicePeriod(invoice.periodStart)}
                                            </span>
                                            <span
                                                className={css({
                                                    fontSize: "sm",
                                                    fontVariantNumeric: "tabular-nums",
                                                })}
                                            >
                                                {invoice.invoiceNumber}
                                            </span>
                                            <span className={css({ fontSize: "sm", fontWeight: "500" })}>
                                                {(invoice.amountInCents / 100).toFixed(2).replace(".", ",")}{" "}
                                                {invoice.currency}
                                            </span>
                                            <Chip
                                                text={invoiceStatusLabel[invoice.status] ?? invoice.status}
                                                color={invoiceStatusColor[invoice.status] ?? "neutral"}
                                            />
                                            <DownloadInvoiceButton invoice={invoice} />
                                        </div>
                                    ))}
                                </div>
                            )
                        }}
                    </DataWrapper>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
