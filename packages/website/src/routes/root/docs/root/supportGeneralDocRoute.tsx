import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "./docsLayoutRoute.tsx"

const LazySupportGeneralDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/general/SupportGeneralDocPage.tsx"),
)

export const supportGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
        description:
            "Besoin d'aide avec Arrhes ? Contactez notre support ou consultez la documentation pour résoudre vos problèmes.",
    }),
    component: () => (
        <DocRoot>
            <LazySupportGeneralDocPage />
        </DocRoot>
    ),
})
