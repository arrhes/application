import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/ai/ToolsAiDocPage.mdx"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const toolsAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/outils",
    beforeLoad: () => ({
        title: "Outils de l'assistant",
        description: "Liste complète des outils disponibles pour l'assistant comptable IA d'Arrhes.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
