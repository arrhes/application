import { IconHome, IconRobot } from "@tabler/icons-react"
import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../components/layouts/SubPageContent.tsx"
import { UserProfilePage } from "../profile/UserProfilePage.js"

const UserLlmCredentialsPage = lazy(() =>
    import("./UserLlmCredentialsPage.js").then((m) => ({
        default: m.UserLlmCredentialsPage,
    })),
)

export function UserSettingsTabContent() {
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
                                    <UserProfilePage />
                                </Suspense>
                            ),
                        },
                        {
                            key: "ia",
                            label: "IA",
                            icon: <IconRobot />,
                            content: (
                                <Suspense fallback={null}>
                                    <UserLlmCredentialsPage />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}
