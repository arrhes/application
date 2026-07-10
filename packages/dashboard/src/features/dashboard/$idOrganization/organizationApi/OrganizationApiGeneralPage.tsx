import { ButtonOutlineContent } from "@arrhes/ui"
import { IconBook2 } from "@tabler/icons-react"
import { LinkButton } from "../../../../components/LinkButton.tsx"
import { Block } from "../../../../components/layouts/block/block.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"

export function OrganizationApiGeneralPage() {
    return (
        <Page.Root>
            <Page.Content>
                <Block.Root>
                    <Block.Header
                        title="API"
                        description="Permet d'intégrer Arrhes à vos outils et automatiser vos opérations comptables."
                    />
                    <Block.Row
                        title="Documentation"
                        description="Consultez la documentation complète pour découvrir comment utiliser l'API."
                    >
                        <LinkButton
                            to="/documentation/api"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ButtonOutlineContent
                                leftIcon={<IconBook2 />}
                                text="Accéder à la documentation"
                            />
                        </LinkButton>
                    </Block.Row>
                </Block.Root>
            </Page.Content>
        </Page.Root>
    )
}
