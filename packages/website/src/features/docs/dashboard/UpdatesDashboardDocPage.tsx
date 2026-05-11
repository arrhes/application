import { LinkContent } from "@arrhes/ui"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"

export function UpdatesDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Mises à jour"
                description="Historique des versions et nouveautés d'Arrhes."
            />

            <DocSection title="Suivre les mises à jour">
                <DocParagraph>
                    Les mises à jour d'Arrhes sont publiées directement sur GitHub Releases avec les nouveautés,
                    corrections et changements par version.
                </DocParagraph>
                <a
                    href="https://github.com/arrhes/application/releases"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <LinkContent>Voir les releases Arrhes sur GitHub</LinkContent>
                </a>
            </DocSection>
        </DocRoot>
    )
}
