import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { formatDate } from "../../../../components/formats/formatDate.tsx"

export function TicketMessageList(props: { messages: v.InferOutput<typeof returnedSchemas.ticketMessage>[] }) {
    const sortedMessages = [...props.messages].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

    return (
        <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" })}>
            {sortedMessages.map((message) => {
                const createdAt = formatDate(message.createdAt)
                const isAdmin = message.idAdminUser !== null

                return (
                    <div
                        key={message.id}
                        className={css({
                            width: "100%",
                            display: "flex",
                            justifyContent: isAdmin ? "flex-end" : "flex-start",
                        })}
                    >
                        <div
                            className={css({
                                maxWidth: "80%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                                padding: "0.75rem",
                                border: "1px solid",
                                borderColor: isAdmin ? "primary/20" : "neutral/10",
                                borderRadius: "lg",
                                backgroundColor: isAdmin ? "primary/5" : "white",
                            })}
                        >
                            <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}>
                                <span
                                    className={css({
                                        fontSize: "xs",
                                        fontWeight: "medium",
                                        color: isAdmin ? "primary" : "neutral/60",
                                    })}
                                >
                                    {isAdmin ? "Support" : "Vous"}
                                </span>
                                <span className={css({ fontSize: "xs", color: "neutral/40" })}>
                                    {`Le ${createdAt}`}
                                </span>
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
