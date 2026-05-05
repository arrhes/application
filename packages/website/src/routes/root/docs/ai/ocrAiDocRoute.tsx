import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { aiDocLayoutRoute } from "./aiDocLayoutRoute.tsx"

export const ocrAiDocRoute = createRoute({
    getParentRoute: () => aiDocLayoutRoute,
    path: "/ocr",
    beforeLoad: () => ({
        title: "OCR",
        description: "Reconnaissance optique de caractères pour l'extraction automatique de données comptables.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/ai/ocrAiDocPage.tsx"), "OcrAiDocPage"),
})
