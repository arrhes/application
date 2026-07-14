import { createRoute } from "@tanstack/react-router"
import { docMdxComponents } from "../../../../components/document/DocMdxComponents"
import { DocRoot } from "../../../../components/document/DocRoot"
import Content from "../../../../features/docs/guide/OrganisationGuideDocPage.mdx"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const organisationGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/organisations",
    beforeLoad: () => ({
        title: "Organisations",
        description: "Gérez vos organisations Arrhes : création, paramètres, membres et suppression.",
    }),
    component: () => (
        <DocRoot>
            <Content components={docMdxComponents} />
        </DocRoot>
    ),
})
