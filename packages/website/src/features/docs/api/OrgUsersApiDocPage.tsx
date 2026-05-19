import {
    activateOrganizationMembershipRouteDefinition,
    createOneOrganizationUserRouteDefinition,
    deleteOneOrganizationUserRouteDefinition,
    readAllOrganizationUsersRouteDefinition,
    readOneOrganizationUserRouteDefinition,
    updateOneOrganizationUserRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"

export function OrgUsersApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Membres"
                description="Gestion des membres d'une organisation"
            />

            <DocSection title="Membres">
                <DocParagraph>
                    Invitation, lecture, modification et suppression des membres d'une organisation.
                </DocParagraph>
                <DocRouteRequest
                    routeDefinition={createOneOrganizationUserRouteDefinition}
                    description="Inviter un utilisateur dans l'organisation."
                />
                <DocRouteRequest routeDefinition={readAllOrganizationUsersRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneOrganizationUserRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneOrganizationUserRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneOrganizationUserRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={activateOrganizationMembershipRouteDefinition}
                    description="Activer une invitation à rejoindre l'organisation."
                />
            </DocSection>
        </DocRoot>
    )
}
