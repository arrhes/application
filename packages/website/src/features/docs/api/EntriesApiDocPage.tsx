import {
    addOneEntryTagRouteDefinition,
    computeOneEntryRouteDefinition,
    createOneEntryFromTemplateRouteDefinition,
    createOneEntryLineRouteDefinition,
    createOneEntryRouteDefinition,
    deleteOneEntryLineRouteDefinition,
    deleteOneEntryRouteDefinition,
    duplicateOneEntryRouteDefinition,
    readAllEntriesRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readAllEntryTagsRouteDefinition,
    readOneEntryLineRouteDefinition,
    readOneEntryRouteDefinition,
    removeOneEntryTagRouteDefinition,
    reverseOneEntryRouteDefinition,
    updateManyEntryLinesRouteDefinition,
    updateOneEntryLineRouteDefinition,
    updateOneEntryRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"

export function EntriesApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Écritures"
                description="Écritures comptables et tags associés"
            />

            <DocSection title="Écritures">
                <DocParagraph>
                    Les écritures comptables sont les opérations enregistrées dans les journaux. Chaque écriture
                    contient une ou plusieurs lignes (débit/crédit).
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneEntryRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={createOneEntryFromTemplateRouteDefinition}
                    description="Créer une écriture avec des lignes pré-remplies en une seule requête."
                />
                <DocRouteRequest routeDefinition={readAllEntriesRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllEntryTagsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={duplicateOneEntryRouteDefinition} />
                <DocRouteRequest routeDefinition={computeOneEntryRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={reverseOneEntryRouteDefinition}
                    description="Créer une écriture de contre-passation (inversion des débits et crédits)."
                />
            </DocSection>

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
