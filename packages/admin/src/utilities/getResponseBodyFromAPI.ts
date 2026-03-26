import type { routeDefinition } from "@arrhes/application-metadata/utilities"
import type * as v from "valibot"
import { ClientError } from "./clientError.js"
import { validate } from "./validate.js"

export async function getResponseBodyFromAPI<
    TSchemaBody extends v.ObjectSchema<v.ObjectEntries, undefined>,
    TSchemaReturn extends
        | v.ObjectSchema<v.ObjectEntries, undefined>
        | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>,
>(parameters: {
    routeDefinition: ReturnType<typeof routeDefinition<string, TSchemaBody, TSchemaReturn>>
    body: v.InferOutput<TSchemaBody>
    signal?: AbortSignal
}) {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
    if (!apiBaseUrl) {
        return <const>{
            ok: false,
            data: undefined,
            error: new ClientError({ message: "VITE_API_BASE_URL is not defined" }),
        }
    }

    const abortController = parameters.signal ? undefined : new AbortController()
    const signal = parameters.signal ?? abortController!.signal
    try {
        const response = await fetch(new URL(`${apiBaseUrl}${parameters.routeDefinition.path}`), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(parameters.body),
            signal,
        })
        const jsonResponse = JSON.parse((await response.text()) || "{}")
        if (response.ok === false) {
            throw new ClientError({
                message: "Error with the POST request response",
                cause: jsonResponse.cause ?? jsonResponse.message,
            })
        }

        const parsedData = validate({
            schema: parameters.routeDefinition.schemas.return,
            data: jsonResponse,
        })

        if (parsedData.success === false) {
            throw new ClientError({
                message: "Error with the POST request body data validation",
                rawError: new Error(parsedData.error),
            })
        }

        return <const>{
            ok: true,
            data: parsedData.data,
            error: undefined,
        }
    } catch (error: unknown) {
        abortController?.abort()
        return <const>{
            ok: false,
            data: undefined,
            error: error instanceof ClientError ? error : new ClientError({ rawError: error }),
        }
    }
}
