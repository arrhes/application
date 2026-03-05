import { readOneJournalRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatDateTime } from "../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../components/layouts/dataWrapper.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../components/linkButton.tsx"

import { journalRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/journals/$idJournal/journalRoute.tsx"
import { DeleteOneJournal } from "./deleteOneJournal.tsx"
import { UpdateOneJournal } from "./updateOneJournal.tsx"

export function JournalPage() {
    const [activeTab, setActiveTab] = useState<"informations" | "metadata">("informations")
    const params = useParams({ from: journalRoute.id })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneJournalRouteDefinition}
                body={{
                    idYear: params.idYear,
                    idJournal: params.idJournal,
                }}
            >
                {(journal) => {
                    return (
                        <>
                            <Section.Item className={css({ flexDirection: "row" })}>
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <LinkButton
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/journaux"
                                        params={{
                                            idOrganization: journal.idOrganization,
                                            idYear: journal.idYear,
                                        }}
                                    >
                                        <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                                    </LinkButton>
                                </div>
                                <div
                                    className={css({
                                        ml: "auto",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <UpdateOneJournal journal={journal}>
                                        <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneJournal>
                                    <DeleteOneJournal journal={journal}>
                                        <ButtonOutlineContent
                                            leftIcon={<IconTrash />}
                                            title="Supprimer"
                                            color="danger"
                                        />
                                    </DeleteOneJournal>
                                </div>
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
                                    <button type="button" onClick={() => setActiveTab("informations")}>
                                        <ButtonGhostContent
                                            leftIcon={<IconInfoCircle />}
                                            text="Informations"
                                            color="neutral"
                                            isCurrent={activeTab === "informations"}
                                        />
                                    </button>
                                    <button type="button" onClick={() => setActiveTab("metadata")}>
                                        <ButtonGhostContent
                                            leftIcon={<IconDatabase />}
                                            text="Métadonnées"
                                            color="neutral"
                                            isCurrent={activeTab === "metadata"}
                                        />
                                    </button>
                                </div>
                            </Section.Item>
                            {activeTab === "informations" ? (
                                <Section.Item className={css({ flexDirection: "column" })}>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Informations" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Code">
                                                <FormatText>{journal.code}</FormatText>
                                            </DataBlock.Item>
                                            <DataBlock.Item label="Libellé">
                                                <FormatText>{journal.label}</FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            ) : (
                                <Section.Item>
                                    <DataBlock.Root>
                                        <DataBlock.Header title="Métadonnées" />
                                        <DataBlock.Content>
                                            <DataBlock.Item label="Ajouté le">
                                                <FormatDateTime date={journal.createdAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Ajouté par">
                                                        {!journal.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={journal.data.createdBy} />}
                                                    </DataBlock.Item> */}
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={journal.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Modifié par">
                                                        {!journal.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={journal.data.lastUpdatedBy} />}
                                                    </DataBlock.Item> */}
                                            <DataBlock.Item label="Id">
                                                <FormatText>{journal.id}</FormatText>
                                            </DataBlock.Item>
                                        </DataBlock.Content>
                                    </DataBlock.Root>
                                </Section.Item>
                            )}
                        </>
                    )
                }}
            </DataWrapper>
        </Section.Root>
    )
}
