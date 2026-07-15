import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

const LazyInstallationGuideDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/guide/InstallationGuideDocPage.tsx"),
)

export const installationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/installation",
    beforeLoad: () => ({
        title: "Installation",
        description:
            "Mettez en place Arrhes : installation du CLI, conventions de l'API et premiers pas sur le dashboard.",
    }),
    component: () => (
        <DocRoot>
            <LazyInstallationGuideDocPage />
        </DocRoot>
    ),
})
