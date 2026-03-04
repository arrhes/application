import { readOneAccountRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatBoolean } from "../../../../../../../../../components/formats/formatBoolean.tsx"
import { FormatDateTime } from "../../../../../../../../../components/formats/formatDateTime.tsx"
import { FormatText } from "../../../../../../../../../components/formats/formatText.tsx"
import { DataBlock } from "../../../../../../../../../components/layouts/dataBlock/dataBlock.tsx"
import { DataWrapper } from "../../../../../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../../../../../../components/linkButton.tsx"

import { accountRoute } from "../../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/accounts/$idAccount/accountRoute.tsx"
import { DeleteOneAccount } from "./deleteOneAccount.tsx"
import { UpdateOneAccount } from "./updateOneAccount.tsx"

export function AccountPage() {
    const [activeTab, setActiveTab] = useState<"informations" | "metadata">("informations")
    const params = useParams({ from: accountRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <DataWrapper
                        routeDefinition={readOneAccountRouteDefinition}
                        body={{
                            idYear: params.idYear,
                            idAccount: params.idAccount,
                        }}
                    >
                        {(account) => {
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
                                                to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/comptes"
                                                params={{
                                                    idOrganization: account.idOrganization,
                                                    idYear: account.idYear,
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
                                            <UpdateOneAccount account={account}>
                                                <ButtonPlainContent leftIcon={<IconPencil />} text="Modifier" />
                                            </UpdateOneAccount>
                                            <DeleteOneAccount account={account}>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconTrash />}
                                                    title="Supprimer"
                                                    color="danger"
                                                />
                                            </DeleteOneAccount>
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
                                                    <DataBlock.Item label="Numéro">
                                                        <FormatText>{account.number.toString()}</FormatText>
                                                    </DataBlock.Item>
                                                    <DataBlock.Item label="Libellé">
                                                        <FormatText>{account.label}</FormatText>
                                                    </DataBlock.Item>
                                                    <DataBlock.Item label="Classe/sous-classe ?">
                                                        <FormatBoolean boolean={account.isClass} />
                                                    </DataBlock.Item>
                                                    <DataBlock.Item label="Sélectionnable ?">
                                                        <FormatBoolean boolean={account.isSelectable} />
                                                    </DataBlock.Item>
                                                </DataBlock.Content>
                                            </DataBlock.Root>
                                        </Section.Item>
                                    ) : (
                                        <Section.Item className={css({ flexDirection: "column" })}>
                                            <DataBlock.Root>
                                                <DataBlock.Header title="Métadonnées" />
                                                <DataBlock.Content>
                                                    <DataBlock.Item label="Ajouté le">
                                                        <FormatDateTime date={account.createdAt} />
                                                    </DataBlock.Item>
                                                    <DataBlock.Item label="Modifié le">
                                                        <FormatDateTime date={account.lastUpdatedAt} />
                                                    </DataBlock.Item>
                                                    <DataBlock.Item label="Id">
                                                        <FormatText>{account.id}</FormatText>
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
            </Page.Content>
        </Page.Root>
    )
}
