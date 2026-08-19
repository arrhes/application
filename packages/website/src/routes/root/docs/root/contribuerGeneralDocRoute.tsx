import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { ContributeGeneralDocPage } from "../../../../features/docs/project/ContributeGeneralDocPage.js"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const contribuerGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/contribuer",
    beforeLoad: () => ({
        title: "Contribuer",
        description:
            "Comment contribuer à Comptasse : signaler des bugs, proposer des fonctionnalités, améliorer la documentation ou contribuer du code.",
    }),
    component: () => (
        <DocRoot>
            <ContributeGeneralDocPage />
        </DocRoot>
    ),
})
