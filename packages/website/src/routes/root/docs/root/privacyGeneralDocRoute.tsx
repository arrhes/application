import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { PrivacyGeneralDocPage } from "../../../../features/docs/general/PrivacyGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const privacyGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
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
