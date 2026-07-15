import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/MembresGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const membresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
        description: "Gestion des membres d'une organisation : invitation, rôles et suppression.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
