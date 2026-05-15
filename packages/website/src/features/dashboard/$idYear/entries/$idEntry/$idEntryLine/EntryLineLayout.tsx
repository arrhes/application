import { readOneEntryLineRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft, IconDatabase, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../components/layouts/section/section.tsx"
import { Tab } from "../../../../../../components/layouts/tab/tab.tsx"
import { LinkButton } from "../../../../../../components/LinkButton.tsx"

import { DeleteOneEntryLine } from "./DeleteOneEntryLine.tsx"
import { UpdateOneEntryLine } from "./UpdateOneEntryLine.tsx"

export function EntryLineLayout() {
    const params = useParams({
        strict: false,
    }) as { idYear?: string; idEntryLine?: string }

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneEntryLineRouteDefinition}
                    body={{
                        idYear: params.idYear,
                        idEntryLine: params.idEntryLine,
                    }}
                >
                    {(entryLine) => {
                        return (
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
                                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry/mouvements"
                                            params={{
                                                idOrganization: entryLine.idOrganization,
                                                idYear: entryLine.idYear,
                                                idEntry: entryLine.idEntry,
                                            }}
                                        >
                                            <ButtonOutlineContent
                                                leftIcon={<IconChevronLeft />}
                                                text="Retour"
                                            />
                                        </LinkButton>
                                        <div
                                            className={css({
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                            })}
                                        >
                                            <UpdateOneEntryLine entryLine={entryLine}>
                                                <ButtonPlainContent
                                                    leftIcon={<IconPencil />}
                                                    text="Modifier"
                                                />
                                            </UpdateOneEntryLine>
                                            <DeleteOneEntryLine entryLine={entryLine}>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconTrash />}
                                                    color="danger"
                                                />
                                            </DeleteOneEntryLine>
                                        </div>
                                    </div>
                                </Section.Item>
                                <Section.Item>
                                    <Tab.Root
                                        tabs={[
                                            {
                                                label: "Informations",
                                                icon: <IconInfoCircle />,
                                                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry/mouvements/$idEntryLine",
                                                params: {
                                                    idOrganization: params.idOrganization,
                                                    idYear: params.idYear,
                                                    idEntry: params.idEntry,
                                                    idEntryLine: params.idEntryLine,
                                                },
                                            },
                                            {
                                                label: "Métadonnées",
                                                icon: <IconDatabase />,
                                                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry/mouvements/$idEntryLine/métadonnées",
                                                params: {
                                                    idOrganization: params.idOrganization,
                                                    idYear: params.idYear,
                                                    idEntry: params.idEntry,
                                                    idEntryLine: params.idEntryLine,
                                                },
                                            },
                                        ]}
                                    />
                                </Section.Item>
                                <Outlet />
                            </Section.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
