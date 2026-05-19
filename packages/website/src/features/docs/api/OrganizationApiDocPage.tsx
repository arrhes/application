import {
    deleteOneOrganizationRouteDefinition,
    readOneOrganizationRouteDefinition,
    updateOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"
import { DocTip } from "../../../components/document/DocTip.tsx"

export function OrganizationApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Organisation"
                description="Gestion des organisations et de leurs paramètres"
            />

            <DocSection title="Paramètres d'organisation">
                <DocParagraph>
                    Lecture, modification et suppression de l'organisation. La modification et la suppression
                    nécessitent que l'utilisateur soit administrateur.
                </DocParagraph>
                <DocRouteRequest
                    routeDefinition={readOneOrganizationRouteDefinition}
                    description="Lire les détails de l'organisation active."
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
                    La suppression d'une organisation est irréversible et supprime toutes les données associées.
                </DocTip>
            </DocSection>
        </DocRoot>
    )
}
