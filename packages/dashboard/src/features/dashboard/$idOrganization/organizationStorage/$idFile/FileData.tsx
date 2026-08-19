import { readOneFileRouteDefinition } from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { CircularLoader, FormatError } from "@comptasse/ui"
import type { ReactElement } from "react"
import type * as v from "valibot"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function FileData(props: {
    idFile: v.InferOutput<typeof returnedSchemas.file>["id"]
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: (
        data: v.InferOutput<typeof readOneFileRouteDefinition.schemas.return>,
    ) => ReactElement | Array<ReactElement> | null
}) {
    const fileResponse = useDataFromAPI({
        routeDefinition: readOneFileRouteDefinition,
        body: {
            idFile: props.idFile,
        },
    })

    if (fileResponse.data === undefined) {
        if (fileResponse.isPending) {
            return <CircularLoader text="Récupération du fichier..." />
        }
        return <FormatError text="Impossible de récupérer le fichier." />
    }

    return props.children(fileResponse.data)
}
