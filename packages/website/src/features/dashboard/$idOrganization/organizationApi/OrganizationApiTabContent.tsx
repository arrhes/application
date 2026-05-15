import { IconHome, IconKey } from "@tabler/icons-react"
import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../../components/layouts/SubPageContent.tsx"

const OrganizationApiGeneralPage = lazy(() =>
    import("./OrganizationApiGeneralPage.js").then((m) => ({
        default: m.OrganizationApiGeneralPage,
    })),
)
const OrganizationApiKeysPage = lazy(() =>
    import("./keys/OrganizationApiKeysPage.js").then((m) => ({
        default: m.OrganizationApiKeysPage,
    })),
)

export function OrganizationApiTabContent(props: { idOrganization: string }) {
    return (
        <SubPageContent
            defaultKey="général"
            sections={{
                api: {
                    items: [
                        {
                            key: "général",
                            label: "Général",
                            icon: <IconHome />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationApiGeneralPage />
                                </Suspense>
                            ),
                        },
                        {
                            key: "clés",
                            label: "Clés",
                            icon: <IconKey />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationApiKeysPage idOrganization={props.idOrganization} />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}
