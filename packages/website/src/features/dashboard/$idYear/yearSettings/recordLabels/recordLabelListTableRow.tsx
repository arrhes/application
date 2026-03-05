import type { schemas } from "@arrhes/application-metadata/schemas"
import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type * as v from "valibot"
import { formatDate } from "../../../../../components/formats/formatDate.tsx"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { LinkButton } from "../../../../../components/linkButton.tsx"

export function RecordLabelListTableRow(props: { recordLabel: v.InferOutput<typeof schemas.recordLabel> }) {
    const createdAt = formatDate(props.recordLabel.createdAt)

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
                            to="/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/catégories/$idRecordLabel"
                            params={{
                                idOrganization: props.recordLabel.idOrganization,
                                idYear: props.recordLabel.idYear,
                                idRecordLabel: props.recordLabel.id,
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
                                {props.recordLabel.label ?? undefined}
                            </LinkContent>
                        </LinkButton>
                    </div>
                </div>
                <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>{`Ajouté le ${createdAt}`}</span>
                </div>
            </div>
        </ListTable.Row>
    )
}
