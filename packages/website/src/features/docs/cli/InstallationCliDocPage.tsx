import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function InstallationCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Installation"
                description="Installer le CLI Arrhes sur macOS et Linux en une commande"
            />

            <DocSection title="macOS et Linux">
                <DocParagraph>
                    Collez la commande suivante dans votre terminal. Elle télécharge le script CLI et l'installe dans{" "}
                    <DocCode>~/.local/bin</DocCode>.
                </DocParagraph>
                <DocExample title="Installation automatique">
                    <DocCodeBlock>curl -fsSL https://arrhes.com/cli/install.sh | sh</DocCodeBlock>
                </DocExample>
                <DocTip variant="info">
                    Si <DocCode>~/.local/bin</DocCode> n'est pas dans votre <DocCode>PATH</DocCode>, le script vous
                    indique la ligne à ajouter dans votre <DocCode>~/.bashrc</DocCode> ou <DocCode>~/.zshrc</DocCode>.
                </DocTip>
            </DocSection>

            <DocSection title="Vérifier l'installation">
                <DocCodeBlock>arrhes --version</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
