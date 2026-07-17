import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { docsLayoutRoute } from "../docsLayoutRoute.js"
import { PrivacyGeneralDocPage } from "../../../../features/docs/general/PrivacyGeneralDocPage.js"


export const privacyGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/confidentialité",
    beforeLoad: () => ({
        title: "Politique de confidentialité",
        description:
            "Politique de confidentialité d'Arrhes. Découvrez comment nous protégeons vos données personnelles et comptables.",
    }),
    component: () => (
        <DocRoot>
            <PrivacyGeneralDocPage />
        </DocRoot>
    ),
})
