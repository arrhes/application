import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/InstallationGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const installationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/installation",
    beforeLoad: () => ({
        title: "Installation",
        description:
            "Mettez en place Arrhes : installation du CLI, conventions de l'API et premiers pas sur le dashboard.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
