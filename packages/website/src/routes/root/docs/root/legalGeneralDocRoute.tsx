import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

const LazyLegalGeneralDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/general/LegalGeneralDocPage.tsx"),
)

export const legalGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
        description: "Mentions légales du logiciel de comptabilité Arrhes. Informations sur l'éditeur et l'hébergeur.",
    }),
    component: () => (
        <DocRoot>
            <LazyLegalGeneralDocPage />
        </DocRoot>
    ),
})
