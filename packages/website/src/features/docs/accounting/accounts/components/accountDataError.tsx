import { ButtonOutlineContent } from "@arrhes/ui"
import { IconExternalLink } from "@tabler/icons-react"
import { DocTip } from "../../../../../components/document/docTip.js"

export function AccountDataError() {
    return (
        <DocTip variant="warning">
            Les informations présentées sur cette page peuvent contenir des erreurs ou des inexactitudes. Si vous
            constatez une erreur, n'hésitez pas à ouvrir un ticket sur Github afin que nous puissions la corriger rapidement.
            <a href="https://github.com/arrhes/application/issues" target="_blank" rel="noopener noreferrer">
                <ButtonOutlineContent
                    leftIcon={<IconExternalLink />}
                    text={"Signaler une erreur"}
                />
            </a>
        </DocTip>
    )
}
