import { FilterPopover } from "../FilterPopover.js"
import { SortPopover } from "../SortPopover.js"
import { TableBodyCell } from "./tableBody/TableBodyCell.js"
import { TableBodyRoot } from "./tableBody/tableBodyRoot.js"
import { TableBodyRow } from "./tableBody/TableBodyRow.js"
import { TableHeaderCell } from "./tableHeader/TableHeaderCell.js"
import { TableHeaderRoot } from "./tableHeader/TableHeaderRoot.js"
import { TableHeaderRow } from "./tableHeader/TableHeaderRow.js"
import { TableRoot } from "./TableRoot.js"

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
