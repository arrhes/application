import { createRoute } from "@tanstack/react-router"
import { RootGeneralDocPage } from "../../../../features/docs/general/rootGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const rootGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documentation",
    }),
    component: () => <RootGeneralDocPage />,
})
