import type * as v from "valibot"

export function routeDefinition<
    TPath extends string,
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends
        | v.ObjectSchema<v.ObjectEntries, undefined>
        | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>,
>(parameters: {
    protocol: "http" | "ws"
    path: TPath
    schemas: {
        body: TSchemaBody
        return: TSchemaReturn
    }
}) {
    return {
        path: parameters.path,
        schemas: parameters.schemas,
    }
}
