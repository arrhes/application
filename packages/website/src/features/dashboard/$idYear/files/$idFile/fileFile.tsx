import { generateFileGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { FormatError } from "../../../../../components/formats/formatError.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function FileFile(props: { file: v.InferOutput<typeof returnedSchemas.file> }) {
    const fileSignedUrlResponse = useDataFromAPI({
        routeDefinition: generateFileGetSignedUrlRouteDefinition,
        body: {
            idFile: props.file.id,
            idYear: props.file.idYear,
        },
    })

    if (fileSignedUrlResponse.data === undefined) {
        if (fileSignedUrlResponse.isPending) {
            return <CircularLoader text="Récupération du fichier..." />
        }
        return <FormatError text="Impossible de récupérer le fichier." />
    }

    return (
        <embed
            title={props.file.reference ?? undefined}
            className={css({
                width: "100%",
                minH: "fit",
                height: "768px",
                maxH: "768px",
                border: "1px solid",
                borderColor: "neutral/20",
                borderRadius: "md",
                padding: "4",
            })}
            src={fileSignedUrlResponse.data.url}
            type={props.file.type ?? undefined}
        />
    )
}
