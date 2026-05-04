import type { returnedSchemas } from "@arrhes/application-metadata"
import { Button, type ButtonContentProps, toast } from "@arrhes/ui"
import { cloneElement, type ReactElement, useState } from "react"
import type * as v from "valibot"
import { downloadPdfFromUblXml } from "../../../../facturation/generatePdfFromUblXml.js"
import { getInvoiceXmlContent } from "./getInvoiceXmlContent.ts"

export function DownloadInvoiceAsPDFButton(props: {
    invoice: v.InferOutput<typeof returnedSchemas.invoice>
    children: ReactElement<ButtonContentProps>
}) {
    const [isDownloading, setIsDownloading] = useState(false)

    async function handleDownload() {
        if (!props.invoice.xmlStorageKey) {
            toast({ title: "La facture n'est pas encore disponible", variant: "error" })
            return
        }

        setIsDownloading(true)
        const res = await getInvoiceXmlContent(props.invoice.id)
        setIsDownloading(false)

        if (!res.ok) {
            toast({ title: res.errorMessage, variant: "error" })
            return
        }

        downloadPdfFromUblXml({
            xmlContent: res.xmlContent,
            fallbackFileName: props.invoice.reference,
        })
    }

    return (
        <Button onClick={handleDownload} isDisabled={isDownloading || props.invoice.xmlStorageKey === null}>
            {cloneElement(props.children, {
                isDisabled: isDownloading || props.invoice.xmlStorageKey === null,
            })}
        </Button>
    )
}
