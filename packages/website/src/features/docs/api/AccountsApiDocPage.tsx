import {
    createOneAccountRouteDefinition,
    deleteOneAccountRouteDefinition,
    readAllAccountsRouteDefinition,
    readOneAccountRouteDefinition,
    updateOneAccountRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"

export function AccountsApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Comptes"
                description="Plan comptable de l'exercice : création, lecture, modification et suppression des comptes"
            />

            <DocSection title="Comptes">
                <DocParagraph>
                    Le plan comptable de l'exercice. Les comptes sont organisés en arborescence avec des classes (1 à 7)
                    à la racine.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneAccountRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllAccountsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneAccountRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneAccountRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneAccountRouteDefinition} />
            </DocSection>
        </DocRoot>
    )
}
