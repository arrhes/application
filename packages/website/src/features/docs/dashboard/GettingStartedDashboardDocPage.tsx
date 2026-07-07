import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function GettingStartedDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Démarrer avec Arrhes"
                description="Premiers pas pour configurer votre comptabilité"
            />

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
                <DocParagraph>
                    Arrhes fonctionne comme un éditeur de code ou un navigateur : chaque vue s'ouvre dans un{" "}
                    <strong>onglet</strong>. Vous pouvez ainsi garder plusieurs contextes ouverts simultanément sans
                    perdre votre place.
                </DocParagraph>

                <DocExample title="La barre d'onglets">
                    <DocList
                        items={[
                            "Chaque onglet affiche son titre et, quand disponible, une courte description (ex : le libellé d'une écriture).",
                            "Cliquez sur un onglet pour l'activer.",
                            "Cliquez sur la croix pour fermer un onglet.",
                            "Faites glisser un onglet pour le réorganiser.",
                            "Clic droit sur un onglet pour accéder au menu contextuel.",
                        ]}
                    />
                </DocExample>

                <DocExample title="Menu contextuel d'un onglet (clic droit)">
                    <DocList
                        items={[
                            "Retour / Suivant - navigue dans l'historique de l'onglet, comme un navigateur web.",
                            "Ouvrir en vue divisée - déplace l'onglet dans un second panneau côte à côte.",
                            "Fermer l'onglet - ferme l'onglet actif.",
                        ]}
                    />
                </DocExample>

                <DocExample title="Clic droit sur la barre (zone vide)">
                    <DocList
                        items={[
                            "Fermer les autres onglets - garde seulement l'onglet actif.",
                            "Fusionner les panneaux - visible uniquement en vue divisée, réunit les deux panneaux.",
                        ]}
                    />
                </DocExample>

                <DocTip variant="tip">
                    Vous pouvez naviguer dans l'historique d'un onglet avec les raccourcis clavier{" "}
                    <strong>Alt+Flèche gauche</strong> et <strong>Alt+Flèche droite</strong>, ou via le menu contextuel.
                </DocTip>
            </DocSection>

            <DocSection title="La palette de commandes">
                <DocParagraph>
                    La palette de commandes est le moyen le plus rapide d'ouvrir n'importe quelle vue : organisations,
                    exercices, écritures, documents, paramètres…
                </DocParagraph>
                <DocExample title="Ouvrir la palette">
                    <DocList
                        items={[
                            <>
                                Appuyez sur <strong>Ctrl+K</strong> (ou <strong>⌘+K</strong> sur Mac).
                            </>,
                            "Ou cliquez sur le bouton « Rechercher… » dans l'en-tête.",
                            "Ou cliquez sur le bouton « + » à droite de la barre d'onglets.",
                        ]}
                    />
                </DocExample>
                <DocExample title="Filtrer par groupe">
                    <DocList
                        items={[
                            "Tapez directement pour chercher dans toutes les vues.",
                            "Cliquez sur une pastille de groupe (Organisation, Exercice, etc.) pour n'afficher que ce groupe.",
                            "Vous pouvez aussi préfixer votre recherche avec le nom du groupe, par exemple « Exercice journal ».",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Vue divisée">
                <DocParagraph>
                    Arrhes permet d'afficher deux panneaux côte à côte pour comparer ou travailler sur deux vues en même
                    temps, par exemple consulter le journal pendant la saisie d'une écriture.
                </DocParagraph>
                <DocExample title="Activer la vue divisée">
                    <DocList
                        items={[
                            "Clic droit sur un onglet → « Ouvrir en vue divisée ».",
                            "Ou faites glisser un onglet en dehors de sa barre pour le déplacer dans le second panneau.",
                        ]}
                    />
                </DocExample>
                <DocExample title="Gérer les panneaux">
                    <DocList
                        items={[
                            "Faites glisser la poignée centrale pour ajuster la largeur des deux panneaux.",
                            "Déplacez un onglet d'un panneau à l'autre par glisser-déposer.",
                            "Clic droit sur la barre d'onglets du panneau → « Fusionner les panneaux » pour revenir à un affichage simple.",
                        ]}
                    />
                </DocExample>
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
                        "Les classes de comptes (1 à 8)",
                        "La différence entre bilan et compte de résultat",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
