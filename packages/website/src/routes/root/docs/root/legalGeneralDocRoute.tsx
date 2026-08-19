import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { LegalGeneralDocPage } from "../../../../features/docs/project/LegalGeneralDocPage.js"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const legalGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
        description:
            "Mentions légales du logiciel de comptabilité Comptasse. Informations sur l'éditeur et l'hébergeur.",
    }),
    component: () => (
        <DocRoot>
            <LegalGeneralDocPage />
        </DocRoot>
    ),
})
