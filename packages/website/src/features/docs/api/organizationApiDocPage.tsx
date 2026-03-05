import {
    cancelSubscriptionRouteDefinition,
    createFirstPaymentRouteDefinition,
    createOneApiKeyRouteDefinition,
    createOneOrganizationUserRouteDefinition,
    createOneYearRouteDefinition,
    deleteOneApiKeyRouteDefinition,
    deleteOneOrganizationRouteDefinition,
    deleteOneOrganizationUserRouteDefinition,
    readAllApiKeysRouteDefinition,
    readAllOrganizationPaymentsRouteDefinition,
    readAllOrganizationUsersRouteDefinition,
    readAllYearsRouteDefinition,
    readOneOrganizationRouteDefinition,
    readOneOrganizationUserRouteDefinition,
    readOrganizationSubscriptionRouteDefinition,
    updateOneOrganizationRouteDefinition,
    updateOneOrganizationUserRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocNextPage } from "../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocRouteRequest } from "../../../components/document/docRouteRequest.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function OrganizationApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Organisation"
                description="Paramètres de l'organisation, des exercices, des utilisateurs, des clés API et de l'abonnement/paiements"
            />

            <DocSection title="Paramètres d'organisation">
                <DocParagraph>
                    Lecture, modification et suppression de l'organisation. Les routes de modification et suppression
                    nécessitent que l'utilisateur soit administrateur.
                </DocParagraph>
                <DocRouteRequest
                    routeDefinition={readOneOrganizationRouteDefinition}
                    description="Lire les détails de l'organisation active. Aucun champ requis dans le corps."
                />
                <DocRouteRequest
                    routeDefinition={updateOneOrganizationRouteDefinition}
                    description="Modifier les détails de l'organisation. Nécessite le rôle administrateur."
                />
                <DocRouteRequest
                    routeDefinition={deleteOneOrganizationRouteDefinition}
                    description="Supprimer l'organisation et toutes ses données. Nécessite le rôle administrateur."
                />
                <DocTip variant="warning">
                    La suppression d'une organisation est irréversible et supprime toutes les données associées. Cela
                    supprimera également la clé utilisée pour la suppression.
                </DocTip>
            </DocSection>

            <DocSection title="Clés API">
                <DocParagraph>
                    Gestion des clés API de l'organisation. Nécessite un abonnement premium actif.
                </DocParagraph>
                <DocRouteRequest
                    routeDefinition={createOneApiKeyRouteDefinition}
                    description="Retourne l'objet clé API avec le champ rawKey."
                />
                <DocRouteRequest routeDefinition={readAllApiKeysRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneApiKeyRouteDefinition} />
                <DocTip variant="info">
                    La clé brute (<code>rawKey</code>) n'est retournée qu'au moment de la création. Conservez-la
                    précieusement.
                </DocTip>
            </DocSection>

            <DocSection title="Abonnement et paiements">
                <DocParagraph>
                    Gestion de l'abonnement premium et de l'historique des paiements. Les routes de paiement et
                    d'annulation nécessitent le rôle administrateur.
                </DocParagraph>
                <DocRouteRequest routeDefinition={readOrganizationSubscriptionRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={createFirstPaymentRouteDefinition}
                    description="Initier le premier paiement. Retourne un objet { checkoutUrl: string } vers lequel l'utilisateur doit être redirigé pour procéder au paiement."
                />
                <DocRouteRequest routeDefinition={cancelSubscriptionRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllOrganizationPaymentsRouteDefinition} />
            </DocSection>

            <DocSection title="Utilisateurs d'organisation">
                <DocParagraph>Gestion des membres d'une organisation.</DocParagraph>
                <DocRouteRequest
                    routeDefinition={createOneOrganizationUserRouteDefinition}
                    description="Inviter un utilisateur dans l'organisation."
                />
                <DocRouteRequest routeDefinition={readAllOrganizationUsersRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneOrganizationUserRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneOrganizationUserRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneOrganizationUserRouteDefinition} />
            </DocSection>

            <DocSection title="Exercices">
                <DocParagraph>Création et listing des exercices comptables d'une organisation.</DocParagraph>
                <DocRouteRequest routeDefinition={createOneYearRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllYearsRouteDefinition} />
            </DocSection>

            <DocNextPage to="/documentation/api/comptabilité" label="Comptabilité" />
        </DocRoot>
    )
}
