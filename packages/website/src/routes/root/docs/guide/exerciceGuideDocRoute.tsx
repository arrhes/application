import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/ExerciceGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const exerciceGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
        description: "Créez et gérez le cycle de vie de vos exercices comptables dans Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
