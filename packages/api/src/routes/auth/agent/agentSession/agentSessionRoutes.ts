import { createOneAgentSessionRoute } from "./createOneAgentSession.js"
import { deleteOneAgentSessionRoute } from "./deleteOneAgentSession.js"
import { readAllAgentSessionsRoute } from "./readAllAgentSessions.js"
import { readOneAgentSessionRoute } from "./readOneAgentSession.js"

export const agentSessionRoutes = [
    createOneAgentSessionRoute,
    deleteOneAgentSessionRoute,
    readAllAgentSessionsRoute,
    readOneAgentSessionRoute,
]
