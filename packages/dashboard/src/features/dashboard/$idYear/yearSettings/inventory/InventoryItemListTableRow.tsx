import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertCircle } from "@tabler/icons-react"
import type * as v from "valibot"
import { Table } from "../../../../../components/layouts/table/table.tsx"

export function InventoryItemListTableRow(props: { item: v.InferOutput<typeof returnedSchemas.inventoryItem> }) {
    const quantity = Number(props.item.currentQuantity)
    const threshold = props.item.minimumThreshold ? Number(props.item.minimumThreshold) : null
    const isLowStock = threshold !== null && quantity <= threshold

    return (
        <Table.Body.Row>
            <Table.Body.Cell>
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                    })}
                >
                    <span
                        className={css({
                            fontWeight: "semibold",
                        })}
                    >
                        {props.item.name}
                    </span>
                    {props.item.description && (
                        <span
                            className={css({
                                fontSize: "xs",
                                color: "neutral/50",
                            })}
                        >
                            {props.item.description}
                        </span>
                    )}
                </div>
            </Table.Body.Cell>
            <Table.Body.Cell>
                <span>{props.item.sku ?? "—"}</span>
            </Table.Body.Cell>
            <Table.Body.Cell>
                <span>{props.item.category ?? "—"}</span>
            </Table.Body.Cell>
            <Table.Body.Cell>
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <span>{props.item.currentQuantity}</span>
                    {isLowStock && (
                        <IconAlertCircle
                            size={16}
                            className={css({
                                color: "warning",
                            })}
                        />
                    )}
                </div>
            </Table.Body.Cell>
            <Table.Body.Cell>
                <span>{props.item.unit}</span>
            </Table.Body.Cell>
            <Table.Body.Cell>
                <span>{props.item.unitPrice ? `${props.item.unitPrice} €` : "—"}</span>
            </Table.Body.Cell>
            <Table.Body.Cell>
                <span>{props.item.minimumThreshold ?? "—"}</span>
            </Table.Body.Cell>
            <Table.Body.Cell>
                <span>{props.item.location ?? "—"}</span>
            </Table.Body.Cell>
        </Table.Body.Row>
    )
}
