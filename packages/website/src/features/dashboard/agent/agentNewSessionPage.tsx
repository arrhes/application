import { useParams } from "@tanstack/react-router"
import { agentOrganizationPathRoute } from "../../../routes/root/dashboard/agent/agentOrganizationPathRoute.tsx"
import { AgentChat } from "../../agent/agentChat.tsx"
import { useAgentActiveSession } from "./agentActiveSessionContext.tsx"

export function AgentNewSessionPage() {
    const { idOrganization } = useParams({ from: agentOrganizationPathRoute.id })
    const { setActiveSessionId } = useAgentActiveSession()

    return (
        <AgentChat
            key="new"
            idOrganization={idOrganization}
            idAgentSession={undefined}
            onSessionCreated={setActiveSessionId}
        />
    )
}
