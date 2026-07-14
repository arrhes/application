import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function InstallationGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Installation"
                description="Mettre en place Arrhes selon l'interface que vous utilisez"
            />

            <DocSection title="Avant de commencer">
                <DocParagraph>
                    Arrhes propose trois interfaces pour interagir avec votre comptabilité. Selon votre profil, vous
                    pouvez utiliser l'application web (dashboard), appeler l'API directement ou installer le CLI.
                </DocParagraph>
                <DocList
                    items={[
                        "Le dashboard ne nécessite aucune installation : créez un compte et commencez immédiatement.",
                        "L'API est accessible via HTTPS avec une authentification par cookie de session ou clé API.",
                        "Le CLI est un binaire autonome disponible sur macOS et Linux.",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                L'interface web est la méthode la plus simple pour découvrir Arrhes. Aucun logiciel à
                                installer : il suffit d'un navigateur moderne.
                            </DocParagraph>
                            <DocExample title="Premiers pas">
                                <DocList
                                    items={[
                                        "Rendez-vous sur le site d'Arrhes et créez un compte.",
                                        "Confirmez votre adresse email via le lien reçu.",
                                        "Créez votre première organisation (Entreprise ou Association).",
                                        "Ouvrez votre organisation et ajoutez un exercice comptable.",
                                    ]}
                                />
                            </DocExample>
                            <DocTip variant="info">
                                Pour un guide détaillé de l'interface, consultez la page{" "}
                                <DocLink to="/documentation/guide/démarrer">Démarrer avec Arrhes</DocLink>.
                            </DocTip>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                L'API d'Arrhes suit les conventions REST. Tous les exemples de cette documentation
                                utilisent le préfixe de version <DocCode>/v1</DocCode>.
                            </DocParagraph>
                            <DocList
                                items={[
                                    "GET pour la lecture, POST pour la création, PATCH pour la modification, DELETE pour la suppression.",
                                    "Le corps des requêtes et des réponses est en JSON.",
                                    "Les dates suivent le format ISO 8601.",
                                    'Les montants (débit, crédit) sont des chaînes numériques (ex : "100.00").',
                                ]}
                            />
                            <DocTable
                                headers={[
                                    "Environnement",
                                    "URL de base",
                                ]}
                                rows={[
                                    [
                                        "Cloud",
                                        "https://api.arrhes.com/v1",
                                    ],
                                    [
                                        "Auto-hébergé",
                                        "https://votre-domaine.com/v1",
                                    ],
                                ]}
                            />
                            <DocTip variant="warning">
                                Les chemins affichés dans les pages de référence n'incluent pas le préfixe{" "}
                                <DocCode>/v1</DocCode>. Pensez à l'ajouter dans vos appels directs.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                Le CLI est un binaire autonome - aucune installation de Node.js ou de dépendance
                                requise. Collez la commande suivante dans votre terminal :
                            </DocParagraph>
                            <DocExample title="Installation automatique">
                                <DocCodeBlock>curl -fsSL https://arrhes.com/cli/install.sh | sh</DocCodeBlock>
                            </DocExample>
                            <DocParagraph>
                                Le script installe le binaire dans <DocCode>~/.local/bin</DocCode>. Vérifiez
                                l'installation :
                            </DocParagraph>
                            <DocCodeBlock>arrhes --version</DocCodeBlock>
                            <DocTip variant="info">
                                Si <DocCode>~/.local/bin</DocCode> n'est pas dans votre <DocCode>PATH</DocCode>, le
                                script vous indique la ligne à ajouter dans votre <DocCode>~/.bashrc</DocCode> ou{" "}
                                <DocCode>~/.zshrc</DocCode>.
                            </DocTip>
                            <DocParagraph>
                                Pour les options avancées (installation manuelle, autres architectures), consultez la{" "}
                                <DocLink to="/documentation/guide/installation">section Installation</DocLink>.
                            </DocParagraph>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
