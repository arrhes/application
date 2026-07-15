import { createOneUserApiKeyRoute } from "./apiKey/createOneUserApiKey.js"
import { deleteOneUserApiKeyRoute } from "./apiKey/deleteOneUserApiKey.js"
import { readAllUserApiKeysRoute } from "./apiKey/readAllUserApiKeys.js"
import { updateUserOcrCredentialsRoute } from "./ocr/updateUserOcrCredentials.js"

export const userRoutes = [
    updateUserOcrCredentialsRoute,
    createOneUserApiKeyRoute,
    readAllUserApiKeysRoute,
    deleteOneUserApiKeyRoute,
]
