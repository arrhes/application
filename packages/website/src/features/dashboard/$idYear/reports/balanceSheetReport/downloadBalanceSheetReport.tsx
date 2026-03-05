import {
    generateBalanceSheetReportDocumentRouteDefinition,
    generateDocumentGetSignedUrlRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { type ButtonHTMLAttributes, cloneElement, type ReactElement } from "react"
import type * as v from "valibot"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"

export function DownloadBalanceSheetReport(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>
}) {
    return cloneElement(props.children, {
        onClick: async () => {
            const generateBalanceSheetReportDocumentResponse = await getResponseBodyFromAPI({
                routeDefinition: generateBalanceSheetReportDocumentRouteDefinition,
                body: {
                    idYear: props.idYear,
                },
            })
            if (generateBalanceSheetReportDocumentResponse.ok === false) {
                toast({ title: "Impossible de générer le document", variant: "error" })
                return
            }

            const downloadBalanceSheetReportDocumentResponse = await getResponseBodyFromAPI({
                routeDefinition: generateDocumentGetSignedUrlRouteDefinition,
                body: {
                    idYear: props.idYear,
                    idDocument: generateBalanceSheetReportDocumentResponse.data.id,
                },
            })
            if (downloadBalanceSheetReportDocumentResponse.ok === false) {
                toast({ title: "Impossible de télécharger le document", variant: "error" })
                return
            }

            const url = downloadBalanceSheetReportDocumentResponse.data.url
            const link = document.createElement("a")
            link.href = url
            link.target = "_blank"
            link.download = `${generateBalanceSheetReportDocumentResponse.data.label}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
    })
}
