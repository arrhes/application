import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "./docsLayoutRoute.tsx"

const LazyWhitepaperGeneralDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/general/WhitepaperGeneralDocPage.tsx"),
)

export const whitepaperGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
        description:
            "La philosophie d'Arrhes : transparence, open source et accessibilité pour la comptabilité des entreprises et associations.",
    }),
    component: () => (
        <DocRoot>
            <LazyWhitepaperGeneralDocPage />
        </DocRoot>
    ),
})
