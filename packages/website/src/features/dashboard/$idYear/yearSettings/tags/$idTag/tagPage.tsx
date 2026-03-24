import { readOneTagRouteDefinition } from "@arrhes/application-metadata/routes"
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

import { tagRoute } from "../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/tags/$idTag/tagRoute.tsx"
import { DeleteOneTag } from "./deleteOneTag.tsx"
import { UpdateOneTag } from "./updateOneTag.tsx"

export function TagPage() {
    const [activeTab, setActiveTab] = useState<"informations" | "metadata">("informations")
    const params = useParams({ from: tagRoute.id })

    return (
        <Section.Root>
            <DataWrapper
                routeDefinition={readOneTagRouteDefinition}
                body={{
                    idYear: params.idYear,
                    idTag: params.idTag,
                }}
            >
                {(tag) => {
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
                                        to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/catégories"
                                        params={{
                                            idOrganization: tag.idOrganization,
                                            idYear: tag.idYear,
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
                                    <UpdateOneTag tag={tag}>
                                        <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                    </UpdateOneTag>
                                    <DeleteOneTag tag={tag}>
                                        <ButtonOutlineContent
                                            leftIcon={<IconTrash />}
                                            title="Supprimer"
                                            color="danger"
                                        />
                                    </DeleteOneTag>
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
                                            <DataBlock.Item label="Libellé">
                                                <FormatText>{tag.label}</FormatText>
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
                                                <FormatDateTime date={tag.createdAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Ajouté par">
                                                        {!tag.createdBy ? <FormatNull /> : <FormatUserWithFetch idUser={tag.data.createdBy} />}
                                                    </DataBlock.Item> */}
                                            <DataBlock.Item label="Modifié le">
                                                <FormatDateTime date={tag.lastUpdatedAt} />
                                            </DataBlock.Item>
                                            {/* <DataBlock.Item label="Modifié par">
                                                        {!tag.lastUpdatedBy ? <FormatNull /> : <FormatUserWithFetch idUser={tag.data.lastUpdatedBy} />}
                                                    </DataBlock.Item> */}
                                            <DataBlock.Item label="Id">
                                                <FormatText>{tag.id}</FormatText>
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
