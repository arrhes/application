import type { routeDefinition } from "@comptasse/application-metadata/utilities"
import type * as v from "valibot"
import { dataClient } from "../contexts/data/queryClient.js"
import { buildQueryKey } from "./queryKey.js"

export async function invalidateData<
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends
        | v.ObjectSchema<v.ObjectEntries, undefined>
        | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>,
>(parameters: {
    routeDefinition: ReturnType<typeof routeDefinition<string, TSchemaBody, TSchemaReturn>>
    body: v.InferOutput<TSchemaBody>
    params?: Record<string, string>
    exact?: boolean
}) {
    await dataClient.invalidateQueries({
        queryKey: buildQueryKey(
            parameters.routeDefinition,
            parameters.body as Record<string, unknown>,
            parameters.params,
        ),
        exact: parameters.exact ?? true,
    })
}
