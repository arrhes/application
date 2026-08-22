import { deleteOneFileRouteDefinition } from "@comptasse/application-metadata/routes"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"

export async function deleteFile(parameters: { idFile: string }) {
    const deleteFromApiResponse = await getResponseBodyFromAPI({
        routeDefinition: deleteOneFileRouteDefinition,
        body: {
            idFile: parameters.idFile,
        },
    })

    return deleteFromApiResponse.ok
}
