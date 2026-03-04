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
import { recordRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/records/$idRecord/recordRoute.tsx"
import { compareAmounts } from "../../../../../utilities/compareAmounts.ts"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { CreateOneRecordRow } from "./createOneRecordRow.tsx"
import { DeleteOneRecord } from "./deleteOneRecord.tsx"
import { DuplicateOneRecord } from "./duplicateOneRecord.tsx"
import { RecordRowsTable } from "./recordRowsTable.tsx"
import { UpdateManyRecordRows } from "./updateManyRecordRows.tsx"
import { UpdateOneRecord } from "./updateOneRecord.tsx"

const requiredKeys = [
    "records",
    "recordRows",
    "accounts",
    "journals",
    "recordLabels",
    "files",
] as const satisfies readonly YearDataKey[]

export function RecordPage() {
    const [activeTab, setActiveTab] = useState<"informations" | "recordRows" | "metadata">("informations")
    const params = useParams({ from: recordRoute.id })

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ records, recordRows: allRecordRows, accounts, journals, recordLabels, files }) => {
                const record = records.find((r) => r.id === params.idRecord)

                if (record === undefined) {
                    return <FormatError text="Écriture introuvable." className={css({ padding: "1rem" })} />
                }

                const recordRows = allRecordRows.filter((row) => row.idRecord === params.idRecord)
                const accountsMap = new Map(accounts.map((account) => [account.id, account]))

                const journal =
                    record.idJournal !== null ? (journals.find((j) => j.id === record.idJournal) ?? null) : null
                const recordLabel =
                    record.idRecordLabel !== null
                        ? (recordLabels.find((rl) => rl.id === record.idRecordLabel) ?? null)
                        : null
                const file = record.idFile !== null ? (files.find((f) => f.id === record.idFile) ?? null) : null

                let totalDebit = 0
                let totalCredit = 0

                for (const recordRow of recordRows) {
                    totalDebit += Number(recordRow.debit)
                    totalCredit += Number(recordRow.credit)
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
                                            <UpdateOneRecord record={record}>
                                                <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                            </UpdateOneRecord>
                                            <DuplicateOneRecord record={record}>
                                                <ButtonOutlineContent leftIcon={<IconCopyCheck />} text="Dupliquer" />
                                            </DuplicateOneRecord>
                                            <DeleteOneRecord record={record}>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconTrash />}
                                                    title="Supprimer"
                                                    color="danger"
                                                />
                                            </DeleteOneRecord>
                                        </div>
                                    </div>
                                </Section.Item>
                                <Section.Item className={css({ padding: "0" })}>
                                    {record.idFile === null ? null : (
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
                                        <Button onClick={() => setActiveTab("recordRows")}>
                                            <ButtonGhostContent
                                                leftIcon={<IconList />}
                                                text="Mouvements"
                                                color="neutral"
                                                isCurrent={activeTab === "recordRows"}
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
                                                    <FormatText>{record.label}</FormatText>
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Date">
                                                    <FormatDate date={record.date} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Journal">
                                                    {record.idJournal === null ? (
                                                        <FormatNull />
                                                    ) : journal !== null ? (
                                                        <FormatText>{`(${journal.code}) ${journal.label}`}</FormatText>
                                                    ) : (
                                                        <FormatNull />
                                                    )}
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Catégorie">
                                                    {record.idRecordLabel === null ? (
                                                        <FormatNull />
                                                    ) : recordLabel !== null ? (
                                                        <FormatText>{recordLabel.label}</FormatText>
                                                    ) : (
                                                        <FormatNull />
                                                    )}
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Pièce justificative">
                                                    {record.idFile === null ? (
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
                                                    <FormatDateTime date={record.createdAt} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Modifiée le">
                                                    <FormatDateTime date={record.lastUpdatedAt} />
                                                </DataBlock.Item>
                                                <DataBlock.Item label="Id">
                                                    <FormatText>{record.id}</FormatText>
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
                                            <CreateOneRecordRow record={record}>
                                                <ButtonPlainContent
                                                    leftIcon={<IconPlus />}
                                                    text="Ajouter un mouvement"
                                                />
                                            </CreateOneRecordRow>
                                            <UpdateManyRecordRows record={record}>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconEdit />}
                                                    text="Modifier plusieurs mouvements"
                                                />
                                            </UpdateManyRecordRows>
                                        </div>
                                        <RecordRowsTable
                                            record={record}
                                            recordRows={recordRows}
                                            accounts={accountsMap}
                                        />
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
