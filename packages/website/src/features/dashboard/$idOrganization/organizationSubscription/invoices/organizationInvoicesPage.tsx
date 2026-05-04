import { readAllInvoicesRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconFileInvoice } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationInvoicesRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationInvoicesRoute.tsx"
import { InvoicesTable } from "./InvoicesTable.tsx"

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
                                        subtitle="Vos factures mensuelles apparaitront ici a partir du mois suivant votre premier abonnement."
                                    />
                                )
                            }

                            return <InvoicesTable invoices={invoices} />
                        }}
                    </DataWrapper>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
