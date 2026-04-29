import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    generateInvoiceGetSignedUrlRouteDefinition
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, toast } from "@arrhes/ui"
import { IconDownload } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"



export function DownloadInvoiceButton(props: {
    invoice: v.InferOutput<typeof returnedSchemas.invoice>
}) {
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
        <Button
            onClick={handleDownload}
            isDisabled={isDownloading || (props.invoice.storageKey === null)}
        >
            <ButtonOutlineContent
                leftIcon={<IconDownload />}
                text={props.invoice.storageKey ? "Télécharger" : "PDF indisponible"}
                isDisabled={isDownloading || (props.invoice.storageKey === null)}
            />
        </Button>
    )
}
