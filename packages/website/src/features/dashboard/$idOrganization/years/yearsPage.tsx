import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCalendarPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { yearsRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/years/yearsRoute.tsx"
import { CreateOneYear } from "./createOneYear.tsx"
import { YearsListTable } from "./yearsListTable.tsx"

export function YearsPage() {
    const params = useParams({ from: yearsRoute.id })

    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>
                    Exercices fiscaux
                </Page.Title>
            </Page.Header> */}
            <Page.Content>
                <div className={css({ width: "100%", display: "flex", justifyContent: "end", alignItems: "center" })}>
                    <CreateOneYear idOrganization={params.idOrganization}>
                        <ButtonOutlineContent leftIcon={<IconCalendarPlus />} text="Ajouter un exercice" />
                    </CreateOneYear>
                </div>
                <YearsListTable idOrganization={params.idOrganization} />
            </Page.Content>
        </Page.Root>
    )
}
