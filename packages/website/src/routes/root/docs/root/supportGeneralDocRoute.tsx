import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"
import { SupportGeneralDocPage } from "../../../../features/docs/general/SupportGeneralDocPage.js"


export const supportGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/support",
    beforeLoad: () => ({
        title: "Support",
        description:
            "Besoin d'aide avec Arrhes ? Contactez notre support ou consultez la documentation pour résoudre vos problèmes.",
    }),
    component: () => (
        <DocRoot>
            <SupportGeneralDocPage />
        </DocRoot>
    ),
})
