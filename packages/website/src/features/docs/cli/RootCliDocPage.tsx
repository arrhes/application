import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function RootCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="CLI Arrhes"
                description="Gérez votre comptabilité depuis le terminal"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Le CLI Arrhes est une interface en ligne de commande qui vous permet de gérer vos organisations,
                    exercices, écritures et fichiers directement depuis votre terminal, sans passer par l'interface web.
                </DocParagraph>
                <DocList
                    items={[
                        "Aucune installation de Node.js requise — le binaire est autonome",
                        "Compatible macOS et Linux",
                        "Toutes les réponses sont en JSON, composable avec jq et d'autres outils",
                        "Authentification par clé API",
                    ]}
                />
            </DocSection>

            <DocSection title="Cas d'usage">
                <DocList
                    items={[
                        "Automatiser la création d'écritures depuis un script",
                        "Intégrer Arrhes dans un pipeline CI/CD",
                        "Exporter des données pour les traiter avec d'autres outils",
                        "Administrer plusieurs organisations en masse",
                    ]}
                />
                <DocTip variant="info">
                    Le CLI utilise la même API REST que l'interface web. Tout ce qui est possible dans le dashboard peut
                    être automatisé via le CLI.
                </DocTip>
            </DocSection>

            <DocSection title="Prochaines étapes">
                <DocList
                    items={[
                        <DocLink
                            key="install"
                            to="/documentation/cli/installation"
                        >
                            Installer le CLI
                        </DocLink>,
                        <DocLink
                            key="auth"
                            to="/documentation/cli/authentification"
                        >
                            Se connecter avec une clé API
                        </DocLink>,
                        <DocLink
                            key="commands"
                            to="/documentation/cli/commandes"
                        >
                            Référence des commandes
                        </DocLink>,
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
