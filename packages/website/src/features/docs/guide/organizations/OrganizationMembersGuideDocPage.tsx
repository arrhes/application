import {
    activateOrganizationMembershipRouteDefinition,
    createOneOrganizationUserRouteDefinition,
    deleteOneOrganizationUserRouteDefinition,
    readAllOrganizationUsersRouteDefinition,
    readOneOrganizationUserRouteDefinition,
    updateOneOrganizationUserRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocDefinition } from "../../../../components/document/DocDefinition.js"
import { DocExample } from "../../../../components/document/DocExample.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../../components/document/DocImplementationTabs.js"
import { DocList } from "../../../../components/document/DocList.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function OrganizationMembersGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Membres"
                description="Inviter et gérer les accès au sein d'une organisation"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Les membres d'une organisation peuvent accéder aux exercices, saisir des écritures et consulter les
                    rapports. Chaque membre se voit attribuer un rôle définissant ses permissions.
                </DocParagraph>
                <DocList
                    items={[
                        "Un compte utilisateur peut appartenir à plusieurs organisations.",
                        "Les rôles sont définis au niveau de l'organisation.",
                        "L'invitation d'un membre se fait par email.",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocDefinition term="Administrateur">
                                Accès complet : peut modifier les paramètres, inviter des membres, supprimer
                                l'organisation.
                            </DocDefinition>
                            <DocDefinition term="Membre">
                                Accès limité : peut saisir des écritures et consulter les documents de synthèse, mais ne
                                peut pas modifier les paramètres.
                            </DocDefinition>
                            <DocExample title="Inviter un membre">
                                <DocList
                                    items={[
                                        "Allez dans votre organisation",
                                        "Cliquez sur Membres",
                                        "Cliquez sur « Inviter un membre »",
                                        "Entrez l'adresse email de la personne",
                                        "Choisissez son rôle (Administrateur ou Membre)",
                                        "Envoyez l'invitation",
                                    ]}
                                />
                            </DocExample>
                        </>
                    }
                    api={
                        <>
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
                        </>
                    }
                    cli={
                        <>
                            <DocTable
                                headers={[
                                    "Commande",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        <DocCode key="0">comptasse members list</DocCode>,
                                        "Liste les membres",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse members get <idMember>"}</DocCode>,
                                        "Détails d'un membre",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse members invite --email <email> [--admin]"}
                                        </DocCode>,
                                        "Invite un utilisateur",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse members update <idMember> --admin/--no-admin"}
                                        </DocCode>,
                                        "Modifie les droits",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse members remove <idMember>"}</DocCode>,
                                        "Retire un membre",
                                    ],
                                ]}
                            />
                            <DocExample title="Inviter un administrateur">
                                <DocCodeBlock>comptasse members invite --email admin@example.com --admin</DocCodeBlock>
                            </DocExample>
                            <DocTip variant="warning">
                                La suppression d'un membre est irréversible. L'utilisateur devra être réinvité pour
                                retrouver l'accès.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
