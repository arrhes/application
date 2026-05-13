import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { CreateOneJournal } from "./createOneJournal.tsx"
import { JournalsListTable } from "./journalsListTable.tsx"

export function JournalsPage({
    idOrganization: idOrganizationProp,
    idYear: idYearProp,
}: {
    idOrganization?: string
    idYear?: string
} = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
        idYear?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""
    const idYear = idYearProp ?? params.idYear ?? ""

    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
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
                            <CreateOneJournal
                                idOrganization={idOrganization}
                                idYear={idYear}
                            >
                                <ButtonPlainContent
                                    leftIcon={<IconPlus />}
                                    text="Ajouter un journal"
                                />
                            </CreateOneJournal>
                        </div>
                        <JournalsListTable
                            idOrganization={idOrganization}
                            idYear={idYear}
                        />
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
