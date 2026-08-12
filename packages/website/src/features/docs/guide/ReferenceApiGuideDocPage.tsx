import { DocCode } from "../../../components/document/DocCode.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function ReferenceApiGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Référence API"
                description="Conventions, codes d'erreur et catalogue des endpoints de l'API Comptasse"
            />

            <DocSection title="Conventions">
                <DocParagraph>L'API de Comptasse suit les conventions REST standard :</DocParagraph>
                <DocList
                    items={[
                        "GET pour la lecture, POST pour la création, PATCH pour la modification, DELETE pour la suppression",
                        "Le corps de la requête et la réponse sont en JSON",
                        "Les dates suivent le format ISO 8601",
                        'Les montants (débit, crédit) sont des chaînes numériques (ex : "100.00")',
                    ]}
                />
                <DocTip variant="info">
                    Les identifiants d'entités (idYear, idEntry, idAccount, etc.) sont passés dans les paramètres d'URL
                    (ex : <DocCode>:idOrganization</DocCode>, <DocCode>:idYear</DocCode>). L'organisation est identifiée
                    via le token d'authentification ou l'en-tête <DocCode>X-Organization-Id</DocCode>, et non dans le
                    corps de la requête.
                </DocTip>
                <DocTip variant="warning">
                    Les chemins affichés dans les pages de référence n'incluent pas le préfixe de version{" "}
                    <DocCode>/v1</DocCode>. Si vous appelez l'API directement, préfixez chaque chemin avec{" "}
                    <DocCode>/v1</DocCode>.
                </DocTip>
            </DocSection>

            <DocSection title="Authentification">
                <DocParagraph>
                    Toutes les routes sont protégées et nécessitent une authentification. Consultez la page{" "}
                    <DocLink to="/documentation/guide/authentification">Authentification</DocLink> pour les méthodes
                    disponibles.
                </DocParagraph>
            </DocSection>

            <DocSection title="Gestion des erreurs">
                <DocParagraph>Toutes les erreurs sont retournées avec un message en français :</DocParagraph>
                <DocTable
                    headers={[
                        "Code",
                        "Signification",
                    ]}
                    rows={[
                        [
                            "400",
                            "Requête invalide - erreur de validation, règle métier non respectée",
                        ],
                        [
                            "401",
                            "Non autorisé - session manquante/invalide, permissions insuffisantes",
                        ],
                        [
                            "404",
                            "Non trouvé - la route n'existe pas",
                        ],
                        [
                            "500",
                            "Erreur interne du serveur",
                        ],
                    ]}
                />
                <DocParagraph>Les messages d'erreur courants incluent :</DocParagraph>
                <DocTable
                    headers={[
                        "Message",
                        "Signification",
                    ]}
                    rows={[
                        [
                            "Vous n'êtes pas administrateur de l'organisation",
                            "Accès administrateur requis",
                        ],
                        [
                            "Données invalides",
                            "La validation du corps de la requête a échoué",
                        ],
                        [
                            "Fichier trop volumineux",
                            "Le fichier dépasse la limite de 50 Mo",
                        ],
                        [
                            "Limite de stockage atteinte",
                            "Limite de stockage de l'organisation atteinte",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="Catégories de routes">
                <DocParagraph>
                    L'API expose 120 routes protégées réparties en 21 catégories. Le tableau ci-dessous résume chaque
                    catégorie :
                </DocParagraph>
                <DocTable
                    headers={[
                        "#",
                        "Catégorie",
                        "Routes",
                        "Scope",
                    ]}
                    rows={[
                        [
                            "1",
                            "Organisations",
                            "3",
                            "Utilisateur",
                        ],
                        [
                            "2",
                            "Paramètres d'organisation",
                            "3",
                            "Organisation",
                        ],
                        [
                            "3",
                            "Clés API",
                            "3",
                            "Organisation",
                        ],
                        [
                            "4",
                            "Abonnement et paiements",
                            "17",
                            "Organisation",
                        ],
                        [
                            "5",
                            "Utilisateurs d'organisation",
                            "5",
                            "Organisation",
                        ],
                        [
                            "6",
                            "Exercices",
                            "9",
                            "Organisation / Exercice",
                        ],
                        [
                            "7",
                            "Comptes",
                            "5",
                            "Exercice",
                        ],
                        [
                            "8",
                            "Journaux",
                            "5",
                            "Exercice",
                        ],
                        [
                            "9",
                            "Bilans",
                            "5",
                            "Exercice",
                        ],
                        [
                            "10",
                            "Comptes de résultat",
                            "5",
                            "Exercice",
                        ],
                        [
                            "11",
                            "Calculs",
                            "5",
                            "Exercice",
                        ],
                        [
                            "12",
                            "Calculs - comptes de résultat",
                            "5",
                            "Exercice",
                        ],
                        [
                            "13",
                            "Libellés d'écriture",
                            "5",
                            "Exercice",
                        ],
                        [
                            "14",
                            "Écritures",
                            "10",
                            "Exercice",
                        ],
                        [
                            "15",
                            "Lignes d'écriture",
                            "6",
                            "Exercice",
                        ],
                        [
                            "16",
                            "Tags d'écriture",
                            "2",
                            "Exercice",
                        ],
                        [
                            "17",
                            "Fichiers",
                            "10",
                            "Exercice",
                        ],
                        [
                            "18",
                            "Dossiers",
                            "5",
                            "Exercice",
                        ],
                        [
                            "19",
                            "Rapports XBRL",
                            "2",
                            "Exercice",
                        ],
                        [
                            "20",
                            "Articles d'inventaire",
                            "5",
                            "Exercice",
                        ],
                        [
                            "21",
                            "Mouvements d'inventaire",
                            "5",
                            "Exercice",
                        ],
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
