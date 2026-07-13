import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/ai/ModelsAiDocPage.mdx"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const modelsAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/modèles",
    beforeLoad: () => ({
        title: "Modèles IA",
        description: "Les modèles de langage utilisés par l'assistant comptable d'Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
