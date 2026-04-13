import { agentMessageRoutes } from "./agentMessage/agentMessageRoutes.js"
import { agentSessionRoutes } from "./agentSession/agentSessionRoutes.js"

export const agentRoutes = [...agentSessionRoutes, ...agentMessageRoutes]
