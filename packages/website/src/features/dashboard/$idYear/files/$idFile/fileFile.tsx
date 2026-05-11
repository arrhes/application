import { generateFileGetSignedUrlRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { CircularLoader, FormatError } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useEffect, useState } from "react"
import type * as v from "valibot"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"

export function FileFile(props: { file: v.InferOutput<typeof returnedSchemas.file> }) {
    const [markdownContent, setMarkdownContent] = useState<string | null>(null)
    const [markdownLoading, setMarkdownLoading] = useState(false)
    const [markdownError, setMarkdownError] = useState<string | null>(null)
    const fileSignedUrlResponse = useDataFromAPI({
        routeDefinition: generateFileGetSignedUrlRouteDefinition,
        body: {
            idFile: props.file.id,
            idYear: props.file.idYear,
        },
    })

    const isMarkdownFile = props.file.type?.startsWith("text/markdown") ?? false

    useEffect(() => {
        if (!isMarkdownFile || !fileSignedUrlResponse.data?.url) {
            return
        }

        let canceled = false

        async function loadMarkdown() {
            setMarkdownLoading(true)
            setMarkdownError(null)

            try {
                const response = await fetch(fileSignedUrlResponse.data!.url)
                if (!response.ok) {
                    throw new Error("Impossible de récupérer le fichier markdown")
                }

                const bytes = await response.arrayBuffer()
                const text = new TextDecoder("utf-8").decode(bytes)
                if (!canceled) {
                    setMarkdownContent(text)
                }
            } catch {
                if (!canceled) {
                    setMarkdownError("Impossible d'afficher le contenu markdown.")
                }
            } finally {
                if (!canceled) {
                    setMarkdownLoading(false)
                }
            }
        }

        void loadMarkdown()

        return () => {
            canceled = true
        }
    }, [
        isMarkdownFile,
        fileSignedUrlResponse.data?.url,
    ])

    if (fileSignedUrlResponse.data === undefined) {
        if (fileSignedUrlResponse.isPending) {
            return <CircularLoader text="Récupération du fichier..." />
        }
        return <FormatError text="Impossible de récupérer le fichier." />
    }

    if (isMarkdownFile) {
        if (markdownLoading) {
            return <CircularLoader text="Affichage du markdown..." />
        }

        if (markdownError) {
            return <FormatError text={markdownError} />
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
                {markdownContent ?? ""}
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
