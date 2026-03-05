import { Button, ButtonGhostContent, ButtonOutlineContent, CircularLoader } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import {
    IconChevronDown,
    IconChevronLeft,
    IconChevronRight,
    IconSortAscending,
    IconSortDescending,
} from "@tabler/icons-react"
import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type Row,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table"
import { Fragment, type ReactElement, useMemo, useState } from "react"
import { FormatNull } from "../formats/formatNull.js"
import { type FilterColumn, FilterPopover } from "./filterPopover.js"
import { SearchBar } from "./searchBar.js"
import { type SortDirection, SortPopover } from "./sortPopover.js"

export function DataTable<TData extends Record<keyof TData, unknown>>(props: {
    data: Array<TData>
    isLoading?: boolean
    columns: Array<ColumnDef<TData>>
    pageSize?: number
    onRowClick?: (context: Row<TData>) => void
    renderSubComponent?: (context: { row: Row<TData> }) => ReactElement | null
    hideSearchBar?: boolean
}) {
    const memoizedData = useMemo(() => props.data, [props.data])
    const [globalFilter, setGlobalFilter] = useState("")
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable<TData>({
        data: memoizedData,
        columns: props.columns.map((column) => ({
            ...column,
            enableMultiSort: true,
        })),
        getRowCanExpand: () => !!props.renderSubComponent,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        enableMultiSort: true,
        initialState: {
            pagination: {
                pageSize: props.pageSize ?? 10,
            },
        },
        state: {
            globalFilter,
            sorting,
            columnFilters,
        },
    })

    if (props.isLoading) return <CircularLoader className={css({ m: "3" })} />
    return (
        <div
            className={css({
                flexShrink: "0",
                width: "100%",
                height: "fit",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                gap: "0.5rem",
            })}
        >
            {!props.hideSearchBar && (
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "0.25rem",
                        fontSize: "sm",
                        color: "neutral/60",
                    })}
                >
                    <SearchBar value={globalFilter ?? ""} onChange={(value) => setGlobalFilter(value)} />
                    {(() => {
                        const filterableColumns: Array<FilterColumn> = table
                            .getAllColumns()
                            .filter((col) => col.getCanFilter() && col.columnDef.header && col.columnDef.header !== " ")
                            .map((col) => ({ id: col.id, header: col.columnDef.header?.toString() ?? "" }))

                        if (filterableColumns.length === 0) return null

                        const filterRecord: Record<string, string> = {}
                        for (const col of table.getAllColumns()) {
                            const val = col.getFilterValue()
                            if (val !== undefined) filterRecord[col.id] = String(val)
                        }

                        return (
                            <FilterPopover
                                columns={filterableColumns}
                                columnFilters={filterRecord}
                                onFilterChange={(columnId, value) => {
                                    table.getColumn(columnId)?.setFilterValue(value)
                                }}
                                onClearAll={() => {
                                    for (const col of table.getAllColumns()) {
                                        col.setFilterValue(undefined)
                                    }
                                }}
                            />
                        )
                    })()}
                    {(() => {
                        const sortableColumns = table
                            .getAllColumns()
                            .filter((col) => col.getCanSort() && col.columnDef.header && col.columnDef.header !== " ")
                            .map((col) => ({ id: col.id, header: col.columnDef.header?.toString() ?? "" }))

                        if (sortableColumns.length === 0) return null

                        const currentSorting = table.getState().sorting

                        function getSortDirection(columnId: string): SortDirection {
                            const existing = currentSorting.find((s) => s.id === columnId)
                            if (!existing) return false
                            return existing.desc ? "desc" : "asc"
                        }

                        function toggleSort(columnId: string) {
                            const existing = currentSorting.find((s) => s.id === columnId)
                            if (!existing) {
                                table.setSorting([...currentSorting, { id: columnId, desc: false }])
                            } else if (!existing.desc) {
                                table.setSorting(
                                    currentSorting.map((s) => (s.id === columnId ? { ...s, desc: true } : s)),
                                )
                            } else {
                                table.setSorting(currentSorting.filter((s) => s.id !== columnId))
                            }
                        }

                        return (
                            <SortPopover
                                columns={sortableColumns}
                                getSortDirection={getSortDirection}
                                onToggleSort={toggleSort}
                                onClearAll={() => table.setSorting([])}
                                activeSortCount={currentSorting.length}
                            />
                        )
                    })()}
                </div>
            )}
            <div
                className={css({
                    width: "100%",
                    maxWidth: "100%",
                    maxHeight: "[70vh]",
                    padding: "0",
                    overflowX: "auto",
                    overflowY: "auto",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                })}
            >
                <table
                    className={css({
                        width: "100%",
                        maxWidth: "100%",
                        height: "100%",
                        maxH: "100%",
                        borderCollapse: "collapse",
                    })}
                >
                    <thead
                        className={css({
                            width: "100%",
                            position: "sticky",
                            top: "0",
                            zIndex: "1",
                            backgroundColor: "white",
                        })}
                    >
                        <tr className={css({ width: "100%" })}>
                            {props.renderSubComponent && (
                                <th
                                    className={css({
                                        width: "1%",
                                        borderBottom: "1px solid",
                                        borderBottomColor: "neutral/10",
                                    })}
                                />
                            )}
                            {table.getFlatHeaders().map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        className={css({
                                            width: "fit",
                                            borderBottom: "1px solid",
                                            borderBottomColor: "neutral/10",
                                        })}
                                    >
                                        <div
                                            className={css({
                                                display: "flex",
                                                justifyContent: "flex-start",
                                                alignItems: "center",
                                                gap: "0.5rem",
                                                padding: "1rem",
                                            })}
                                        >
                                            <Button onClick={header.column.getToggleSortingHandler()}>
                                                <ButtonGhostContent
                                                    leftIcon={
                                                        {
                                                            asc: <IconSortAscending size={16} />,
                                                            desc: <IconSortDescending size={16} />,
                                                        }[String(header.column.getIsSorted())] ?? undefined
                                                    }
                                                    text={header.column.columnDef.header?.toString()}
                                                />
                                            </Button>
                                        </div>
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody
                        className={css({
                            width: "100%",
                            height: "fit",
                        })}
                    >
                        {table.getRowModel().rows.length > 0 ? null : (
                            <tr>
                                <td>
                                    <FormatNull text="Pas de données" className={css({ padding: "1rem" })} />
                                </td>
                            </tr>
                        )}
                        {table.getRowModel().rows.map((row) => {
                            return (
                                <Fragment key={row.id}>
                                    <tr
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            if (!props.onRowClick) return
                                            props.onRowClick(row)
                                        }}
                                        className={cx(
                                            css({
                                                width: "100%",
                                                borderBottom: "1px solid",
                                                borderBottomColor: "neutral/5",
                                                _last: { borderBottom: "0" },
                                            }),
                                            !props.onRowClick
                                                ? undefined
                                                : css({
                                                      cursor: "pointer",
                                                      _hover: { backgroundColor: "neutral/5" },
                                                  }),
                                            row.getIsExpanded()
                                                ? css({
                                                      borderBottomColor: "neutral/10",
                                                  })
                                                : undefined,
                                        )}
                                    >
                                        {props.renderSubComponent && (
                                            <td className={css({ width: "1%" })}>
                                                <div
                                                    className={css({
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        padding: "0.5rem",
                                                    })}
                                                >
                                                    <Button
                                                        onClick={(event) => {
                                                            event.stopPropagation()
                                                            row.toggleExpanded()
                                                        }}
                                                    >
                                                        <ButtonGhostContent
                                                            leftIcon={
                                                                row.getIsExpanded() ? (
                                                                    <IconChevronDown size={16} />
                                                                ) : (
                                                                    <IconChevronRight size={16} />
                                                                )
                                                            }
                                                            text={undefined}
                                                        />
                                                    </Button>
                                                </div>
                                            </td>
                                        )}
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td
                                                    key={cell.id}
                                                    className={css({
                                                        width: "fit",
                                                        _last: { width: "1%" },
                                                    })}
                                                >
                                                    <div
                                                        className={css({
                                                            display: "flex",
                                                            justifyContent: "flex-start",
                                                            alignItems: "center",
                                                            padding: "1rem",
                                                        })}
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </div>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                    {row.getIsExpanded() && props.renderSubComponent && (
                                        <tr
                                            className={css({
                                                width: "100%",
                                                borderBottom: "1px solid",
                                                borderBottomColor: "neutral/5",
                                                backgroundColor: "neutral/2",
                                                _last: { borderBottom: "0" },
                                            })}
                                        >
                                            <td
                                                colSpan={row.getVisibleCells().length + 1}
                                                className={css({ padding: "0" })}
                                            >
                                                {props.renderSubComponent({ row })}
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {table.getPageCount() > 1 && (
                <div
                    className={css({
                        flexShrink: "0",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "4",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "sm",
                            color: "neutral/50",
                        })}
                    >
                        {table.getFilteredRowModel().rows.length} résultat
                        {table.getFilteredRowModel().rows.length > 1 ? "s" : ""}
                    </span>
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        <Button onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
                            <ButtonOutlineContent
                                leftIcon={<IconChevronLeft size={16} />}
                                text={undefined}
                                isDisabled={!table.getCanPreviousPage()}
                            />
                        </Button>
                        <span
                            className={css({
                                fontSize: "sm",
                                color: "neutral/50",
                            })}
                        >
                            Page {table.getState().pagination.pageIndex + 1} sur {table.getPageCount()}
                        </span>
                        <Button onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
                            <ButtonOutlineContent
                                leftIcon={<IconChevronRight size={16} />}
                                text={undefined}
                                isDisabled={!table.getCanNextPage()}
                            />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
