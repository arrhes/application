import { ButtonOutlineContent } from "@arrhes/ui"
import { IconArrowLeft } from "@tabler/icons-react"
import { DocHeader } from "../../../../../components/document/docHeader.js"
import { DocRoot } from "../../../../../components/document/docRoot.js"
import { LinkButton } from "../../../../../components/linkButton.js"

export function AccountNotFound() {
    return (
        <DocRoot>
            <DocHeader title="Compte introuvable" description="Ce compte n'existe pas dans le plan comptable." />
            <LinkButton to="/documentation/comptabilité/comptes/liste">
                <ButtonOutlineContent leftIcon={<IconArrowLeft />} text="Retour au plan comptable" />
            </LinkButton>
        </DocRoot>
    )
}
