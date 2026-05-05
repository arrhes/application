type ExceptionProps = {
    internalMessage: string
    externalMessage?: string
    cause?: string
    rawError?: unknown
}

export class Exception extends Error {
    internalMessage
    externalMessage?
    cause?
    stack?

    constructor(props: ExceptionProps) {
        super(props.internalMessage)

        this.internalMessage = props.internalMessage
        this.externalMessage = props.externalMessage ?? "Internal error"

        this.cause =
            props.cause === undefined
                ? props.rawError instanceof Error
                    ? String(props.rawError.cause)
                    : props.rawError instanceof String
                      ? JSON.parse(String(props.rawError))
                      : props.rawError
                : props.cause

        this.stack = props.rawError instanceof Error ? props.rawError.stack : new Error().stack

        // console.log(JSON.stringify(this, null, 2))
    }
}
