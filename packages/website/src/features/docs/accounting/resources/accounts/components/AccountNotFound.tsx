import { ButtonOutlineContent } from "@arrhes/ui"
import { IconArrowLeft } from "@tabler/icons-react"
import { DocHeader } from "../../../../../../components/document/DocHeader.js"
import { DocRoot } from "../../../../../../components/document/DocRoot.js"
import { LinkButton } from "../../../../../../components/LinkButton.js"

export function AccountNotFound() {
    return (
        <DocRoot>
            <DocHeader
                title="Compte introuvable"
                description="Ce compte n'existe pas dans le plan comptable."
            />
            <LinkButton to="/documentation/comptabilité/comptes/liste">
                <ButtonOutlineContent
                    leftIcon={<IconArrowLeft />}
                    text="Retour au plan comptable"
                />
            </LinkButton>
        </DocRoot>
    )
}
