import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { formatDate } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"

export function TicketMessageList(props: { messages: v.InferOutput<typeof returnedSchemas.ticketMessage>[] }) {
    const sortedMessages = [...props.messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                border: "1px solid",
                borderColor: "neutral/10",
                borderRadius: "lg",
                padding: "1rem",
            })}
        >
            {sortedMessages.map((message) => {
                const createdAt = formatDate(message.createdAt, { includeTime: true })
                const isAdmin = message.idAdminUser !== null

                return (
                    <div
                        key={message.id}
                        className={css({
                            width: "100%",
                            display: "flex",
                            justifyContent: isAdmin ? "flex-start" : "flex-end",
                        })}
                    >
                        <div
                            className={css({
                                maxWidth: "80%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                                padding: "0.75rem",
                                borderRadius: "md",
                                backgroundColor: isAdmin ? "primary/2" : "neutral/2",
                            })}
                        >
                            <div
                                className={css({
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "1rem",
                                })}
                            >
                                <span
                                    className={css({
                                        fontSize: "xs",
                                        fontWeight: "medium",
                                        color: isAdmin ? "primary" : "neutral/60",
                                    })}
                                >
                                    {isAdmin ? "Support" : "Vous"}
                                </span>
                                <span className={css({ fontSize: "xs", color: "neutral/40" })}>{createdAt}</span>
                            </div>
                            <span
                                className={css({
                                    fontSize: "sm",
                                    color: "neutral",
                                    whiteSpace: "pre-wrap",
                                })}
                            >
                                {message.message}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
