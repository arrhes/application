import { agentChatRoute } from "./agentChat.js"
import {
    createOneAgentSessionRoute,
    deleteOneAgentSessionRoute,
    readAllAgentSessionsRoute,
    readOneAgentSessionRoute,
} from "./agentSessions.js"
import { undoAgentActionRoute } from "./agentUndo.js"

export const agentRoutes = [
    agentChatRoute,
    createOneAgentSessionRoute,
    readAllAgentSessionsRoute,
    readOneAgentSessionRoute,
    deleteOneAgentSessionRoute,
    undoAgentActionRoute,
]
