import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { recordSchema, recordSchemaReturn } from "../../../../../../../schemas/record.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const createOneRecordRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-record`,
    schemas: {
        body: v.object({
            idYear: recordSchema.entries.idYear,
            idJournal: v.optional(recordSchema.entries.idJournal),
            idRecordLabel: v.optional(recordSchema.entries.idRecordLabel),
            idFile: v.optional(recordSchema.entries.idFile),
            label: recordSchema.entries.label,
            date: recordSchema.entries.date,
        }),
        return: recordSchemaReturn,
    },
})
