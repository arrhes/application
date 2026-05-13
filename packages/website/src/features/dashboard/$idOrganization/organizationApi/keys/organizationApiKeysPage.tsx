import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { ApiKeysListTable } from "./apiKeysListTable.tsx"
import { CreateOneApiKey } from "./createOneApiKey.tsx"

export function OrganizationApiKeysPage({ idOrganization: idOrganizationProp }: { idOrganization?: string } = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""

    return (
        <Page.Root>
            <Page.Content>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                    })}
                >
                    <CreateOneApiKey idOrganization={idOrganization}>
                        <ButtonOutlineContent
                            leftIcon={<IconPlus />}
                            text="Créer une clé API"
                        />
                    </CreateOneApiKey>
                </div>
                <ApiKeysListTable idOrganization={idOrganization} />
            </Page.Content>
        </Page.Root>
    )
}
