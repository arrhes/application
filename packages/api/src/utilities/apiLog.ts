import type { getClients } from "./getClients.js"
import type { getEnv } from "./getEnv.js"

type ApiLog = {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
} & (
    | {
          type: "error"
          internalMessage: string
          externalMessage?: string
          cause?: string
          stack?: string
      }
    | {
          type: "information"
          message: string
      }
)

export function apiLog(parameters: ApiLog) {
    if (parameters.var.env.VERBOSE !== "true") return

    if (parameters.type === "information") {
        console.info(
            JSON.stringify(
                {
                    type: "information",
                    message: parameters.message,
                },
                undefined,
                2,
            ),
        )
    }

    if (parameters.type === "error") {
        console.error(
            JSON.stringify(
                {
                    type: "error",
                    internalMessage: parameters.internalMessage,
                    externalMessage: parameters.externalMessage,
                    cause: parameters.cause,
                    stack: parameters.stack,
                },
                undefined,
                2,
            ),
        )
    }
}
