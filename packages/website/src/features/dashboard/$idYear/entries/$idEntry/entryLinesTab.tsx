import type { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconEdit, IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import type * as v from "valibot"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { entryLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/entries/$idEntry/entryLayoutRoute.tsx"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { CreateOneEntryLine } from "./createOneEntryLine.tsx"
import { EntryLinesTable } from "./entryLinesTable.tsx"
import { UpdateManyEntryLines } from "./updateManyEntryLines.tsx"

const requiredKeys = [
    "entries",
    "entryLines",
    "accounts",
] as const satisfies readonly YearDataKey[]

export function EntryLinesTab() {
    const params = useParams({
        from: entryLayoutRoute.id,
    })

    return (
        <YearDataWrapper
            idYear={params.idYear}
            requiredKeys={requiredKeys}
        >
            {({ entries, entryLines: allEntryLines, accounts }) => {
                const entry = entries.find((r) => r.id === params.idEntry)
                if (entry === undefined) return null

                const entryLines = allEntryLines.filter((row) => row.idEntry === params.idEntry)
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
