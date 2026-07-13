import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/general/TermsGeneralDocPage.mdx"
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
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
