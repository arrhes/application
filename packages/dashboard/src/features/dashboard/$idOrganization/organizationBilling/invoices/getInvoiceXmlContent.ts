import { generateInvoiceGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"

export async function getInvoiceXmlContent(idInvoice: string) {
    const signedUrlResponse = await getResponseBodyFromAPI({
        routeDefinition: generateInvoiceGetSignedUrlRouteDefinition,
        body: {
            idInvoice,
        },
    })

    if (!signedUrlResponse.ok) {
        return {
            ok: false as const,
            xmlContent: null,
            errorMessage: "Erreur lors du chargement du document",
        }
    }

    const response = await fetch(signedUrlResponse.data.url, {
        method: "GET",
    })

    const xmlContent = await response.text()
    if (!response.ok) {
        return {
            ok: false as const,
            xmlContent: null,
            errorMessage: xmlContent || "Le XML n'est pas encore disponible",
        }
    }

    return {
        ok: true as const,
        xmlContent,
        errorMessage: null,
    }
}
