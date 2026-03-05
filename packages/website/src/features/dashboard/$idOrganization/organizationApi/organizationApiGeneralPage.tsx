import { ButtonOutlineContent } from "@arrhes/ui"
import { IconBook2 } from "@tabler/icons-react"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { LinkButton } from "../../../../components/linkButton.tsx"

export function OrganizationApiGeneralPage() {
    return (
        <Page.Root>
            <Page.Content>
                <SettingsSection.Root>
                    <SettingsSection.Header
                        title="API"
                        description="Permet d'intégrer Arrhes à vos outils et automatiser vos opérations comptables."
                    />
                    <SettingsSection.Row
                        title="Documentation"
                        description="Consultez la documentation complète pour découvrir comment utiliser l'API."
                    >
                        <LinkButton to="/documentation/api" target="_blank" rel="noopener noreferrer">
                            <ButtonOutlineContent leftIcon={<IconBook2 />} text="Accéder à la documentation" />
                        </LinkButton>
                    </SettingsSection.Row>
                </SettingsSection.Root>
            </Page.Content>
        </Page.Root>
    )
}
