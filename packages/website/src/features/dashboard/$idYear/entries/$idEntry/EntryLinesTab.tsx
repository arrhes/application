import type { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconEdit, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import type * as v from "valibot"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import type { YearDataKey } from "../../YearDataWrapper.tsx"
import { YearDataWrapper } from "../../YearDataWrapper.tsx"
import { CreateOneEntryLine } from "./CreateOneEntryLine.tsx"
import { EntryLinesTable } from "./EntryLinesTable.tsx"
import { UpdateManyEntryLines } from "./UpdateManyEntryLines.tsx"

const requiredKeys = [
    "entries",
    "entryLines",
    "accounts",
] as const satisfies readonly YearDataKey[]

export function EntryLinesTab(props: { idYear?: string; idEntry?: string } = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idYear?: string
        idEntry?: string
    }
    const idYear = props.idYear ?? params.idYear ?? ""
    const idEntry = props.idEntry ?? params.idEntry ?? ""

    return (
        <YearDataWrapper
            idYear={idYear}
            requiredKeys={requiredKeys}
        >
            {({ entries, entryLines: allEntryLines, accounts }) => {
                const entry = entries.find((r) => r.id === idEntry)
                if (entry === undefined) return null

                const entryLines = allEntryLines.filter((row) => row.idEntry === idEntry)
                const accountsMap = new Map(
                    accounts.map((account) => [
                        account.id,
                        account,
                    ]),
                )

                return (
                    <EntryLinesTabContent
                        entry={entry}
                        entryLines={entryLines}
                        accounts={accountsMap}
                    />
                )
            }}
        </YearDataWrapper>
    )
}

function EntryLinesTabContent(props: {
    entry: v.InferOutput<typeof returnedSchemas.entry>
    entryLines: v.InferOutput<typeof returnedSchemas.entryLine>[]
    accounts: Map<string, v.InferOutput<typeof readAllAccountsRouteDefinition.schemas.return>[number]>
}) {
    return (
        <Section.Item>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <CreateOneEntryLine entry={props.entry}>
                    <ButtonPlainContent
                        leftIcon={<IconPlus />}
                        text="Ajouter un mouvement"
                    />
                </CreateOneEntryLine>
                <UpdateManyEntryLines entry={props.entry}>
                    <ButtonOutlineContent
                        leftIcon={<IconEdit />}
                        text="Modifier plusieurs mouvements"
                    />
                </UpdateManyEntryLines>
            </div>
            <EntryLinesTable
                entry={props.entry}
                entryLines={props.entryLines}
                accounts={props.accounts}
            />
        </Section.Item>
    )
}
