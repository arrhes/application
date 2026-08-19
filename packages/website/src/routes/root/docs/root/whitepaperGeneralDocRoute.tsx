import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { WhitepaperGeneralDocPage } from "../../../../features/docs/project/WhitepaperGeneralDocPage.js"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const whitepaperGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/philosophie",
    beforeLoad: () => ({
        title: "Philosophie",
        description:
            "La philosophie de Comptasse : transparence, open source et accessibilité pour la comptabilité des entreprises et associations.",
    }),
    component: () => (
        <DocRoot>
            <WhitepaperGeneralDocPage />
        </DocRoot>
    ),
})
