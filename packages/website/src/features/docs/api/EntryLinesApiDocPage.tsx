import {
    addOneEntryTagRouteDefinition,
    createOneEntryLineRouteDefinition,
    deleteOneEntryLineRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readOneEntryLineRouteDefinition,
    removeOneEntryTagRouteDefinition,
    updateManyEntryLinesRouteDefinition,
    updateOneEntryLineRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"

export function EntryLinesApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Lignes d'écriture"
                description="Lignes de débit/crédit et tags des écritures comptables"
            />

            <DocSection title="Lignes d'écriture">
                <DocParagraph>
                    Chaque ligne d'écriture représente un mouvement de débit ou de crédit sur un compte.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneEntryLineRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllEntryLinesRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneEntryLineRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneEntryLineRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={updateManyEntryLinesRouteDefinition}
                    description="Modifier en masse toutes les lignes d'une écriture."
                />
                <DocRouteRequest routeDefinition={deleteOneEntryLineRouteDefinition} />
            </DocSection>

            <DocSection title="Tags d'écriture">
                <DocParagraph>Association de libellés (tags) à une écriture pour la catégoriser.</DocParagraph>
                <DocRouteRequest routeDefinition={addOneEntryTagRouteDefinition} />
                <DocRouteRequest routeDefinition={removeOneEntryTagRouteDefinition} />
            </DocSection>
        </DocRoot>
    )
}
