import { createRoute } from "@tanstack/react-router"
import { WhitepaperGeneralDocPage } from "../../../../features/docs/general/whitepaperGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const whitepaperGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
    }),
    component: () => <WhitepaperGeneralDocPage />,
})
