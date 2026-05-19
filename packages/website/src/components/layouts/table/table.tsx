import { FilterPopover } from "../FilterPopover.js"
import { SortPopover } from "../SortPopover.js"
import { TableRoot } from "./TableRoot.js"
import { TableBodyCell } from "./tableBody/TableBodyCell.js"
import { TableBodyRow } from "./tableBody/TableBodyRow.js"
import { TableBodyRoot } from "./tableBody/tableBodyRoot.js"
import { TableHeaderCell } from "./tableHeader/TableHeaderCell.js"
import { TableHeaderRoot } from "./tableHeader/TableHeaderRoot.js"
import { TableHeaderRow } from "./tableHeader/TableHeaderRow.js"

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
