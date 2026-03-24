import { Button, ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconChevronLeft,
    IconCopyCheck,
    IconDatabase,
    IconEdit,
    IconInfoCircle,
    IconList,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatDate } from "../../../../../components/formats/formatDate.tsx"
import { FormatDateTime } from "../../../../../components/formats/formatDateTime.tsx"
import { FormatError } from "../../../../../components/formats/formatError.tsx"
import { FormatNull } from "../../../../../components/formats/formatNull.tsx"
import { FormatPrice, formatPrice } from "../../../../../components/formats/formatPrice.tsx"
import { FormatText } from "../../../../../components/formats/formatText.tsx"
import { Banner } from "../../../../../components/layouts/banner.tsx"
import { DataBlock } from "../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../components/linkButton.js"
import { entryRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/entries/$idEntry/entryRoute.tsx"
import { compareAmounts } from "../../../../../utilities/compareAmounts.ts"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { CreateOneEntryLine } from "./createOneEntryLine.tsx"
import { DeleteOneEntry } from "./deleteOneEntry.tsx"
import { DuplicateOneEntry } from "./duplicateOneEntry.tsx"
import { EntryLinesTable } from "./entryLinesTable.tsx"
import { UpdateManyEntryLines } from "./updateManyEntryLines.tsx"
import { UpdateOneEntry } from "./updateOneEntry.tsx"

const requiredKeys = [
    "entries",
    "entryLines",
    "entryTags",
    "accounts",
    "journals",
    "tags",
    "files",
] as const satisfies readonly YearDataKey[]

export function EntryPage() {
    const [activeTab, setActiveTab] = useState<"informations" | "entryLines" | "metadata">("informations")
    const params = useParams({ from: entryRoute.id })

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ entries, entryLines: allEntryLines, entryTags, accounts, journals, tags, files }) => {
                const entry = entries.find((r) => r.id === params.idEntry)

                if (entry === undefined) {
                    return <FormatError text="Écriture introuvable." className={css({ padding: "1rem" })} />
                }

                const entryLines = allEntryLines.filter((row) => row.idEntry === params.idEntry)
                const accountsMap = new Map(accounts.map((account) => [account.id, account]))

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
                    <Page.Root>
                        <Page.Content>
                            <Section.Root>
                                <Section.Item>
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            gap: "0.5rem",
                                        })}
                                    >
                                        <LinkButton
                                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures"
                                            params={{
                                                idOrganization: params.idOrganization,
                                                idYear: params.idYear,
                                            }}
                                        >
                                            <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                                        </LinkButton>
                                        <div
                                            className={css({
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            })}
                                        >
                                            <UpdateOneEntry entry={entry}>
                                                <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                            </UpdateOneEntry>
                                            <DuplicateOneEntry entry={entry}>
                                                <ButtonOutlineContent leftIcon={<IconCopyCheck />} text="Dupliquer" />
                                            </DuplicateOneEntry>
                                            <DeleteOneEntry entry={entry}>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconTrash />}
                                                    title="Supprimer"
                                                    color="danger"
                                                />
                                            </DeleteOneEntry>
                                        </div>
                                    </div>
                                </Section.Item>
                                <Section.Item className={css({ padding: "0" })}>
                                    {entry.idFile === null ? null : (
                                        <Banner variant="error">Il manque une pièce justificative.</Banner>
                                    )}
                                    {compareAmounts({
                                        a: totalDebit,
                                        b: totalCredit,
                                    }) ? null : (
                                        <Banner variant="error">
                                            Les montants au débit et au crédit sont différents, veuillez corriger pour
                                            pouvoir valider. ({formatPrice({ price: totalDebit - totalCredit })})
                                        </Banner>
                                    )}
                                </Section.Item>
                                <Section.Item>
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: "0.5rem",
                                            borderBottom: "1px solid",
                                            borderBottomColor: "neutral/5",
                                            paddingBottom: "0.5rem",
                                        })}
                                    >
                                        <Button onClick={() => setActiveTab("informations")}>
                                            <ButtonGhostContent
                                                leftIcon={<IconInfoCircle />}
                                                text="Informations"
                                                color="neutral"
                                                isCurrent={activeTab === "informations"}
                                            />
                                        </Button>
                                        <Button onClick={() => setActiveTab("entryLines")}>
                                            <ButtonGhostContent
                                                leftIcon={<IconList />}
                                                text="Mouvements"
                                                color="neutral"
                                                isCurrent={activeTab === "entryLines"}
                                            />
                                        </Button>
                                        <Button onClick={() => setActiveTab("metadata")}>
                                            <ButtonGhostContent
                                                leftIcon={<IconDatabase />}
                                                text="Métadonnées"
                                                color="neutral"
                                                isCurrent={activeTab === "metadata"}
                                            />
                                        </Button>
                                    </div>
                                </Section.Item>
                                {activeTab === "informations" ? (
                                    <Section.Item className={css({ flexDirection: "column" })}>
                                        <DataBlock.Root>
                                            <DataBlock.Header title="Informations" />
                                            <DataBlock.Content>
                                                <DataBlock.Item label="Libellé">
                                                    <FormatText>{entry.label}</FormatText>
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Date">
                                                    <FormatDate date={entry.date} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Journal">
                                                    {entry.idJournal === null ? (
                                                        <FormatNull />
                                                    ) : journal !== null ? (
                                                        <FormatText>{`(${journal.code}) ${journal.label}`}</FormatText>
                                                    ) : (
                                                        <FormatNull />
                                                    )}
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Catégorie">
                                                    {entryTagLabels.length === 0 ? (
                                                        <FormatNull />
                                                    ) : (
                                                        <FormatText>{entryTagLabels.join(", ")}</FormatText>
                                                    )}
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Pièce justificative">
                                                    {entry.idFile === null ? (
                                                        <FormatNull />
                                                    ) : file !== null ? (
                                                        <FormatText>{file.reference}</FormatText>
                                                    ) : (
                                                        <FormatNull />
                                                    )}
                                                </DataBlock.Item>
                                            </DataBlock.Content>
                                        </DataBlock.Root>
                                        <DataBlock.Root>
                                            <DataBlock.Header title="Détail" />
                                            <DataBlock.Content>
                                                <DataBlock.Item label="Total débit">
                                                    <FormatPrice price={totalDebit} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Total crédit">
                                                    <FormatPrice price={totalCredit} />
                                                </DataBlock.Item>
                                            </DataBlock.Content>
                                        </DataBlock.Root>
                                    </Section.Item>
                                ) : activeTab === "metadata" ? (
                                    <Section.Item className={css({ flexDirection: "column" })}>
                                        <DataBlock.Root>
                                            <DataBlock.Header title="Métadonnées" />
                                            <DataBlock.Content>
                                                <DataBlock.Item label="Ajoutée le">
                                                    <FormatDateTime date={entry.createdAt} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Modifiée le">
                                                    <FormatDateTime date={entry.lastUpdatedAt} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Id">
                                                    <FormatText>{entry.id}</FormatText>
                                                </DataBlock.Item>
                                            </DataBlock.Content>
                                        </DataBlock.Root>
                                    </Section.Item>
                                ) : (
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
                                            <CreateOneEntryLine entry={entry}>
                                                <ButtonPlainContent
                                                    leftIcon={<IconPlus />}
                                                    text="Ajouter un mouvement"
                                                />
                                            </CreateOneEntryLine>
                                            <UpdateManyEntryLines entry={entry}>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconEdit />}
                                                    text="Modifier plusieurs mouvements"
                                                />
                                            </UpdateManyEntryLines>
                                        </div>
                                        <EntryLinesTable entry={entry} entryLines={entryLines} accounts={accountsMap} />
                                    </Section.Item>
                                )}
                            </Section.Root>
                        </Page.Content>
                    </Page.Root>
                )
            }}
        </YearDataWrapper>
    )
}
