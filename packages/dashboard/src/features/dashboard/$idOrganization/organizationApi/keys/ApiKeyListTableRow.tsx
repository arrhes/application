import type { readAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { ButtonOutlineContent, Chip } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTrash } from "@tabler/icons-react"
import type * as v from "valibot"
import { ListTable } from "../../../../../components/layouts/listTable/listTable.tsx"
import { DeleteOneApiKey } from "./DeleteOneApiKey.tsx"

export function ApiKeyListTableRow(props: {
    apiKey: v.InferOutput<typeof readAllApiKeysRouteDefinition.schemas.return>[number]
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
}) {
    return (
        <ListTable.Row>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "0.5rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "base",
                            fontWeight: "semibold",
                            color: "neutral",
                        })}
                    >
                        {props.apiKey.name}
                    </span>
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        {props.apiKey.isActive ? (
                            <Chip
                                text="Active"
                                color="success"
                            />
                        ) : (
                            <Chip
                                text="Inactive"
                                color="error"
                            />
                        )}
                    </div>
                </div>
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <DeleteOneApiKey
                        apiKey={props.apiKey}
                        idOrganization={props.idOrganization}
                    >
                        <ButtonOutlineContent
                            leftIcon={<IconTrash />}
                            title="Supprimer la clé"
                            color="danger"
                        />
                    </DeleteOneApiKey>
                </div>
            </div>
        </ListTable.Row>
    )
}
