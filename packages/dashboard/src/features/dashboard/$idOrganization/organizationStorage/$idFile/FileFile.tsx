import { generateFileGetSignedUrlRouteDefinition } from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { CircularLoader, FormatError } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { useQuery } from "@tanstack/react-query"
import type * as v from "valibot"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

function useMarkdownContent(url: string | undefined, enabled: boolean) {
    return useQuery({
        queryKey: [
            "markdown-content",
            url,
        ],
        queryFn: async ({ signal }) => {
            if (!url) throw new Error("Missing markdown URL")
            const response = await fetch(url, { signal })
            if (!response.ok) {
                throw new Error("Impossible de récupérer le fichier markdown")
            }
            const bytes = await response.arrayBuffer()
            return new TextDecoder("utf-8").decode(bytes)
        },
        enabled: enabled && url !== undefined,
    })
}

export function FileFile(props: { file: v.InferOutput<typeof returnedSchemas.file> }) {
    const fileSignedUrlResponse = useDataFromAPI({
        routeDefinition: generateFileGetSignedUrlRouteDefinition,
        body: {
            idFile: props.file.id,
        },
    })

    const isMarkdownFile = props.file.type?.startsWith("text/markdown") ?? false
    const markdownQuery = useMarkdownContent(
        fileSignedUrlResponse.data?.url,
        isMarkdownFile,
    )

    if (fileSignedUrlResponse.data === undefined) {
        if (fileSignedUrlResponse.isPending) {
            return <CircularLoader text="Récupération du fichier..." />
        }
        return <FormatError text="Impossible de récupérer le fichier." />
    }

    if (isMarkdownFile) {
        if (markdownQuery.isPending) {
            return <CircularLoader text="Affichage du markdown..." />
        }

        if (markdownQuery.isError) {
            return <FormatError text="Impossible d'afficher le contenu markdown." />
        }

        return (
            <pre
                className={css({
                    width: "100%",
                    minH: "fit",
                    height: "768px",
                    maxH: "768px",
                    border: "1px solid",
                    borderColor: "neutral/20",
                    borderRadius: "md",
                    padding: "4",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    lineHeight: "1.5",
                    color: "neutral",
                })}
            >
                {markdownQuery.data ?? ""}
            </pre>
        )
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
