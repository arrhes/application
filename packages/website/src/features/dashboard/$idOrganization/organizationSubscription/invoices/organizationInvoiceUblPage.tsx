import { readOneInvoiceUblRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationInvoiceUblRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationInvoiceUblRoute.js"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.js"
import { downloadPdfFromUblXml } from "../../../../facturation/generatePdfFromUblXml.js"
import { UblInvoiceViewer } from "../../../../facturation/ublInvoiceViewer.js"

export function OrganizationInvoiceUblPage() {
    const params = useParams({ from: organizationInvoiceUblRoute.id })
    const [isDownloadingPdf, setIsDownloadingPdf] = useState(false)

    const invoiceUbl = useDataFromAPI({
        routeDefinition: readOneInvoiceUblRouteDefinition,
        body: { idInvoice: params.idInvoice },
    })

    async function handleDownloadPdf() {
        if (!invoiceUbl.data) {
            return
        }

        setIsDownloadingPdf(true)
        try {
            downloadPdfFromUblXml({
                xmlContent: invoiceUbl.data.xml,
                fallbackFileName: invoiceUbl.data.invoiceNumber,
            })
        } finally {
            setIsDownloadingPdf(false)
        }
    }

    return (
        <Page.Root>
            <Page.Content>
                <SettingsSection.Root>
                    <SettingsSection.Header title="Facture XML" />

                    {invoiceUbl.isPending && <CircularLoader text="Chargement de la facture XML..." />}

                    {invoiceUbl.isError && (
                        <div
                            className={css({
                                border: "1px solid",
                                borderColor: "danger/30",
                                borderRadius: "md",
                                backgroundColor: "danger/5",
                                color: "danger",
                                padding: "0.75rem",
                                fontSize: "sm",
                            })}
                        >
                            Impossible de charger la facture XML.
                        </div>
                    )}

                    {invoiceUbl.data && (
                        <UblInvoiceViewer
                            xmlContent={invoiceUbl.data.xml}
                            downloadFileName={invoiceUbl.data.fileName}
                            title={`Facture ${invoiceUbl.data.invoiceNumber}`}
                            onDownloadPdf={handleDownloadPdf}
                            isDownloadingPdf={isDownloadingPdf}
                        />
                    )}
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
