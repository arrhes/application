import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.tsx"
import { ClassesAccountingDocPage } from "../../../../../features/docs/accounting/introduction/ClassesAccountingDocPage.js"


export const classesAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/classes",
    beforeLoad: () => ({
        title: "Classes de comptes",
        description:
            "Les 8 classes du plan comptable général français : comptes de bilan (1 à 5) et comptes de gestion (6 et 7).",
    }),
    component: () => (
        <DocRoot>
            <ClassesAccountingDocPage />
        </DocRoot>
    ),
})
