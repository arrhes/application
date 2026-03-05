import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"

export function GettingStartedDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Démarrer avec Arrhes" description="Premiers pas pour configurer votre comptabilité" />

            <DocSection title="Créer un compte">
                <DocParagraph>
                    Pour commencer à utiliser Arrhes, vous devez d'abord créer un compte utilisateur. Rendez-vous sur la
                    page d'inscription et renseignez votre adresse email et un mot de passe.
                </DocParagraph>
                <DocParagraph>
                    Un email de confirmation vous sera envoyé. Cliquez sur le lien pour activer votre compte.
                </DocParagraph>
            </DocSection>

            <DocSection title="Créer votre première organisation">
                <DocParagraph>
                    Une fois connecté, vous arrivez sur la page d'accueil. Si c'est votre première connexion, vous serez
                    invité à créer une organisation.
                </DocParagraph>
                <DocExample title="Ajouter une organisation">
                    <DocList
                        items={[
                            "Cliquez sur « Ajouter une organisation »",
                            "Choisissez le type : Entreprise ou Association",
                            "Renseignez le nom de votre organisation",
                            "Si vous possédez un numéro SIREN, vous pouvez l'indiquer (optionnel)",
                        ]}
                    />
                </DocExample>
                <DocParagraph>
                    Vous pouvez gérer plusieurs organisations depuis le même compte. Pratique si vous gérez une
                    entreprise et une association par exemple !
                </DocParagraph>
            </DocSection>

            <DocSection title="Créer un exercice comptable">
                <DocParagraph>
                    Après avoir créé votre organisation, vous devez définir un exercice comptable. L'exercice correspond
                    généralement à l'année civile (du 1er janvier au 31 décembre), mais vous pouvez choisir d'autres
                    dates.
                </DocParagraph>
                <DocExample title="Créer un exercice">
                    <DocList
                        items={[
                            "Accédez à votre organisation",
                            "Cliquez sur « Ajouter un exercice »",
                            "Donnez un nom à l'exercice (ex : Exercice 2024)",
                            "Définissez les dates de début et de fin",
                            "Validez",
                        ]}
                    />
                </DocExample>
                <DocParagraph>
                    Le logiciel créera automatiquement un plan comptable adapté à votre type d'organisation. Vous
                    pourrez le personnaliser par la suite si nécessaire.
                </DocParagraph>
            </DocSection>

            <DocSection title="Comprendre l'interface">
                <DocParagraph>L'interface d'Arrhes est organisée autour de plusieurs sections :</DocParagraph>
                <DocList
                    items={[
                        "Écritures : pour saisir et consulter les opérations comptables",
                        "Stockage : pour gérer vos documents comme vos pièces justificatives (factures, relevés...)",
                        "Documents comptables : pour visualiser et générer les documents de synthèse",
                        "Paramètres : pour configurer le plan comptable, les journaux...",
                    ]}
                />
                <DocParagraph>
                    La navigation se fait via le menu upérieur. Chaque section est accessible en un clic depuis
                    n'importe quelle page.
                </DocParagraph>
            </DocSection>

            <DocSection title="Prérequis comptables">
                <DocParagraph>
                    Avant de commencer la saisie, assurez-vous de comprendre les bases de la comptabilité. Si vous
                    n'avez jamais fait de comptabilité, nous vous recommandons de lire notre{" "}
                    <DocLink to="/documentation/comptabilité">cours d'introduction</DocLink>.
                </DocParagraph>
                <DocParagraph>Les concepts clés à maîtriser sont :</DocParagraph>
                <DocList
                    items={[
                        "La partie double (débit = crédit)",
                        "Les classes de comptes (1 à 7)",
                        "La différence entre bilan et compte de résultat",
                    ]}
                />
            </DocSection>

            <DocNextPage to="/documentation/dashboard/organisations" label="Gérer les organisations" />
        </DocRoot>
    )
}
