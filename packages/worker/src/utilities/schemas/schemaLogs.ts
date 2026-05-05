import * as v from "valibot"

export const schemaLogs = v.object({
    request: v.object({
        id: v.string(),
        query: v.string(),
    }),
    steps: v.array(v.object({})),
})
