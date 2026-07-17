import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "./docsLayoutRoute.tsx"

const LazyPrivacyGeneralDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/general/PrivacyGeneralDocPage.tsx"),
)

export const privacyGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/confidentialité",
    beforeLoad: () => ({
        title: "Politique de confidentialité",
        description:
            "Politique de confidentialité d'Arrhes. Découvrez comment nous protégeons vos données personnelles et comptables.",
    }),
    component: () => (
        <DocRoot>
            <LazyPrivacyGeneralDocPage />
        </DocRoot>
    ),
})
