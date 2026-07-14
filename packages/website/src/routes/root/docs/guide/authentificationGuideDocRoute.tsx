import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/AuthentificationGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const authentificationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification",
        description: "Authentifiez-vous sur Arrhes : connexion au dashboard, clés API et connexion du CLI.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
