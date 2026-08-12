import {
    generateFecRouteDefinition,
    type readAllEntriesRouteDefinition,
    type readAllEntryLinesRouteDefinition,
} from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { Button, ButtonPlainContent, toast } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconFileExport } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { useRightPanel } from "../../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"

export function ExportFecFile(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    entries: v.InferOutput<typeof readAllEntriesRouteDefinition.schemas.return>
    entryLines: v.InferOutput<typeof readAllEntryLinesRouteDefinition.schemas.return>
}) {
    const { closePanel } = useRightPanel()
    async function handleExport() {
        if (props.entryLines.length === 0) {
            toast({
                title: "Aucun mouvement à exporter",
                variant: "warning",
            })
            return
        }

        const result = await getResponseBodyFromAPI({
            routeDefinition: generateFecRouteDefinition,
            body: {
                idYear: props.idYear,
            },
        })

        if (!result.ok) {
            toast({
                title: "Erreur lors de la génération du FEC",
                variant: "error",
            })
            return
        }

        const link = document.createElement("a")
        link.href = result.data.url
        link.click()

        toast({
            title: `${props.entryLines.length} mouvement${props.entryLines.length > 1 ? "s" : ""} exporté${props.entryLines.length > 1 ? "s" : ""} au format FEC`,
            variant: "success",
        })
        closePanel()
    }

    return (
        <Fragment>
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/70",
                    lineHeight: "relaxed",
                })}
            >
                Le Fichier des Écritures Comptables (FEC) est un export normé de toutes les écritures de l'exercice, au
                format requis par l'administration fiscale.
            </p>
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/70",
                    lineHeight: "relaxed",
                })}
            >
                Nous avons créé également un outil de validation de conformité du FEC, disponible gratuitement en ligne
                sur{" "}
                <a
                    href="https://fec.comptasse.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                        color: "primary",
                        fontWeight: "medium",
                        textDecoration: "underline",
                        textDecorationColor: "primary/30",
                        textUnderlineOffset: "2px",
                        _hover: {
                            textDecorationColor: "primary",
                        },
                        transition: "all 0.15s",
                    })}
                >
                    fec.comptasse.com
                </a>
                .
            </p>
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/50",
                })}
            >
                {props.entries.length} écriture{props.entries.length > 1 ? "s" : ""} - {props.entryLines.length}{" "}
                mouvement{props.entryLines.length > 1 ? "s" : ""}
            </p>
            <Button
                hasLoader
                onClick={handleExport}
            >
                <ButtonPlainContent
                    leftIcon={<IconFileExport />}
                    text="Exporter le FEC"
                />
            </Button>
        </Fragment>
    )
}
