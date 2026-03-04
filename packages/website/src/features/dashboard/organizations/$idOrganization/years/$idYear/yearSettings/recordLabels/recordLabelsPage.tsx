import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../../../../components/layouts/section/section.tsx"
import { recordLabelsRoute } from "../../../../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/recordLabels/recordLabelsRoute.tsx"
import { CreateOneRecordLabel } from "./createOneRecordLabel.tsx"
import { RecordLabelsListTable } from "./recordLabelsListTable.tsx"

export function RecordLabelsPage() {
    const params = useParams({ from: recordLabelsRoute.id })

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
                            <CreateOneRecordLabel idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter une catégorie" />
                            </CreateOneRecordLabel>
                        </div>
                        <RecordLabelsListTable idOrganization={params.idOrganization} idYear={params.idYear} />
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
