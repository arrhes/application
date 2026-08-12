import { ButtonOutlineContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconCalendarPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { CreateOneYear } from "./CreateOneYear.tsx"
import { YearsListTable } from "./YearsListTable.tsx"

export function YearsPage({ idOrganization: idOrganizationProp }: { idOrganization?: string }) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""

    return (
        <Page.Root>
            {/* <Page.Header>
                <Page.Title>
                    Exercices fiscaux
                </Page.Title>
            </Page.Header> */}
            <Page.Content>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                    })}
                >
                    <CreateOneYear idOrganization={idOrganization}>
                        <ButtonOutlineContent
                            leftIcon={<IconCalendarPlus />}
                            text="Ajouter un exercice"
                        />
                    </CreateOneYear>
                </div>
                <YearsListTable idOrganization={idOrganization} />
            </Page.Content>
        </Page.Root>
    )
}
