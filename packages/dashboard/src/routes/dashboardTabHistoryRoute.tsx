import { createRoute } from "@tanstack/react-router"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

// Matches /:tabId/:historyIndex — pushed by the tab system on each
// in-tab navigation step so browser back/forward traverses tab history.
export const dashboardTabHistoryRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/$tabId/$historyIndex",
})
