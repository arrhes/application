import type { returnedSchemas } from "@arrhes/application-metadata"
import { readOneInvoiceUblRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, type ButtonContentProps, toast } from "@arrhes/ui"
import { cloneElement, type ReactElement, useState } from "react"
import type * as v from "valibot"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { downloadPdfFromUblXml } from "../../../../facturation/generatePdfFromUblXml.js"

export function DownloadInvoiceAsPDFButton(props: {
    invoice: v.InferOutput<typeof returnedSchemas.invoice>
    children: ReactElement<ButtonContentProps>
}) {
    const [isDownloading, setIsDownloading] = useState(false)

    async function handleDownload() {
        if (!props.invoice.storageKey) {
            toast({ title: "La facture n'est pas encore disponible", variant: "error" })
            return
        }

        setIsDownloading(true)

        const res = await getResponseBodyFromAPI({
            routeDefinition: readOneInvoiceUblRouteDefinition,
            body: { idInvoice: props.invoice.id },
        })
        setIsDownloading(false)

        if (!res.ok) {
            toast({ title: "Erreur lors du chargement du document", variant: "error" })
            return
        }

        downloadPdfFromUblXml({
            xmlContent: res.data.xml,
            fallbackFileName: res.data.invoiceNumber,
        })
    }

    return (
        <Button onClick={handleDownload} isDisabled={isDownloading || props.invoice.storageKey === null}>
            {cloneElement(props.children, {
                isDisabled: isDownloading || props.invoice.storageKey === null,
            })}
        </Button>
    )
}
