import { $idEntryRoutes } from "./$idEntry/$idEntryRoutes.js"
import { entryLinesRoutes } from "./$idEntry/entryLines/entryLinesRoutes.js"
import { entryTagsRoutes } from "./$idEntry/entryTags/entryTagsRoutes.js"
import { createOneEntryRoute } from "./createOneEntry.js"
import { createOneEntryFromTemplateRoute } from "./createOneEntryFromTemplate.js"
import { readAllEntriesRoute } from "./readAllEntries.js"
import { readAllEntryTagsRoute } from "./readAllEntryTags.js"

export const entriesRoutes = [
    createOneEntryRoute,
    createOneEntryFromTemplateRoute,
    readAllEntriesRoute,
    readAllEntryTagsRoute,

    ...$idEntryRoutes,
    ...entryLinesRoutes,
    ...entryTagsRoutes,
]
