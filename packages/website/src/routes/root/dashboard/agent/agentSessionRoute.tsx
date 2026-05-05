import { createRoute, useParams } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import { agentSessionsLayoutRoute } from "./agentSessionsLayoutRoute.js"

const AgentSessionPage = lazy(() =>
    import("../../../../features/dashboard/$idOrganization/agent/agentSessionPage.js").then((m) => ({
        default: m.AgentSessionPage,
    })),
)

// Wrapper that keys AgentSessionPage on idAgentSession so the component
// fully remounts when the user switches sessions — resetting all state/refs.
function AgentSessionPageKeyed() {
    const { idAgentSession } = useParams({ from: agentSessionRoute.id })
    return (
        <Suspense fallback={null}>
            <AgentSessionPage key={idAgentSession} />
        </Suspense>
    )
}

export const agentSessionRoute = createRoute({
    getParentRoute: () => agentSessionsLayoutRoute,
    path: "/$idAgentSession",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: AgentSessionPageKeyed,
})
