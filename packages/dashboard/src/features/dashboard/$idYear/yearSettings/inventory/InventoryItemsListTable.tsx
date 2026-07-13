import { readAllInventoryItemsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPackage } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/DataWrapper.tsx"
import { EmptyState } from "../../../../../components/layouts/EmptyState.tsx"
import { Table } from "../../../../../components/layouts/table/table.tsx"
import { InventoryItemListTableRow } from "./InventoryItemListTableRow.tsx"

export function InventoryItemsListTable(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
}) {
    return (
        <DataWrapper
            routeDefinition={readAllInventoryItemsRouteDefinition}
            body={{
                idYear: props.idYear,
            }}
        >
            {(items) => {
                const sortedItems = items.sort((a, b) => a.name.localeCompare(b.name))

                if (sortedItems.length === 0) {
                    return (
                        <EmptyState
                            icon={<IconPackage size={48} />}
                            title="Aucun article en stock"
                            subtitle="Ajoutez un article pour commencer à suivre votre inventaire"
                        />
                    )
                }

                return (
                    <Table.Root>
                        <Table.Header.Root>
                            <Table.Header.Row>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        Article
                                    </span>
                                </Table.Header.Cell>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        SKU
                                    </span>
                                </Table.Header.Cell>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        Catégorie
                                    </span>
                                </Table.Header.Cell>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        Quantité
                                    </span>
                                </Table.Header.Cell>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        Unité
                                    </span>
                                </Table.Header.Cell>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        Prix unitaire
                                    </span>
                                </Table.Header.Cell>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        Seuil
                                    </span>
                                </Table.Header.Cell>
                                <Table.Header.Cell>
                                    <span
                                        className={css({
                                            color: "neutral/75",
                                            fontSize: "sm",
                                        })}
                                    >
                                        Emplacement
                                    </span>
                                </Table.Header.Cell>
                            </Table.Header.Row>
                        </Table.Header.Root>
                        <Table.Body.Root>
                            {sortedItems.map((item) => (
                                <InventoryItemListTableRow
                                    key={item.id}
                                    item={item}
                                />
                            ))}
                        </Table.Body.Root>
                    </Table.Root>
                )
            }}
        </DataWrapper>
    )
}
