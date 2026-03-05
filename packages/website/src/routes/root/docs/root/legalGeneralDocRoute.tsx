import { createRoute } from "@tanstack/react-router"
import { LegalGeneralDocPage } from "../../../../features/docs/general/legalGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const legalGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
    }),
    component: () => <LegalGeneralDocPage />,
})
