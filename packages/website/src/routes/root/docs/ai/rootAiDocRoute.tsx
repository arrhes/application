import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/ai/RootAiDocPage.mdx"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const rootAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Assistant IA",
        description:
            "Documentation de l'assistant IA d'Arrhes : un assistant comptable intelligent pour gérer vos données.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
