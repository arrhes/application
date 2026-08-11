import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocRoot } from "../../../components/document/DocRoot.js"

export function UpdatesGeneralDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Mises à jour"
                description="Historique des versions et nouveautés de Comptasse."
            />
            <DocSection title="Suivre les mises à jour">
                <DocParagraph>
                    Les mises à jour de Comptasse sont publiées directement sur GitHub Releases avec les nouveautés,
                    corrections et changements par version.
                </DocParagraph>
                <DocParagraph>
                    <IconBrandGithub size={16} />{" "}
                    <DocLink
                        href="https://github.com/comptasse/application/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Voir les releases Comptasse sur GitHub
                    </DocLink>{" "}
                    <IconExternalLink size={14} />
                </DocParagraph>
            </DocSection>
        </DocRoot>
    )
}
