import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { SupportGeneralDocPage } from "../../../../features/docs/project/SupportGeneralDocPage.js"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const supportGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
        description:
            "Besoin d'aide avec Comptasse ? Contactez notre support ou consultez la documentation pour résoudre vos problèmes.",
    }),
    component: () => (
        <DocRoot>
            <SupportGeneralDocPage />
        </DocRoot>
    ),
})
