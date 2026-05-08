import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { getScenarioBySlug } from "../../../../../features/docs/accounting/scenarios/scenariosData.js"
import { scenariosAccountingDocLayoutRoute } from "./scenariosAccountingDocLayoutRoute.js"

export const scenarioAccountingDocRoute = createRoute({
    getParentRoute: () => scenariosAccountingDocLayoutRoute,
    path: "/$scenario",
    beforeLoad: ({ params }) => {
        const entry = getScenarioBySlug(params.scenario)

        return {
            title: entry ? `${entry.title} - Scénario comptable` : "Scénario introuvable",
            description: entry
                ? `Scénario lié au compte ${entry.primaryAccountNumber} (${entry.primaryAccountLabel}).`
                : "Ce scénario comptable n'a pas été trouvé.",
        }
    },
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/scenarios/scenarioAccountingDocPage.tsx"),
        "ScenarioAccountingDocPage",
    ),
})
