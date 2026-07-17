import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"
import { WhitepaperGeneralDocPage } from "../../../../features/docs/general/WhitepaperGeneralDocPage.js"


export const whitepaperGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
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
