import { LinkContent } from "@arrhes/ui"
import { DocTip } from "../../../../../components/document/docTip.js"

export function AccountDataError() {
    return (
        <DocTip variant="warning">
            Les informations présentées sur cette page peuvent contenir des erreurs ou des inexactitudes. Si vous
            constatez une erreur, n'hésitez pas à{" "}
            <a href="https://github.com/arrhes/application/issues" target="_blank" rel="noopener noreferrer">
                <LinkContent>ouvrir un ticket sur GitHub</LinkContent>
            </a>{" "}
            afin que nous puissions la corriger rapidement.
        </DocTip>
    )
}
