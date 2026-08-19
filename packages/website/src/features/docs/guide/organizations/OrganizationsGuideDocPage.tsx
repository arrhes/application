import {
    deleteOneOrganizationRouteDefinition,
    readOneOrganizationRouteDefinition,
    updateOneOrganizationRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocDefinition } from "../../../../components/document/DocDefinition.js"
import { DocExample } from "../../../../components/document/DocExample.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../../components/document/DocImplementationTabs.js"
import { DocLink } from "../../../../components/document/DocLink.js"
import { DocList } from "../../../../components/document/DocList.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function OrganizationsGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Organisations"
                description="Créer et administrer vos structures comptables"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Une organisation représente une entité comptable : une entreprise, une association ou toute autre
                    structure nécessitant un suivi comptable. Chaque organisation possède ses propres exercices,
                    écritures, membres et paramètres.
                </DocParagraph>
                <DocList
                    items={[
                        "Un compte utilisateur peut appartenir à plusieurs organisations.",
                        "Le type d'organisation (entreprise ou association) détermine le plan comptable par défaut.",
                        "Les membres d'une organisation peuvent avoir des rôles différents (administrateur ou membre).",
                    ]}
                />
            </DocSection>

            <DocSection title="Types d'organisations">
                <DocDefinition term="Entreprise">
                    <DocParagraph>
                        Plan comptable général (PCG) adapté aux sociétés commerciales. Inclut les comptes de TVA, de
                        capital social, etc.
                    </DocParagraph>
                </DocDefinition>
                <DocDefinition term="Association">
                    <DocParagraph>
                        Plan comptable des associations. Inclut les comptes spécifiques comme les cotisations (756), les
                        subventions (74), les fonds associatifs…
                    </DocParagraph>
                </DocDefinition>
                <DocTip variant="info">
                    Le type d'organisation est défini à la création et ne peut pas être modifié ensuite.
                </DocTip>
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Depuis le dashboard, vous pouvez créer des organisations, modifier leurs paramètres et
                                gérer leurs membres.
                            </DocParagraph>
                            <DocExample title="Modifier les paramètres">
                                <DocList
                                    items={[
                                        "Accédez à votre organisation",
                                        "Cliquez sur l'onglet « Paramètres »",
                                        "Modifiez les informations souhaitées (nom, SIREN, email de contact)",
                                        "Enregistrez les modifications",
                                    ]}
                                />
                            </DocExample>
                            <DocSection
                                title="Gestion des membres"
                                depth={1}
                            >
                                <DocParagraph>
                                    Vous pouvez inviter d'autres personnes à accéder à votre organisation. Chaque membre
                                    peut avoir des droits différents.
                                </DocParagraph>
                                <DocDefinition term="Administrateur">
                                    Accès complet : peut modifier les paramètres, inviter des membres, supprimer
                                    l'organisation.
                                </DocDefinition>
                                <DocDefinition term="Membre">
                                    Accès limité : peut{" "}
                                    <DocLink to="/documentation/guide/écritures">saisir des écritures</DocLink> et{" "}
                                    <DocLink to="/documentation/guide/documents">
                                        consulter les documents de synthèse
                                    </DocLink>
                                    , mais ne peut pas modifier les paramètres.
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
                            </DocSection>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                L'API permet de lire, modifier et supprimer l'organisation active. La modification et la
                                suppression nécessitent le rôle administrateur.
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
                                La suppression d'une organisation est irréversible et supprime toutes les données
                                associées.
                            </DocTip>
                        </>
                    }
                    cli={
                        <>
                            <DocParagraph>
                                Le CLI expose la commande <DocCode>comptasse org</DocCode> pour consulter et modifier
                                l'organisation configurée.
                            </DocParagraph>
                            <DocTable
                                headers={[
                                    "Commande",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        <DocCode key="0">comptasse org get</DocCode>,
                                        "Affiche les détails de l'organisation",
                                    ],
                                    [
                                        <DocCode key="0">comptasse org update</DocCode>,
                                        "Modifie les informations de l'organisation",
                                    ],
                                    [
                                        <DocCode key="0">comptasse org delete</DocCode>,
                                        "Supprime l'organisation et toutes ses données",
                                    ],
                                ]}
                            />
                            <DocExample title="Modifier le nom">
                                <DocCodeBlock>comptasse org update --name "Ma Société"</DocCodeBlock>
                            </DocExample>
                            <DocExample title="Modifier plusieurs champs">
                                <DocCodeBlock>
                                    comptasse org update --email contact@example.com --siren 123456789
                                </DocCodeBlock>
                            </DocExample>
                            <DocTip variant="warning">
                                La suppression est irréversible et supprime tous les exercices, écritures et fichiers
                                associés.
                            </DocTip>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
