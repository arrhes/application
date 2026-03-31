import { useParams } from "@tanstack/react-router"
import { useEffect } from "react"
import { agentOrganizationPathRoute } from "../../../routes/root/dashboard/agent/agentOrganizationPathRoute.tsx"
import { agentSessionPathRoute } from "../../../routes/root/dashboard/agent/agentSessionPathRoute.tsx"
import { AgentChat } from "../../agent/agentChat.tsx"
import { useAgentActiveSession } from "./agentActiveSessionContext.tsx"

export function AgentSessionPage() {
    const { idOrganization } = useParams({ from: agentOrganizationPathRoute.id })
    const { idAgentSession } = useParams({ from: agentSessionPathRoute.id })
    const { setActiveSessionId } = useAgentActiveSession()

    // Sync the URL-based session ID to the context so sidebar highlighting works
    useEffect(() => {
        setActiveSessionId(idAgentSession)
        return () => setActiveSessionId(undefined)
    }, [idAgentSession, setActiveSessionId])

    return <AgentChat key={idAgentSession} idOrganization={idOrganization} idAgentSession={idAgentSession} />
}
