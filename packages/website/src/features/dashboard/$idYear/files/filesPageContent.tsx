import { readAllFilesRouteDefinition, type readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { type DragEvent, useMemo, useState } from "react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.js"
import { type FilterColumn, FilterPopover } from "../../../../components/layouts/filterPopover.js"
import { SearchBar } from "../../../../components/layouts/searchBar.js"
import { type SortColumn, type SortDirection, SortPopover } from "../../../../components/layouts/sortPopover.js"
import { FilesGrid } from "./filesGrid.js"
import { FilesTable } from "./filesTable.js"

type ViewMode = "grid" | "list"

type Folder = v.InferOutput<typeof readAllFoldersRouteDefinition.schemas.return>[number]

const filterColumns: Array<FilterColumn> = [
    { id: "name", header: "Nom" },
    { id: "createdAt", header: "Date" },
]

const sortColumns: Array<SortColumn> = [
    { id: "name", header: "Nom" },
    { id: "createdAt", header: "Date" },
]

/**
 * Build the breadcrumb path from the root to the target folder by
 * walking `idFolderParent` links upward, then reversing.
 */
function buildFolderPath(folders: Array<Folder>, targetId: string | undefined): Array<{ id: string; name: string }> {
    if (!targetId) return []

    const map = new Map(folders.map((f) => [f.id, f]))
    const path: Array<{ id: string; name: string }> = []
    let current = map.get(targetId)

    while (current) {
        path.push({ id: current.id, name: current.name })
        current = current.idFolderParent ? map.get(current.idFolderParent) : undefined
    }

    return path.reverse()
}

/**
 * Inner component that has access to the fetched folders data,
 * allowing us to compute the breadcrumb path.
 */
export function FilesPageContent(props: {
    folders: Array<Folder>
    idFolder: string | undefined
    currentFolderId: string | null
    navigateToFolder: (folderId: string | null) => void
    breadcrumbDragOver: string | null
    handleBreadcrumbDragOver: (event: DragEvent, targetId: string) => void
    handleBreadcrumbDragLeave: () => void
    handleBreadcrumbDrop: (event: DragEvent, targetFolderId: string | null) => void
    params: { idOrganization: string; idYear: string }
}) {
    const {
        folders,
        idFolder,
        currentFolderId,
        navigateToFolder,
        breadcrumbDragOver: _breadcrumbDragOver,
        handleBreadcrumbDragOver: _handleBreadcrumbDragOver,
        handleBreadcrumbDragLeave: _handleBreadcrumbDragLeave,
        handleBreadcrumbDrop: _handleBreadcrumbDrop,
        params,
    } = props
    const [viewMode, _setViewMode] = useState<ViewMode>("list")

    const _folderPath = useMemo(() => buildFolderPath(folders, idFolder), [folders, idFolder])

    const currentFolders = folders.filter((f) => (f.idFolderParent ?? null) === currentFolderId)

    // Compute the parent folder ID so that ".." navigation works
    const parentFolderId = useMemo(() => {
        if (!currentFolderId) return null
        const currentFolder = folders.find((f) => f.id === currentFolderId)
        return currentFolder?.idFolderParent ?? null
    }, [folders, currentFolderId])

    // Shared search / filter / sort state
    const [globalFilter, setGlobalFilter] = useState("")
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
    const [sorting, setSorting] = useState<Array<{ id: string; desc: boolean }>>([])

    function handleColumnFilterChange(columnId: string, value: string | undefined) {
        setColumnFilters((prev) => {
            const next = { ...prev }
            if (value) {
                next[columnId] = value
            } else {
                delete next[columnId]
            }
            return next
        })
    }

    function getSortDirection(columnId: string): SortDirection {
        const existing = sorting.find((s) => s.id === columnId)
        if (!existing) return false
        return existing.desc ? "desc" : "asc"
    }

    function toggleSort(columnId: string) {
        setSorting((prev) => {
            const existing = prev.find((s) => s.id === columnId)
            if (!existing) return [...prev, { id: columnId, desc: false }]
            if (!existing.desc) return prev.map((s) => (s.id === columnId ? { ...s, desc: true } : s))
            return prev.filter((s) => s.id !== columnId)
        })
    }

    const hasActiveFilters = globalFilter !== "" || Object.keys(columnFilters).length > 0

    const filteredFolders = useMemo(() => {
        let result = currentFolders.filter((folder) => {
            if (globalFilter && !folder.name.toLowerCase().includes(globalFilter.toLowerCase())) return false

            for (const [columnId, filterValue] of Object.entries(columnFilters)) {
                if (!filterValue) continue
                const lower = filterValue.toLowerCase()
                if (columnId === "name" && !folder.name.toLowerCase().includes(lower)) return false
                if (columnId === "createdAt" && !folder.createdAt.toLowerCase().includes(lower)) return false
            }

            return true
        })

        if (sorting.length > 0) {
            result = [...result].sort((a, b) => {
                for (const sort of sorting) {
                    let comparison = 0
                    if (sort.id === "name") {
                        comparison = a.name.localeCompare(b.name)
                    } else if (sort.id === "createdAt") {
                        comparison = a.createdAt.localeCompare(b.createdAt)
                    }
                    if (comparison !== 0) return sort.desc ? -comparison : comparison
                }
                return 0
            })
        } else {
            result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        }

        return result
    }, [currentFolders, globalFilter, columnFilters, sorting])

    return (
        <>
            {/* Shared search / filter / sort bar */}
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <SearchBar value={globalFilter} onChange={(value) => setGlobalFilter(value)} />
                <FilterPopover
                    columns={filterColumns}
                    columnFilters={columnFilters}
                    onFilterChange={handleColumnFilterChange}
                    onClearAll={() => setColumnFilters({})}
                />
                <SortPopover
                    columns={sortColumns}
                    getSortDirection={getSortDirection}
                    onToggleSort={toggleSort}
                    onClearAll={() => setSorting([])}
                    activeSortCount={sorting.length}
                />

                {/* <Button
                    onClick={() => {
                        if (viewMode === "grid") {
                            setViewMode("list")
                        }
                        if (viewMode === "list") {
                            setViewMode("grid")
                        }
                    }}
                    title={viewMode === "grid" ? "Liste" : "Grille"}
                >
                    <ButtonOutlineContent leftIcon={viewMode === "grid" ? <IconLayoutList /> : <IconLayoutGrid />} />
                </Button> */}
            </div>

            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "0.5rem",
                })}
            >
                <DataWrapper
                    routeDefinition={readAllFilesRouteDefinition}
                    body={{
                        idYear: params.idYear,
                    }}
                >
                    {(files) => {
                        const currentFiles = files.filter((f) => (f.idFolder ?? null) === currentFolderId)

                        // Apply shared filters and sorting to files
                        let filteredFiles = currentFiles.filter((file) => {
                            if (globalFilter) {
                                const lower = globalFilter.toLowerCase()
                                const matchesGlobal =
                                    file.name?.toLowerCase().includes(lower) ||
                                    file.createdAt.toLowerCase().includes(lower)
                                if (!matchesGlobal) return false
                            }

                            for (const [columnId, filterValue] of Object.entries(columnFilters)) {
                                if (!filterValue) continue
                                const lower = filterValue.toLowerCase()
                                if (columnId === "name" && !file.name?.toLowerCase().includes(lower)) return false
                                if (columnId === "createdAt" && !file.createdAt.toLowerCase().includes(lower))
                                    return false
                            }

                            return true
                        })

                        if (sorting.length > 0) {
                            filteredFiles = [...filteredFiles].sort((a, b) => {
                                for (const sort of sorting) {
                                    let comparison = 0
                                    if (sort.id === "name") {
                                        comparison = (a.name ?? "").localeCompare(b.name ?? "")
                                    } else if (sort.id === "createdAt") {
                                        comparison = a.createdAt.localeCompare(b.createdAt)
                                    }
                                    if (comparison !== 0) return sort.desc ? -comparison : comparison
                                }
                                return 0
                            })
                        } else {
                            filteredFiles = [...filteredFiles].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                        }

                        if (viewMode === "grid") {
                            return (
                                <FilesGrid
                                    idOrganization={params.idOrganization}
                                    idYear={params.idYear}
                                    files={filteredFiles}
                                    folders={filteredFolders}
                                    currentFolderId={currentFolderId}
                                    parentFolderId={parentFolderId}
                                    onFolderOpen={navigateToFolder}
                                    hasActiveFilters={hasActiveFilters}
                                />
                            )
                        }
                        return (
                            <FilesTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                files={filteredFiles}
                                folders={filteredFolders}
                                currentFolderId={currentFolderId}
                                parentFolderId={parentFolderId}
                                onFolderOpen={navigateToFolder}
                                hasActiveFilters={hasActiveFilters}
                            />
                        )
                    }}
                </DataWrapper>
            </div>
        </>
    )
}
