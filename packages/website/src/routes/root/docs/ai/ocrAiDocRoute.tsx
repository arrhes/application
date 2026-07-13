import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/ai/OcrAiDocPage.mdx"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const ocrAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/ocr",
    beforeLoad: () => ({
        title: "OCR",
        description: "Reconnaissance optique de caractères pour l'extraction automatique de données comptables.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
