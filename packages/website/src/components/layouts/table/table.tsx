import { FilterPopover } from "../filterPopover.js"
import { SortPopover } from "../sortPopover.js"
import { TableBodyCell } from "./tableBody/tableBodyCell.js"
import { TableBodyRoot } from "./tableBody/tableBodyRoot.js"
import { TableBodyRow } from "./tableBody/tableBodyRow.js"
import { TableHeaderCell } from "./tableHeader/tableHeaderCell.js"
import { TableHeaderRoot } from "./tableHeader/tableHeaderRoot.js"
import { TableHeaderRow } from "./tableHeader/tableHeaderRow.js"
import { TableRoot } from "./tableRoot.js"

export const Table = {
    Root: TableRoot,
    Header: {
        Root: TableHeaderRoot,
        Row: TableHeaderRow,
        Cell: TableHeaderCell,
    },
    Body: {
        Root: TableBodyRoot,
        Row: TableBodyRow,
        Cell: TableBodyCell,
    },
    FilterPopover: FilterPopover,
    SortPopover: SortPopover,
}
