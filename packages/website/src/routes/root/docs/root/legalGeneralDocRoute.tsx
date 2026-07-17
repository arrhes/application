import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"
import { LegalGeneralDocPage } from "../../../../features/docs/general/LegalGeneralDocPage.js"


export const legalGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
        description: "Mentions légales du logiciel de comptabilité Arrhes. Informations sur l'éditeur et l'hébergeur.",
    }),
    component: () => (
        <DocRoot>
            <LegalGeneralDocPage />
        </DocRoot>
    ),
})
