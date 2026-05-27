import { useParams } from "@tanstack/react-router"
import type { YearDataKey } from "../../YearDataWrapper.js"
import { YearDataWrapper } from "../../YearDataWrapper.js"
import { EntryInformationsTab } from "./EntryInformationsTab.js"

const routeRequiredKeys = [
    "entries",
    "entryLines",
    "entryTags",
    "journals",
    "tags",
    "files",
] as const satisfies readonly YearDataKey[]

// Used by TanStack Router as a standalone route component — resolves data itself via YearDataWrapper.
export function EntryRoutePage() {
    const params = useParams({
        strict: false,
    }) as {
        idYear?: string
        idEntry?: string
    }
    const idYear = params.idYear ?? ""
    const idEntry = params.idEntry ?? ""

    return (
        <YearDataWrapper
            idYear={idYear}
            requiredKeys={routeRequiredKeys}
        >
            {({ entries, entryLines: allEntryLines, entryTags, journals, tags, files }) => {
                const entry = entries.find((r) => r.id === idEntry)
                if (entry === undefined) return null

                const entryLines = allEntryLines.filter((row) => row.idEntry === idEntry)
                const journal =
                    entry.idJournal !== null ? (journals.find((j) => j.id === entry.idJournal) ?? null) : null
                const entryTagIds = entryTags.filter((et) => et.idEntry === entry.id).map((et) => et.idTag)
                const entryTagLabels = entryTagIds
                    .map((id) => tags.find((t) => t.id === id))
                    .filter((t): t is NonNullable<typeof t> => Boolean(t))
                    .map((t) => t.label)
                const file = entry.idFile !== null ? (files.find((f) => f.id === entry.idFile) ?? null) : null

                let totalDebit = 0
                let totalCredit = 0
                for (const entryLine of entryLines) {
                    totalDebit += Number(entryLine.debit)
                    totalCredit += Number(entryLine.credit)
                }

                return (
                    <EntryInformationsTab
                        entry={entry}
                        journal={journal}
                        entryTagLabels={entryTagLabels}
                        file={file}
                        totalDebit={totalDebit}
                        totalCredit={totalCredit}
                    />
                )
            }}
        </YearDataWrapper>
    )
}
