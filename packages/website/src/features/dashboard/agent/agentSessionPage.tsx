import { useParams } from "@tanstack/react-router"
import { useEffect } from "react"
import { organizationPathRoute } from "../../../routes/root/dashboard/organizations/$idOrganization/organizationPathRoute.tsx"
import { agentSessionPathRoute } from "../../../routes/root/dashboard/agent/agentSessionPathRoute.tsx"
import { useAgentActiveSession } from "./agentActiveSessionContext.tsx"
import { AgentChat } from "./agentChat.tsx"

export function AgentSessionPage() {
    const { idOrganization } = useParams({ from: organizationPathRoute.id })
    const { idAgentSession } = useParams({ from: agentSessionPathRoute.id })
    const { setActiveSessionId } = useAgentActiveSession()

    // Sync the URL-based session ID to the context so sidebar highlighting works
    useEffect(() => {
        setActiveSessionId(idAgentSession)
        return () => setActiveSessionId(undefined)
    }, [idAgentSession, setActiveSessionId])

    return <AgentChat key={idAgentSession} idOrganization={idOrganization} idAgentSession={idAgentSession} />
}
