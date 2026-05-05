import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../../components/layouts/section/section.tsx"
import { tagsRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/yearSettings/tags/tagsRoute.tsx"
import { CreateOneTag } from "./createOneTag.tsx"
import { TagsListTable } from "./tagsListTable.tsx"

export function TagsPage() {
    const params = useParams({ from: tagsRoute.id })

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
                            <CreateOneTag idOrganization={params.idOrganization} idYear={params.idYear}>
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Ajouter une catégorie" />
                            </CreateOneTag>
                        </div>
                        <TagsListTable idOrganization={params.idOrganization} idYear={params.idYear} />
                    </Section.Item>
                </Section.Root>
            </Page.Content>
        </Page.Root>
    )
}
