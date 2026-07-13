import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/general/SupportGeneralDocPage.mdx"
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
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
