import {
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    updateOneFileRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonPlainContent, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useNavigate, useParams, useSearch } from "@tanstack/react-router"
import { type DragEvent, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.js"
import { Page } from "../../../../components/layouts/page/page.js"
import { storageLayoutRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/storage/storageLayoutRoute.js"
import { storageRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/storage/storageRoute.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { CreateOneFile } from "./createOneFile.js"
import { CreateOneFolder } from "./createOneFolder.js"
import { FilesPageContent } from "./filesPageContent.js"

export function FilesPage() {
    const params = useParams({
        from: storageLayoutRoute.id,
    })
    const { idFolder } = useSearch({
        from: storageRoute.id,
    })
    const navigate = useNavigate()

    // Current folder is derived from the URL search param
    const currentFolderId = idFolder ?? null

    function navigateToFolder(folderId: string | null) {
        navigate({
            to: ".",
            search: folderId
                ? {
                      idFolder: folderId,
                  }
                : {},
        })
    }

    // Breadcrumb drag-and-drop - move files to a specific breadcrumb folder (or root)
    const [breadcrumbDragOver, setBreadcrumbDragOver] = useState<string | null>(null)

    function handleBreadcrumbDragOver(event: DragEvent, targetId: string) {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
        setBreadcrumbDragOver(targetId)
    }

    function handleBreadcrumbDragLeave() {
        setBreadcrumbDragOver(null)
    }

    async function handleBreadcrumbDrop(event: DragEvent, targetFolderId: string | null) {
        event.preventDefault()
        setBreadcrumbDragOver(null)

        const fileId = event.dataTransfer.getData("text/plain")
        if (!fileId) return

        const updateResponse = await getResponseBodyFromAPI({
            routeDefinition: updateOneFileRouteDefinition,
            body: {
                idFile: fileId,
                idFolder: targetFolderId,
            },
        })

        if (updateResponse.ok === false) {
            toast({
                title: "Impossible de déplacer le fichier",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {},
        })

        toast({
            title: "Fichier déplacé",
            variant: "success",
        })
    }

    return (
        <Page.Root>
            <Page.Content>
                {/* View toggle + actions */}
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <CreateOneFolder
                        idOrganization={params.idOrganization}
                        idFolderParent={currentFolderId}
                    />
                    <CreateOneFile
                        idOrganization={params.idOrganization}
                        idFolder={currentFolderId}
                    >
                        <ButtonPlainContent
                            leftIcon={<IconPlus />}
                            text="Ajouter un fichier"
                        />
                    </CreateOneFile>
                </div>

                <DataWrapper
                    routeDefinition={readAllFoldersRouteDefinition}
                    body={{}}
                >
                    {(folders) => (
                        <FilesPageContent
                            folders={folders}
                            idFolder={idFolder}
                            currentFolderId={currentFolderId}
                            navigateToFolder={navigateToFolder}
                            breadcrumbDragOver={breadcrumbDragOver}
                            handleBreadcrumbDragOver={handleBreadcrumbDragOver}
                            handleBreadcrumbDragLeave={handleBreadcrumbDragLeave}
                            handleBreadcrumbDrop={handleBreadcrumbDrop}
                            params={params}
                        />
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
