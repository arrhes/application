import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/general/WhitepaperGeneralDocPage.mdx"
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
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
