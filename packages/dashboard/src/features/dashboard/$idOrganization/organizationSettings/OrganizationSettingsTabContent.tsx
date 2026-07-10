import { IconCloud, IconHome, IconLock } from "@tabler/icons-react"
import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../../components/layouts/SubPageContent.tsx"

const OrganizationSettingsPage = lazy(() =>
    import("./OrganizationSettingsPage.js").then((m) => ({
        default: m.OrganizationSettingsPage,
    })),
)
const OrganizationSecurityPage = lazy(() =>
    import("./OrganizationSecurityPage.js").then((m) => ({
        default: m.OrganizationSecurityPage,
    })),
)
const OrganizationStorageCredentialsPage = lazy(() =>
    import("./OrganizationStorageCredentialsPage.js").then((m) => ({
        default: m.OrganizationStorageCredentialsPage,
    })),
)

export function OrganizationSettingsTabContent(props: { idOrganization: string }) {
    return (
        <SubPageContent
            defaultKey="général"
            sections={{
                settings: {
                    items: [
                        {
                            key: "général",
                            label: "Général",
                            icon: <IconHome />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationSettingsPage idOrganization={props.idOrganization} />
                                </Suspense>
                            ),
                        },
                        {
                            key: "sécurité",
                            label: "Sécurité",
                            icon: <IconLock />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationSecurityPage idOrganization={props.idOrganization} />
                                </Suspense>
                            ),
                        },
                        {
                            key: "stockage",
                            label: "Stockage",
                            icon: <IconCloud />,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationStorageCredentialsPage idOrganization={props.idOrganization} />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}
