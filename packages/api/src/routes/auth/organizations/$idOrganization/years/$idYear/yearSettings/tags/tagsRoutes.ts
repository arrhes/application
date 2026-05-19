import { $idTagRoutes } from "./$idTag/$idTagRoutes.js"
import { createOneTagRoute } from "./createOneTag.js"
import { readAllTagsRoute } from "./readAllTags.js"

export const tagsRoutes = [
    createOneTagRoute,
    readAllTagsRoute,

    ...$idTagRoutes,
]
