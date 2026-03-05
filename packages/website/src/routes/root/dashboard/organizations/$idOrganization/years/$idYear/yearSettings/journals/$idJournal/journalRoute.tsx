import { createRoute } from "@tanstack/react-router"
import { JournalPage } from "../../../../../../../../../../features/dashboard/$idYear/yearSettings/journals/$idJournal/journalPage.js"
import { journalLayoutRoute } from "./journalLayoutRoute.js"

export const journalRoute = createRoute({
    getParentRoute: () => journalLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <JournalPage />,
})
