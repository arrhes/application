import type * as v from "valibot"

export function routeDefinition<
    TPath extends string,
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends
        | v.ObjectSchema<v.ObjectEntries, undefined>
        | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>,
>(parameters: {
    protocol: "http" | "ws"
    /**
     * HTTP method for this route. Defaults to "POST" for backward compatibility.
     * Use "GET" for read operations, "PATCH" for updates, "DELETE" for deletions.
     */
    method?: "GET" | "POST" | "PATCH" | "DELETE"
    path: TPath
    schemas: {
        body: TSchemaBody
        return: TSchemaReturn
    }
}) {
    return {
        method: (parameters.method ?? "POST") as "GET" | "POST" | "PATCH" | "DELETE",
        path: parameters.path,
        schemas: parameters.schemas,
    }
}
