import { readOneFileRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { CircularLoader } from "@arrhes/ui"
import type { ReactElement } from "react"
import type * as v from "valibot"
import { FormatError } from "../../../../../components/formats/formatError.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function FileData(props: {
    idFile: v.InferOutput<typeof returnedSchemas.file>["id"]
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: (
        data: v.InferOutput<typeof readOneFileRouteDefinition.schemas.return>,
    ) => ReactElement | Array<ReactElement> | null
}) {
    const fileResponse = useDataFromAPI({
        routeDefinition: readOneFileRouteDefinition,
        body: {
            idFile: props.idFile,
            idYear: props.idYear,
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
