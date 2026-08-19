import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { journalSchema } from "../../../../../../../../../schemas/journal.js"
import { yearSchema } from "../../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const openYearRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/open`,
    name: "open-year",
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
            idJournalOpening: v.nonNullable(journalSchema.entries.id, "Le journal doit être renseigné"),
        }),
        return: v.object({}),
    },
})
