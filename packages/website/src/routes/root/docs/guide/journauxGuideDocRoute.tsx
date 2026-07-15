import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/JournauxGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const journauxGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/journaux",
    beforeLoad: () => ({
        title: "Journaux",
        description: "Journaux comptables de l'exercice : création, modification et suppression.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
