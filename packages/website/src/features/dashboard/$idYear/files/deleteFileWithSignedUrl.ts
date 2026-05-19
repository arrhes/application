import {
    deleteOneFileRouteDefinition,
    generateFileDeleteSignedUrlRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"

export async function deleteFileWithSignedUrl(parameters: { idFile: string }) {
    const signedDeleteUrlResponse = await getResponseBodyFromAPI({
        routeDefinition: generateFileDeleteSignedUrlRouteDefinition,
        body: {
            idFile: parameters.idFile,
        },
    })

    if (signedDeleteUrlResponse.ok === false) {
        return false
    }

    const deleteFromStorageResponse = await fetch(signedDeleteUrlResponse.data.url, {
        method: "DELETE",
    })

    if (deleteFromStorageResponse.ok === false) {
        return false
    }

    const deleteFromApiResponse = await getResponseBodyFromAPI({
        routeDefinition: deleteOneFileRouteDefinition,
        body: {
            idFile: parameters.idFile,
        },
    })

    return deleteFromApiResponse.ok
}
