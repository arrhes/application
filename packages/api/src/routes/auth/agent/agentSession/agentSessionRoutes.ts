import { createOneAgentSessionRoute } from "./createOneAgentSession.js"
import { deleteOneAgentSessionRoute } from "./deleteOneAgentSession.js"
import { readAllAgentSessionsRoute } from "./readAllAgentSessions.js"
import { readOneAgentSessionRoute } from "./readOneAgentSession.js"
import { updateOneAgentSessionRoute } from "./updateOneAgentSession.js"

export const agentSessionRoutes = [
    createOneAgentSessionRoute,
    deleteOneAgentSessionRoute,
    readAllAgentSessionsRoute,
    readOneAgentSessionRoute,
    updateOneAgentSessionRoute,
]
