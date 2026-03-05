import { createRoute } from "@tanstack/react-router"
import { SupportGeneralDocPage } from "../../../../features/docs/general/supportGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const supportGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
    }),
    component: () => <SupportGeneralDocPage />,
})
