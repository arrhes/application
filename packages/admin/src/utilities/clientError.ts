export class ClientError extends Error {
    cause: string | undefined

    constructor(parameters: { message?: string; cause?: string; rawError?: unknown }) {
        super(parameters.message ?? "Unknown error")
        this.name = "ClientError"

        if (parameters.cause) {
            this.cause = parameters.cause
        } else if (parameters.rawError instanceof Error) {
            this.cause = parameters.rawError.message
        }
    }
}
