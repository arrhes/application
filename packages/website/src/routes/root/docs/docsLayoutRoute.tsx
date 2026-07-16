import { createRoute } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    component: () => (
        <div style={{ padding: "2rem" }}>
            <h1>Documentation</h1>
            <p>If you see this, the route works.</p>
        </div>
    ),
})
