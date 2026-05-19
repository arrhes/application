import {
    createOneTagRouteDefinition,
    deleteOneTagRouteDefinition,
    readAllTagsRouteDefinition,
    readOneTagRouteDefinition,
    updateOneTagRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"

export function TagsApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Libellés"
                description="Libellés d'écriture réutilisables pour catégoriser les écritures comptables"
            />

            <DocSection title="Libellés d'écriture">
                <DocParagraph>
                    Les libellés (tags) permettent de catégoriser les écritures comptables avec des étiquettes
                    réutilisables définies au niveau de l'exercice.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneTagRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllTagsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneTagRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneTagRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneTagRouteDefinition} />
            </DocSection>
        </DocRoot>
    )
}
