import type { returnedSchemas } from "@arrhes/application-metadata"
import { Button, type ButtonContentProps, toast } from "@arrhes/ui"
import { cloneElement, type ReactElement, useState } from "react"
import type * as v from "valibot"
import { getInvoiceXmlContent } from "./getInvoiceXmlContent.ts"

export function DownloadInvoiceAsXMLButton(props: {
    invoice: v.InferOutput<typeof returnedSchemas.invoice>
    children: ReactElement<ButtonContentProps>
    className?: string
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

        const xmlContent = res.xmlContent
        const fallbackFileName = props.invoice.reference

        const blob = new Blob([xmlContent], { type: "application/xml;charset=utf-8" })
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = objectUrl
        link.download = `${fallbackFileName}.xml`
        document.body.append(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(objectUrl)
    }

    return (
        <Button
            onClick={handleDownload}
            isDisabled={isDownloading || props.invoice.xmlStorageKey === null}
            className={props.className}
        >
            {cloneElement(props.children, {
                isDisabled: isDownloading || props.invoice.xmlStorageKey === null,
            })}
        </Button>
    )
}
