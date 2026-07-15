import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.js"

const LazyDoubleEntryAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/introduction/DoubleEntryAccountingDocPage.tsx"),
)

export const doubleEntryAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/partie-double",
    beforeLoad: () => ({
        title: "La partie double",
        description:
            "Comprendre le principe de la partie double en comptabilité : chaque opération génère au moins un débit et un crédit.",
    }),
    component: () => (
        <DocRoot>
            <LazyDoubleEntryAccountingDocPage />
        </DocRoot>
    ),
})
