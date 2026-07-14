import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/dashboard/InventoryDashboardDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const inventoryGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/inventaire",
    beforeLoad: () => ({
        title: "Inventaire",
        description:
            "Gérez votre stock dans Arrhes : création d'articles, suivi des mouvements et alertes de seuil minimal.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
