import type { routeDefinition } from "@arrhes/application-metadata"
import type { Context } from "hono"
import type { ContentfulStatusCode } from "hono/utils/http-status"
import type * as v from "valibot"
import type { ApiEnv } from "../utilities/apiFactory.js"
import { validate } from "../utilities/validate.js"

type GContext = Context<ApiEnv>

export function response<
    TContext extends GContext,
    TSchema extends Parameters<typeof routeDefinition>[0]["schemas"]["return"],
    TData extends v.InferOutput<TSchema>,
>(parameters: { context: TContext; statusCode?: ContentfulStatusCode; schema: TSchema; data: TData }) {
    const data = validate({
        schema: parameters.schema,
        data: parameters.data,
    })

    const jsonResponse = parameters.context.json(data, parameters.statusCode ?? 500, {})
    return jsonResponse as Response
}
