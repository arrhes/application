import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { formatDate } from "../../../components/formats/formatDate.tsx"
import { Chip } from "../../../components/layouts/chip.tsx"
import { ListTable } from "../../../components/layouts/listTable/listTable.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"

const categoryLabels: Record<string, string> = {
    bug: "Erreur",
    enhancement: "Amélioration",
    feature: "Fonctionnalité",
    other: "Autre",
}

const statusLabels: Record<string, { text: string; color: "information" | "neutral" }> = {
    open: { text: "Ouvert", color: "information" },
    closed: { text: "Fermé", color: "neutral" },
}

export function TicketListTableRow(props: { ticket: v.InferOutput<typeof returnedSchemas.ticket> }) {
    const createdAt = formatDate(props.ticket.createdAt)
    const status = statusLabels[props.ticket.status] ?? { text: props.ticket.status, color: "neutral" as const }
    const categoryLabel = categoryLabels[props.ticket.category] ?? props.ticket.category

    return (
        <ListTable.Row>
            <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "start",
                        gap: "1rem",
                    })}
                >
                    <div className={css({ display: "flex", alignItems: "center", gap: "0.75rem" })}>
                        <LinkButton
                            to="/dashboard/support/tickets/$idTicket"
                            params={{
                                idTicket: props.ticket.id,
                            }}
                        >
                            <LinkContent
                                className={css({
                                    fontSize: "base",
                                    fontWeight: "semibold",
                                    color: "primary",
                                    textDecoration: "none",
                                    _hover: { textDecoration: "underline" },
                                })}
                            >
                                {`Ticket - ${categoryLabel}`}
                            </LinkContent>
                        </LinkButton>
                    </div>
                    <div
                        className={css({ display: "flex", justifyContent: "end", alignItems: "start", gap: "0.5rem" })}
                    >
                        <Chip text={categoryLabel} color="neutral" />
                        <Chip text={status.text} color={status.color} />
                    </div>
                </div>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>{`Créé le ${createdAt}`}</span>
                </div>
            </div>
        </ListTable.Row>
    )
}
