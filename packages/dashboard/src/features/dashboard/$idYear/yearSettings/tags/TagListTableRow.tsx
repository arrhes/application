import type { schemas } from "@comptasse/application-metadata/schemas"
import { formatDate, LinkContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import type * as v from "valibot"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { UpdateOneTag } from "./$idTag/UpdateOneTag.tsx"

export function TagListTableRow(props: { tag: v.InferOutput<typeof schemas.tag> }) {
    const createdAt = formatDate(props.tag.createdAt)

    return (
        <ListTable.Row>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
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
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                        })}
                    >
                        <UpdateOneTag tag={props.tag}>
                            <LinkContent
                                className={{
                                    fontSize: "base",
                                    fontWeight: "semibold",
                                    color: "primary",
                                    textDecoration: "none",
                                    _hover: {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                {props.tag.label ?? undefined}
                            </LinkContent>
                        </UpdateOneTag>
                    </div>
                </div>
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/50",
                        })}
                    >{`Ajouté le ${createdAt}`}</span>
                </div>
            </div>
        </ListTable.Row>
    )
}
