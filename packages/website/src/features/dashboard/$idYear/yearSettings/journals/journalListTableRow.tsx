import type { schemas } from "@arrhes/application-metadata/schemas"
import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { formatDate } from "../../../../../components/formats/formatDate.tsx"
import { Chip } from "../../../../../components/layouts/chip.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { LinkButton } from "../../../../../components/linkButton.tsx"

export function JournalListTableRow(props: { journal: v.InferOutput<typeof schemas.journal> }) {
    const createdAt = formatDate(props.journal.createdAt)

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
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/journaux/$idJournal"
                            params={{
                                idOrganization: props.journal.idOrganization,
                                idYear: props.journal.idYear,
                                idJournal: props.journal.id,
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
                                {props.journal.label ?? undefined}
                            </LinkContent>
                        </LinkButton>
                    </div>
                    <div
                        className={css({ display: "flex", justifyContent: "end", alignItems: "start", gap: "0.5rem" })}
                    >
                        <Chip text={props.journal.code} color="neutral" />
                    </div>
                </div>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>{`Ajouté le ${createdAt}`}</span>
                </div>
            </div>
        </ListTable.Row>
    )
}
