import { createOneApiKeyRoute } from "./createOneApiKey.js"
import { deleteOneApiKeyRoute } from "./deleteOneApiKey.js"
import { readAllApiKeysRoute } from "./readAllApiKeys.js"

export const apiKeyRoutes = [createOneApiKeyRoute, readAllApiKeysRoute, deleteOneApiKeyRoute]
