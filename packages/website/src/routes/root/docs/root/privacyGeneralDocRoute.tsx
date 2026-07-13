import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/general/PrivacyGeneralDocPage.mdx"
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
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
