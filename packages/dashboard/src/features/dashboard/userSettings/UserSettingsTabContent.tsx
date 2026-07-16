import { SubPageContent } from "../../../components/layouts/SubPageContent.tsx"
import { UserProfilePage } from "../profile/UserProfilePage.js"

export function UserSettingsTabContent({ subTab }: { subTab?: string } = {}) {
    return (
        <SubPageContent
            defaultKey={subTab ?? "paramètres"}
            sections={{
                settings: {
                    items: [
                        {
                            key: "paramètres",
                            label: "Paramètres",
                            icon: undefined,
                            content: <UserProfilePage />,
                        },
                    ],
                },
            }}
        />
    )
}
