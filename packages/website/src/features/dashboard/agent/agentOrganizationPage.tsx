import { useParams } from "@tanstack/react-router"
import { organizationPathRoute } from "../../../routes/root/dashboard/organizations/$idOrganization/organizationPathRoute.tsx"
import { AgentChat } from "./agentChat.tsx"

export function AgentOrganizationPage() {
    const { idOrganization } = useParams({ from: organizationPathRoute.id })
    return <AgentChat idOrganization={idOrganization} idAgentSession={undefined} />
}
