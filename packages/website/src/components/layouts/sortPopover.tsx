import { Button, ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowsSort, IconSortAscendingLetters, IconSortDescendingLetters, IconX } from "@tabler/icons-react"
import { Popover } from "../overlays/popover/popover.js"

export type SortDirection = "asc" | "desc" | false

export type SortColumn = {
    id: string
    header: string
}

export function SortPopover(props: {
    columns: Array<SortColumn>
    getSortDirection: (columnId: string) => SortDirection
    onToggleSort: (columnId: string) => void
    onClearAll: () => void
    activeSortCount: number
}) {
    function getSortIcon(direction: SortDirection) {
        if (direction === "asc") return <IconSortAscendingLetters size={16} />
        if (direction === "desc") return <IconSortDescendingLetters size={16} />
        return undefined
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button>
                    {props.activeSortCount > 0 ? (
                        <ButtonPlainContent
                            leftIcon={<IconArrowsSort size={16} />}
                            text={`Trier (${props.activeSortCount})`}
                        />
                    ) : (
                        <ButtonOutlineContent leftIcon={<IconArrowsSort size={16} />} text="Trier" />
                    )}
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className={css({
                    width: "280px",
                    maxHeight: "400px",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    padding: "0.5rem",
                })}
            >
                <Button
                    onClick={props.onClearAll}
                    className={css({ width: "100%" })}
                    isDisabled={props.activeSortCount === 0}
                >
                    <ButtonGhostContent
                        color="danger"
                        leftIcon={<IconX size={16} />}
                        text="Effacer le tri"
                        className={css({ width: "100%", justifyContent: "start" })}
                        isDisabled={props.activeSortCount === 0}
                    />
                </Button>
                <Separator />
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                    })}
                >
                    {props.columns.map((column) => {
                        const direction = props.getSortDirection(column.id)
                        return (
                            <div
                                key={column.id}
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "1rem",
                                })}
                            >
                                <Button
                                    onClick={() => props.onToggleSort(column.id)}
                                    className={css({ width: "100%" })}
                                >
                                    <ButtonGhostContent
                                        leftIcon={getSortIcon(direction)}
                                        text={column.header}
                                        className={css({ width: "100%", justifyContent: "start" })}
                                    />
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}
