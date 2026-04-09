import { undoAgentActionRoute } from "./agentUndo.js"
import { createOneAgentMessageRoute } from "./createOneAgentMessage.js"
import { getStreamForAgentMessageRoute } from "./getStreamForAgentMessage.js"
import { readAllAgentMessagesRoute } from "./readAllAgentMessages.js"

export const agentMessageRoutes = [
    createOneAgentMessageRoute,
    getStreamForAgentMessageRoute,
    undoAgentActionRoute,
    readAllAgentMessagesRoute,
]
