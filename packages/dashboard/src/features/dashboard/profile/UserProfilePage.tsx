import { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { IconKey, IconMail, IconTrash } from "@tabler/icons-react"
import { DataWrapper } from "../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../components/layouts/page/page.js"
import { SettingsSection } from "../../../components/layouts/settingsSection/settingsSection.tsx"
import { DeleteUser } from "./DeleteUser.tsx"
import { UpdateUserEmail } from "./UpdateUserEmail.tsx"
import { UpdateUserPassword } from "./UpdateUserPassword.tsx"
import { ValidateUserEmail } from "./ValidateUserEmail.tsx"

export function UserProfilePage() {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Mon compte</Page.Title>
                <Page.Description>Modifiez votre adresse email ou votre mot de passe.</Page.Description>
            </Page.Header>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readUserSessionRouteDefinition}
                    body={{}}
                >
                    {(userSession) => (
                        <>
                            <SettingsSection.Root>
                                <SettingsSection.Header title="Informations du compte" />
                                <SettingsSection.Row
                                    title="Adresse email"
                                    description={userSession.user.email}
                                >
                                    <UpdateUserEmail>
                                        <Button>
                                            <ButtonOutlineContent
                                                leftIcon={<IconMail />}
                                                text="Modifier"
                                            />
                                        </Button>
                                    </UpdateUserEmail>
                                </SettingsSection.Row>
                                {userSession.user.emailToValidate && (
                                    <ValidateUserEmail emailToValidate={userSession.user.emailToValidate} />
                                )}
                                <SettingsSection.Row
                                    title="Mot de passe"
                                    description="Modifiez le mot de passe de votre compte."
                                >
                                    <UpdateUserPassword>
                                        <Button>
                                            <ButtonOutlineContent
                                                leftIcon={<IconKey />}
                                                text="Modifier"
                                            />
                                        </Button>
                                    </UpdateUserPassword>
                                </SettingsSection.Row>
                            </SettingsSection.Root>
                            <SettingsSection.Root variant="danger">
                                <SettingsSection.Header
                                    title="Zone de danger"
                                    variant="danger"
                                />
                                <SettingsSection.Row
                                    title="Supprimer le compte"
                                    description="Cette action est irréversible. Toutes vos données seront supprimées."
                                    variant="danger"
                                >
                                    <DeleteUser>
                                        <Button>
                                            <ButtonOutlineContent
                                                leftIcon={<IconTrash />}
                                                text="Supprimer"
                                                color="danger"
                                            />
                                        </Button>
                                    </DeleteUser>
                                </SettingsSection.Row>
                            </SettingsSection.Root>
                        </>
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
