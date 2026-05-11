import { LinkContent } from "@arrhes/ui"
import { DocTip } from "../../../components/document/docTip.js"

export function DataError() {
    return (
        <DocTip variant="info">
            Si vous constatez une erreur ou une inexactitude, n'hésitez pas à{" "}
            <a href="https://github.com/arrhes/application/issues" target="_blank" rel="noopener noreferrer">
                <LinkContent>ouvrir un ticket sur Github</LinkContent>
            </a>{" "}
            afin que nous puissions la corriger
        </DocTip>
    )
}
