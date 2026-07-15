import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { WhitepaperGeneralDocPage } from "../../../../features/docs/general/WhitepaperGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const whitepaperGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
        description:
            "La philosophie d'Arrhes : transparence, open source et accessibilité pour la comptabilité des entreprises et associations.",
    }),
    component: () => (
        <DocRoot>
            <WhitepaperGeneralDocPage />
        </DocRoot>
    ),
})
