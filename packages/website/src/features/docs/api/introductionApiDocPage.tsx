import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocLink } from "../../../components/document/docLink.tsx"
import { DocList } from "../../../components/document/docList.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTable } from "../../../components/document/docTable.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function IntroductionApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Introduction"
                description="Conventions, authentification et gestion des erreurs de l'API"
            />

            <DocSection title="Conventions">
                <DocParagraph>L'API d'Arrhes suit un ensemble de conventions simples et uniformes :</DocParagraph>
                <DocList
                    items={[
                        "Toutes les routes utilisent la méthode POST",
                        "Le corps de la requête et la réponse sont en JSON",
                        "Les dates suivent le format ISO 8601",
                        'Les montants (débit, crédit) sont des chaînes numériques (ex : "100.00")',
                    ]}
                />
                <DocTip variant="info">
                    Les identifiants d'entités (idYear, idRecord, idAccount, etc.) sont passés dans le corps de la
                    requête. L'organisation est identifiée via le token d'authentification, et non dans le corps de la
                    requête, ni dans l'URL.
                </DocTip>
            </DocSection>

            <DocSection title="Authentification">
                <DocParagraph>
                    Toutes les routes documentées ici sont protégées et nécessitent une authentification.
                </DocParagraph>
                <DocLink to="/documentation/api/authentification">Voir les méthodes d'authentification</DocLink>
            </DocSection>

            <DocSection title="Gestion des erreurs">
                <DocParagraph>Toutes les erreurs sont retournées avec un message en français :</DocParagraph>
                <DocTable
                    headers={["Code", "Signification"]}
                    rows={[
                        ["400", "Requête invalide - erreur de validation, règle métier non respectée"],
                        ["401", "Non autorisé - session manquante/invalide, permissions insuffisantes"],
                        ["404", "Non trouvé - la route n'existe pas"],
                        ["500", "Erreur interne du serveur"],
                    ]}
                />
                <DocParagraph>Les messages d'erreur courants incluent :</DocParagraph>
                <DocTable
                    headers={["Message", "Signification"]}
                    rows={[
                        ["\"Vous n'êtes pas administrateur de l'organisation\"", "Accès administrateur requis"],
                        ['"Données invalides"', "La validation du corps de la requête a échoué"],
                        ['"Fichier trop volumineux"', "Le fichier dépasse la limite de 50 Mo"],
                        ['"Limite de stockage atteinte"', "Limite de stockage de l'organisation atteinte"],
                    ]}
                />
            </DocSection>

            <DocSection title="Catégories de routes">
                <DocParagraph>
                    L'API expose 90 routes protégées réparties en 17 catégories. Le tableau ci-dessous résume chaque
                    catégorie :
                </DocParagraph>
                <DocTable
                    headers={["#", "Catégorie", "Routes", "Scope"]}
                    rows={[
                        ["1", "Paramètres d'organisation", "3", "Organisation"],
                        ["2", "Clés API", "3", "Organisation"],
                        ["3", "Abonnement et paiements", "4", "Organisation"],
                        ["4", "Utilisateurs d'organisation", "5", "Organisation"],
                        ["5", "Exercices", "9", "Organisation"],
                        ["6", "Comptes", "5", "Exercice"],
                        ["7", "Journaux", "5", "Exercice"],
                        ["8", "Bilans", "5", "Exercice"],
                        ["9", "Comptes de résultat", "5", "Exercice"],
                        ["10", "Calculs", "5", "Exercice"],
                        ["11", "Calculs - comptes de résultat", "5", "Exercice"],
                        ["12", "Libellés d'écriture", "5", "Exercice"],
                        ["13", "Écritures", "8", "Exercice"],
                        ["14", "Mouvements", "6", "Exercice"],
                        ["15", "Fichiers", "7", "Exercice"],
                        ["16", "Dossiers", "5", "Exercice"],
                        ["17", "Documents et rapports", "5", "Exercice"],
                    ]}
                />
            </DocSection>

            <DocNextPage to="/documentation/api/authentification" label="Authentification" />
        </DocRoot>
    )
}
