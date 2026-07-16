import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../../components/layouts/SubPageContent.tsx"

const OrganizationApiGeneralPage = lazy(() =>
    import("./OrganizationApiGeneralPage.js").then((m) => ({
        default: m.OrganizationApiGeneralPage,
    })),
)

export function OrganizationApiTabContent(_props: { idOrganization: string }) {
    return (
        <SubPageContent
            defaultKey="général"
            sections={{
                api: {
                    items: [
                        {
                            key: "général",
                            label: "Général",
                            icon: undefined,
                            content: (
                                <Suspense fallback={null}>
                                    <OrganizationApiGeneralPage />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}
