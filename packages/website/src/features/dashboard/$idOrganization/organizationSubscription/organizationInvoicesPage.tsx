import {
    generateInvoiceGetSignedUrlRouteDefinition,
    readAllInvoicesRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Chip, type ChipColors, formatDate, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDownload, IconFileInvoice } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../components/layouts/emptyState.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationInvoicesRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationInvoicesRoute.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"

const invoiceStatusLabel: Record<string, string> = {
    draft: "Brouillon",
    generated: "Générée",
    paid: "Payée",
}

const invoiceStatusColor: Record<string, ChipColors> = {
    draft: "neutral",
    generated: "warning",
    paid: "success",
}

type Invoice = {
    id: string
    invoiceNumber: string
    periodStart: string
    periodEnd: string
    amountInCents: number
    currency: string
    storageKey: string | null
    status: string
    createdAt: string
}

function DownloadInvoiceButton(props: { invoice: Invoice }) {
    const [isDownloading, setIsDownloading] = useState(false)

    async function handleDownload() {
        if (!props.invoice.storageKey) {
            toast({ title: "Le PDF de cette facture n'est pas encore disponible", variant: "error" })
            return
        }
        setIsDownloading(true)

        const res = await getResponseBodyFromAPI({
            routeDefinition: generateInvoiceGetSignedUrlRouteDefinition,
            body: { idInvoice: props.invoice.id },
        })
        setIsDownloading(false)

        if (!res.ok) {
            toast({ title: "Erreur lors de la génération du lien", variant: "error" })
            return
        }

        window.open(res.data.url, "_blank")
    }

    return (
        <button
            type="button"
            onClick={handleDownload}
            disabled={isDownloading}
            className={css({
                display: "flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.375rem 0.75rem",
                border: "1px solid token(colors.neutral/20)",
                borderRadius: "md",
                cursor: "pointer",
                fontSize: "sm",
                background: "transparent",
                color: "neutral",
                _hover: { background: "neutral/5" },
                _disabled: { opacity: 0.5, cursor: "not-allowed" },
            })}
        >
            <IconDownload size={14} />
            {isDownloading ? "Chargement..." : props.invoice.storageKey ? "Télécharger" : "PDF indisponible"}
        </button>
    )
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
                                        <span>Numéro</span>
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
                                                {formatDate(invoice.periodStart)} — {formatDate(invoice.periodEnd)}
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
