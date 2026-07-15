import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { TermsGeneralDocPage } from "../../../../features/docs/general/TermsGeneralDocPage.tsx"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const termsGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/cgu",
    beforeLoad: () => ({
        title: "CGU",
        description:
            "Conditions Générales d'Utilisation d'Arrhes. Consultez les règles et conditions d'utilisation du logiciel.",
    }),
    component: () => (
        <DocRoot>
            <TermsGeneralDocPage />
        </DocRoot>
    ),
})
