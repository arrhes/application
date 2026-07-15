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
import { DocTip } from "../../../components/document/DocTip.js"

export function PremiersPasGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Premiers pas"
                description="Configurez Arrhes en quelques minutes, quel que soit l'interface utilisée"
            />

            <DocSection title="Avant de commencer">
                <DocParagraph>
                    Arrhes peut être utilisé via trois interfaces : le dashboard web, l'API REST et le CLI. Chaque étape
                    ci-dessous présente la marche à suivre selon l'interface choisie.
                </DocParagraph>
                <DocTip variant="info">
                    Si vous débutez en comptabilité, nous vous recommandons de lire le{" "}
                    <DocLink to="/documentation/comptabilité">cours de comptabilité</DocLink> avant de commencer.
                </DocTip>
            </DocSection>

            <DocSection title="1. Créer un compte">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Rendez-vous sur le site d'Arrhes et renseignez votre adresse email ainsi qu'un mot de
                                passe.
                            </DocParagraph>
                            <DocExample title="Créer un compte">
                                <DocList
                                    items={[
                                        "Allez sur la page d'inscription",
                                        "Renseignez votre adresse email",
                                        "Choisissez un mot de passe sécurisé",
                                        "Validez le formulaire",
                                    ]}
                                />
                            </DocExample>
                            <DocParagraph>
                                Un email de confirmation vous sera envoyé. Cliquez sur le lien pour activer votre
                                compte.
                            </DocParagraph>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                La création de compte se fait via l'interface web. Une fois le compte actif, vous pouvez
                                utiliser l'API avec un cookie de session ou une clé API.
                            </DocParagraph>
                            <DocTip variant="info">
                                Consultez la page{" "}
                                <DocLink to="/documentation/guide/authentification">Authentification</DocLink> pour les
                                détails des méthodes d'authentification.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                Le CLI nécessite une clé API. Créez d'abord un compte via le dashboard, puis générez une
                                clé API pour connecter le CLI.
                            </DocParagraph>
                            <DocTip variant="info">
                                Suivez les étapes de la page{" "}
                                <DocLink to="/documentation/guide/authentification">Authentification</DocLink> pour
                                connecter le CLI.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>

            <DocSection title="2. Créer une organisation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Une fois connecté, vous arrivez sur le tableau de bord. Si c'est votre première
                                connexion, vous serez invité à créer une organisation.
                            </DocParagraph>
                            <DocExample title="Ajouter une organisation">
                                <DocList
                                    items={[
                                        "Cliquez sur « Ajouter une organisation »",
                                        "Choisissez le type : Entreprise ou Association",
                                        "Renseignez le nom de votre organisation",
                                        "Indiquez le numéro SIREN si vous en avez un (optionnel)",
                                        "Validez",
                                    ]}
                                />
                            </DocExample>
                            <DocTip variant="info">
                                Vous pouvez gérer plusieurs organisations depuis le même compte.
                            </DocTip>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                Utilisez l'endpoint de création d'organisation. Le type d'organisation détermine le plan
                                comptable par défaut.
                            </DocParagraph>
                            <DocCodeBlock>
                                {
                                    'POST /v1/organizations\nContent-Type: application/json\n\n{\n  "name": "Ma Société",\n  "type": "company",\n  "siren": "123456789"\n}'
                                }
                            </DocCodeBlock>
                            <DocTip variant="warning">
                                Le type d'organisation est défini à la création et ne peut pas être modifié ensuite.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                La création d'organisation n'est pas disponible directement en CLI. Créez l'organisation
                                via le dashboard, puis configurez le CLI avec son identifiant.
                            </DocParagraph>
                            <DocCodeBlock>{"arrhes login --api-key <clé> --org <idOrganisation>"}</DocCodeBlock>
                        </>
                    }
                />
            </DocSection>

            <DocSection title="3. Créer un exercice comptable">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Après avoir créé votre organisation, vous devez définir un exercice comptable.
                            </DocParagraph>
                            <DocExample title="Créer un exercice">
                                <DocList
                                    items={[
                                        "Accédez à votre organisation",
                                        "Cliquez sur « Ajouter un exercice »",
                                        "Donnez un nom à l'exercice (ex : Exercice 2025)",
                                        "Définissez les dates de début et de fin",
                                        "Validez",
                                    ]}
                                />
                            </DocExample>
                            <DocParagraph>
                                Arrhes crée automatiquement un plan comptable adapté au type d'organisation.
                            </DocParagraph>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>Créez un exercice en précisant les dates de début et de fin.</DocParagraph>
                            <DocCodeBlock>
                                {
                                    'POST /v1/organizations/:idOrganization/years\nContent-Type: application/json\n\n{\n  "label": "Exercice 2025",\n  "startDate": "2025-01-01",\n  "endDate": "2025-12-31"\n}'
                                }
                            </DocCodeBlock>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                Utilisez la commande <DocCode>arrhes years create</DocCode>.
                            </DocParagraph>
                            <DocCodeBlock>
                                arrhes years create --start 2025-01-01 --end 2025-12-31 --label "Exercice 2025"
                            </DocCodeBlock>
                        </>
                    }
                />
            </DocSection>

            <DocSection title="4. Découvrir l'interface">
                <DocParagraph>
                    Le dashboard fonctionne comme un éditeur de code : chaque vue s'ouvre dans un{" "}
                    <strong>onglet</strong>. Vous pouvez garder plusieurs contextes ouverts simultanément.
                </DocParagraph>
                <DocExample title="Navigation rapide">
                    <DocList
                        items={[
                            "Ouvrez la palette de commandes avec Ctrl+K (ou ⌘+K sur Mac).",
                            "Cliquez sur un onglet pour l'activer, sur la croix pour le fermer.",
                            "Faites glisser un onglet pour le réorganiser.",
                            "Clic droit sur un onglet pour l'ouvrir en vue divisée.",
                        ]}
                    />
                </DocExample>
                <DocTip variant="tip">
                    Utilisez la vue divisée pour consulter le journal pendant la saisie d'une écriture.
                </DocTip>
            </DocSection>
        </DocRoot>
    )
}
