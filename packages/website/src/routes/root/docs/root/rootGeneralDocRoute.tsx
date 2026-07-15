import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

const LazyRootGeneralDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/general/RootGeneralDocPage.tsx"),
)

export const rootGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documentation",
        description:
            "Documentation complète d'Arrhes : guide d'utilisation, cours de comptabilité, référence API et informations générales.",
    }),
    component: () => (
        <DocRoot>
            <LazyRootGeneralDocPage />
        </DocRoot>
    ),
})
