import {
    createOneBalanceSheetRouteDefinition,
    deleteOneBalanceSheetRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
    readOneBalanceSheetRouteDefinition,
    updateOneBalanceSheetRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"

export function BalanceSheetsApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Bilans"
                description="Structure du bilan comptable de l'exercice : actif et passif"
            />

            <DocSection title="Bilans">
                <DocParagraph>
                    Structure du bilan comptable (actif et passif). Les lignes de bilan sont liées aux comptes pour
                    calculer automatiquement les soldes.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneBalanceSheetRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllBalanceSheetsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneBalanceSheetRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneBalanceSheetRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneBalanceSheetRouteDefinition} />
            </DocSection>
        </DocRoot>
    )
}
