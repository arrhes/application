import { IconHome, IconKey, IconScan } from "@tabler/icons-react"
import { lazy, Suspense } from "react"
import { SubPageContent } from "../../../components/layouts/SubPageContent.tsx"
import { UserProfilePage } from "../profile/UserProfilePage.js"

const UserOcrCredentialsPage = lazy(() =>
    import("./UserOcrCredentialsPage.js").then((m) => ({
        default: m.UserOcrCredentialsPage,
    })),
)

const UserApiKeysPage = lazy(() =>
    import("./UserApiKeysPage.js").then((m) => ({
        default: m.UserApiKeysPage,
    })),
)

export function UserSettingsTabContent({ subTab }: { subTab?: string } = {}) {
    return (
        <SubPageContent
            defaultKey={subTab ?? "général"}
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
                            key: "api",
                            label: "API",
                            icon: <IconKey />,
                            content: (
                                <Suspense fallback={null}>
                                    <UserApiKeysPage />
                                </Suspense>
                            ),
                        },
                        {
                            key: "ocr",
                            label: "OCR",
                            icon: <IconScan />,
                            content: (
                                <Suspense fallback={null}>
                                    <UserOcrCredentialsPage />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}
