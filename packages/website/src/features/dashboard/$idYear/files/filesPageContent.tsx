import { readAllFilesRouteDefinition, type readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import { css } from "@arrhes/ui/utilities/cn.js"
import { type DragEvent, useMemo, useState } from "react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.js"
import { FilesGrid } from "./filesGrid.js"
import { FilesTable } from "./filesTable.js"

type ViewMode = "grid" | "list"

type Folder = v.InferOutput<typeof readAllFoldersRouteDefinition.schemas.return>[number]

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

    const sortedFolders = useMemo(
        () => [...currentFolders].sort((a, b) => a.name.localeCompare(b.name)),
        [currentFolders],
    )

    return (
        <>
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

                        if (viewMode === "grid") {
                            return (
                                <FilesGrid
                                    idOrganization={params.idOrganization}
                                    idYear={params.idYear}
                                    files={currentFiles}
                                    folders={sortedFolders}
                                    currentFolderId={currentFolderId}
                                    parentFolderId={parentFolderId}
                                    onFolderOpen={navigateToFolder}
                                />
                            )
                        }
                        return (
                            <FilesTable
                                idOrganization={params.idOrganization}
                                idYear={params.idYear}
                                files={currentFiles}
                                folders={sortedFolders}
                                currentFolderId={currentFolderId}
                                parentFolderId={parentFolderId}
                                onFolderOpen={navigateToFolder}
                            />
                        )
                    }}
                </DataWrapper>
            </div>
        </>
    )
}
