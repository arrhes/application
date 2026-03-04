import type { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { formatDate } from "../../../../components/formats/formatDate.tsx"
import { Chip } from "../../../../components/layouts/chip.tsx"
import { ListTable } from "../../../../components/layouts/listTable/listTable.tsx"
import { LinkButton } from "../../../../components/linkButton.tsx"

export function YearListTableRow(props: {
    year: v.InferOutput<typeof readAllYearsRouteDefinition.schemas.return>[number]
}) {
    const startDate = formatDate(props.year.startingAt)
    const endDate = formatDate(props.year.endingAt)

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
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear"
                            params={{
                                idOrganization: props.year.idOrganization,
                                idYear: props.year.id,
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
                                {props.year.label}
                            </LinkContent>
                        </LinkButton>
                    </div>
                    <div
                        className={css({ display: "flex", justifyContent: "end", alignItems: "start", gap: "0.5rem" })}
                    >
                        {props.year.isClosed ? (
                            <Chip text="Clôturé" color="neutral" />
                        ) : (
                            <Chip text="En cours" color="success" />
                        )}
                    </div>
                </div>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                        {startDate} — {endDate}
                    </span>
                </div>
            </div>
        </ListTable.Row>
    )
}
