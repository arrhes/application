import { createRoute } from "@tanstack/react-router"
import { PrivacyGeneralDocPage } from "../../../../features/docs/general/privacyGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const privacyGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/confidentialité",
    beforeLoad: () => ({
        title: "Politique de confidentialité",
    }),
    component: () => <PrivacyGeneralDocPage />,
})
