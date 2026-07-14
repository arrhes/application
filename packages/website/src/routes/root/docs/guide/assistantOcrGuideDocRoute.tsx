import { createRoute } from "@tanstack/react-router"
import { OcrAiDocPage } from "../../../../features/docs/ai/OcrAiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const assistantOcrGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/assistant/ocr",
    beforeLoad: () => ({
        title: "OCR",
        description: "Extraction automatique de texte depuis vos pièces justificatives.",
    }),
    component: OcrAiDocPage,
})
