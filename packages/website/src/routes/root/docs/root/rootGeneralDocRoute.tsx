import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { RootGeneralDocPage } from "../../../../features/docs/general/RootGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const rootGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Documentation",
        description:
            "Documentation complète d'Arrhes : guide d'utilisation, cours de comptabilité, référence API et informations générales.",
    }),
    component: () => (
        <DocRoot>
            <RootGeneralDocPage />
        </DocRoot>
    ),
})
