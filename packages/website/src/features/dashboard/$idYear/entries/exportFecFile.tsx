import {
    readAllAccountsRouteDefinition,
    type readAllEntriesRouteDefinition,
    type readAllEntryLinesRouteDefinition,
    readAllJournalsRouteDefinition,
    readOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonPlainContent, LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFileExport } from "@tabler/icons-react"
import { useEffect, useMemo, useState } from "react"
import type * as v from "valibot"
import { Banner } from "../../../../components/layouts/banner.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { Drawer } from "../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"

/**
 * Format a date string as YYYYMMDD for FEC compliance.
 */
function formatFecDate(rawDate: string | Date): string {
    const date = new Date(rawDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}${month}${day}`
}

/**
 * Format a numeric amount for FEC: comma as decimal separator, no thousands separator, 2 decimals.
 * e.g. 1234.5 -> "1234,50"
 */
function formatFecAmount(value: number | string): string {
    const num = Number(value)
    const abs = Math.abs(num) < 0.009 ? 0 : num
    return abs.toFixed(2).replace(".", ",")
}

const FEC_HEADERS = [
    "JournalCode",
    "JournalLib",
    "EcritureNum",
    "EcritureDate",
    "CompteNum",
    "CompteLib",
    "CompAuxNum",
    "CompAuxLib",
    "PieceRef",
    "PieceDate",
    "EcritureLib",
    "Debit",
    "Credit",
    "EcritureLet",
    "DateLet",
    "ValidDate",
    "Montantdevise",
    "Idevise",
] as const

export function ExportFecFile(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    entries: v.InferOutput<typeof readAllEntriesRouteDefinition.schemas.return>
    entryLines: v.InferOutput<typeof readAllEntryLinesRouteDefinition.schemas.return>
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const [siren, setSiren] = useState<string | null>(null)

    useEffect(() => {
        if (!props.open) return
        getResponseBodyFromAPI({
            routeDefinition: readOneOrganizationRouteDefinition,
            body: {},
        }).then((response) => {
            if (response.ok) {
                setSiren(response.data.siren ?? "")
            }
        })
    }, [props.open])

    const entriesMap = useMemo(() => {
        return new Map(props.entries.map((r) => [r.id, r]))
    }, [props.entries])

    async function handleExport() {
        if (props.entryLines.length === 0) {
            toast({ title: "Aucun mouvement à exporter", variant: "warning" })
            return
        }

        const [accountsResponse, journalsResponse] = await Promise.all([
            getResponseBodyFromAPI({
                routeDefinition: readAllAccountsRouteDefinition,
                body: { idYear: props.idYear },
            }),
            getResponseBodyFromAPI({
                routeDefinition: readAllJournalsRouteDefinition,
                body: { idYear: props.idYear },
            }),
        ])

        if (!accountsResponse.ok || !journalsResponse.ok) {
            toast({ title: "Impossible de charger les données", variant: "error" })
            return
        }

        const accountsMap = new Map(accountsResponse.data.map((a) => [a.id, { number: a.number, label: a.label }]))
        const journalsMap = new Map(journalsResponse.data.map((j) => [j.id, { code: j.code, label: j.label }]))

        // Build a sequential EcritureNum per entry, sorted by date then id
        const sortedEntries = [...props.entries].sort((a, b) => {
            const dateCompare = a.date.localeCompare(b.date)
            if (dateCompare !== 0) return dateCompare
            return a.id.localeCompare(b.id)
        })
        const ecritureNumMap = new Map<string, string>()
        for (let i = 0; i < sortedEntries.length; i++) {
            ecritureNumMap.set(sortedEntries[i].id, String(i + 1))
        }

        // Build rows sorted by entry date, then EcritureNum, then row order
        const sortedRows = [...props.entryLines].sort((a, b) => {
            const entryA = entriesMap.get(a.idEntry)
            const entryB = entriesMap.get(b.idEntry)
            if (!entryA || !entryB) return 0
            const dateCompare = entryA.date.localeCompare(entryB.date)
            if (dateCompare !== 0) return dateCompare
            const numCompare = (ecritureNumMap.get(a.idEntry) ?? "").localeCompare(
                ecritureNumMap.get(b.idEntry) ?? "",
                undefined,
                { numeric: true },
            )
            if (numCompare !== 0) return numCompare
            return a.id.localeCompare(b.id)
        })

        const rows = sortedRows
            .map((row) => {
                const entry = entriesMap.get(row.idEntry)
                if (!entry) return null

                const account = accountsMap.get(row.idAccount)
                const journal = entry.idJournal ? journalsMap.get(entry.idJournal) : null

                const ecritureDate = formatFecDate(entry.date)
                const pieceDate = formatFecDate(entry.date)
                const validDate = formatFecDate(entry.createdAt)

                return [
                    journal?.code ?? "",
                    journal?.label ?? "",
                    ecritureNumMap.get(entry.id) ?? "",
                    ecritureDate,
                    account?.number ?? "",
                    account?.label ?? "",
                    "", // CompAuxNum - not supported
                    "", // CompAuxLib - not supported
                    entry.label, // PieceRef
                    pieceDate,
                    row.label ?? entry.label, // EcritureLib
                    formatFecAmount(row.debit),
                    formatFecAmount(row.credit),
                    "", // EcritureLet - not supported
                    "", // DateLet - not supported
                    validDate,
                    "", // Montantdevise
                    "", // Idevise
                ].join("\t")
            })
            .filter((row) => row !== null)

        const fecContent = [FEC_HEADERS.join("\t"), ...rows].join("\n")

        const BOM = "\uFEFF"
        const blob = new Blob([BOM + fecContent], { type: "text/plain;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${siren ?? ""}FEC${formatFecDate(new Date())}.txt`
        link.click()
        URL.revokeObjectURL(url)

        toast({ title: `${sortedRows.length} mouvements exportés au format FEC`, variant: "success" })
        props.onOpenChange(false)
    }

    return (
        <Drawer.Root open={props.open} onOpenChange={props.onOpenChange}>
            <Drawer.Content>
                <Drawer.Header title="Exporter au format FEC" />
                <Drawer.Body>
                    <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
                        <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "relaxed" })}>
                            Le Fichier des Écritures Comptables (FEC) est un export normé de toutes les écritures de
                            l'exercice, au format requis par l'administration fiscale.
                        </p>
                        {siren === "" && (
                            <Banner variant="warning">
                                Le numéro SIREN de l'organisation n'est pas renseigné. Le nom du fichier FEC ne sera pas
                                conforme. Vous pouvez l'ajouter dans les{" "}
                                <LinkButton
                                    to="/dashboard/organisations/$idOrganization/paramètres"
                                    params={{ idOrganization: props.idOrganization }}
                                    onClick={() => props.onOpenChange(false)}
                                >
                                    <LinkContent className={css({ color: "warning" })}>
                                        paramètres de l'organisation
                                    </LinkContent>
                                </LinkButton>
                                .
                            </Banner>
                        )}
                        <p className={css({ fontSize: "sm", color: "neutral/50" })}>
                            {props.entries.length} écriture{props.entries.length > 1 ? "s" : ""} —{" "}
                            {props.entryLines.length} mouvement{props.entryLines.length > 1 ? "s" : ""}
                        </p>
                        <Button hasLoader onClick={handleExport}>
                            <ButtonPlainContent leftIcon={<IconFileExport />} text="Exporter le FEC" />
                        </Button>
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
