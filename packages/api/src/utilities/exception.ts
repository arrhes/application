import type { ContentfulStatusCode } from "hono/utils/http-status"

export class Exception extends Error {
    statusCode?
    internalMessage
    externalMessage?
    cause?
    stack?

    constructor(parameters: {
        internalMessage: string
        externalMessage?: string
        cause?: string
        rawError?: unknown
        statusCode?: ContentfulStatusCode
    }) {
        super(parameters.internalMessage)

        this.statusCode = parameters.statusCode
        this.internalMessage = parameters.internalMessage
        this.externalMessage = parameters.externalMessage ?? "Internal error"

        this.cause =
            parameters.cause === undefined
                ? parameters.rawError instanceof Error
                    ? String(parameters.rawError.cause)
                    : parameters.rawError instanceof String
                      ? JSON.parse(String(parameters.rawError))
                      : parameters.rawError
                : parameters.cause

        this.stack = parameters.rawError instanceof Error ? parameters.rawError.stack : new Error().stack

        // console.log(JSON.stringify(this, null, 2))
    }
}
