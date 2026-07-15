import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { SupportGeneralDocPage } from "../../../../features/docs/general/SupportGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const supportGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
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
