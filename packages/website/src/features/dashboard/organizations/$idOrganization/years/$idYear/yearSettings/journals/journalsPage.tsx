import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { journalsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/journals/journalsRoute.tsx"
import { CreateOneJournal } from "./createOneJournal.tsx"
import { GenerateJournals } from "./generateJournals.tsx"
import { JournalsListTable } from "./journalsListTable.tsx"

export function JournalsPage() {
    const params = useParams({ from: journalsRoute.id })

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
                            <CreateOneJournal idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter un journal" />
                            </CreateOneJournal>
                            <GenerateJournals idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonOutlineContent leftIcon={<IconPlus />} text="Générer les journaux par défaut" />
                            </GenerateJournals>
                        </div>
                        <JournalsListTable idOrganization={params.idOrganization} idYear={params.idYear} />
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
