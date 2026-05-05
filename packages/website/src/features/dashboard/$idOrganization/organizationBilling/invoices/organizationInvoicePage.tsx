import { readOneInvoiceRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import type * as v from "valibot"
import { Banner } from "../../../../../components/layouts/banner.tsx"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationInvoiceUblRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationBilling/organizationInvoiceUblRoute.js"
import { InvoicePaymentsTable } from "./InvoicePaymentsTable.tsx"
import { InvoiceXMLViewer } from "./InvoiceXMLViewer.tsx"

function formatInvoiceMonthYear(periodStart: string) {
    return new Intl.DateTimeFormat("fr-FR", {
        month: "long",
        year: "numeric",
    }).format(new Date(periodStart))
}

type InvoiceTab = "payments" | "xml"

function InvoiceTabsContent(props: {
    idInvoice: string
    invoice: v.InferOutput<typeof readOneInvoiceRouteDefinition.schemas.return>
}) {
    const [activeTab, setActiveTab] = useState<InvoiceTab>("payments")

    return (
        <div className={css({ display: "flex", flexDirection: "column", gap: "0.9rem" })}>
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    paddingBottom: "0.4rem",
                })}
            >
                <Button onClick={() => setActiveTab("payments")}>
                    <ButtonGhostContent text="Paiements" isCurrent={activeTab === "payments"} />
                </Button>
                <Button onClick={() => setActiveTab("xml")}>
                    <ButtonGhostContent text="Vue XML" isCurrent={activeTab === "xml"} />
                </Button>
            </div>

            {activeTab === "payments" && <InvoicePaymentsTable idInvoice={props.idInvoice} />}

            {activeTab === "xml" &&
                (props.invoice.xmlStorageKey === null ? (
                    <Banner variant="information" title="Facture non disponible">
                        La facture XML/PDF n'est pas encore générée. Elle sera disponible au début du mois prochain.
                    </Banner>
                ) : (
                    <InvoiceXMLViewer invoice={props.invoice} />
                ))}
        </div>
    )
}
export function OrganizationInvoicePage() {
    const params = useParams({ from: organizationInvoiceUblRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <SettingsSection.Root>
                    <DataWrapper routeDefinition={readOneInvoiceRouteDefinition} body={{ idInvoice: params.idInvoice }}>
                        {(invoice) => {
                            return (
                                <>
                                    <SettingsSection.Header
                                        title={`Facture ${invoice.reference} (${formatInvoiceMonthYear(invoice.startingAt)})`}
                                    />
                                    <InvoiceTabsContent idInvoice={params.idInvoice} invoice={invoice} />
                                </>
                            )
                        }}
                    </DataWrapper>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
