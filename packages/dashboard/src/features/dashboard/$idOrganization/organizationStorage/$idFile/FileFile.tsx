import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { CircularLoader, FormatError } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { useQuery } from "@tanstack/react-query"
import type * as v from "valibot"
import { getCookie } from "../../../../../utilities/cookies/getCookie.js"
import { resolveApiBaseUrl } from "../../../../../utilities/resolveApiBaseUrl.js"
import { cookiePrefix } from "../../../../../utilities/variables.js"

export function FileFile(props: { file: v.InferOutput<typeof returnedSchemas.file> }) {
    const apiBaseUrl = resolveApiBaseUrl(import.meta.env.VITE_API_BASE_URL)
    const orgId = getCookie(`${cookiePrefix}_id_organization`) ?? props.file.idOrganization

    const downloadUrl = apiBaseUrl
        ? `${apiBaseUrl}/organizations/${orgId}/years/:idYear/files/${props.file.id}/content`
        : undefined

    const isMarkdownFile = props.file.type?.startsWith("text/markdown") ?? false

    const contentQuery = useQuery({
        queryKey: ["file-content", props.file.id, isMarkdownFile],
        queryFn: async ({ signal }) => {
            if (!downloadUrl) throw new Error("API_BASE_URL is not defined")
            const response = await fetch(downloadUrl, {
                signal,
                credentials: "include",
                headers: {
                    "X-Organization-Id": orgId,
                },
            })
            if (!response.ok) {
                throw new Error("Impossible de récupérer le fichier")
            }
            const bytes = await response.arrayBuffer()
            return new TextDecoder("utf-8").decode(bytes)
        },
        enabled: apiBaseUrl !== undefined && isMarkdownFile && props.file.storageKey !== null,
        staleTime: Infinity,
    })

    if (props.file.storageKey === null) {
        return <FormatError text="Ce fichier n'a pas de contenu associé." />
    }

    if (isMarkdownFile) {
        if (contentQuery.isPending) {
            return <CircularLoader text="Affichage du markdown..." />
        }
        if (contentQuery.isError) {
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
                {contentQuery.data ?? ""}
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
            src={downloadUrl}
            type={props.file.type ?? undefined}
        />
    )
}
