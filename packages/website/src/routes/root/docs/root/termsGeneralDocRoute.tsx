import { createRoute } from "@tanstack/react-router"
import { TermsGeneralDocPage } from "../../../../features/docs/general/termsGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const termsGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/cgu",
    beforeLoad: () => ({
        title: "CGU",
    }),
    component: () => <TermsGeneralDocPage />,
})
