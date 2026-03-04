import { readAllFilesRouteDefinition, updateOneFileRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { IconArrowUp, IconFile, IconFileTypePdf, IconFolder, IconPhoto } from "@tabler/icons-react"
import { type DragEvent, useState } from "react"
import type * as v from "valibot"
import { FormatDate } from "../../../../components/formats/formatDate.js"
import { FormatFileSize } from "../../../../components/formats/formatFileSize.js"
import { EmptyState } from "../../../../components/layouts/emptyState.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { applicationRouter } from "../../../../routes/applicationRouter.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { FileContextMenu } from "./fileContextMenu.js"
import { FolderContextMenu } from "./folderContextMenu.js"

function getFileIcon(type: string | null) {
    if (!type) return <IconFile size={36} />
    if (type.startsWith("image/")) return <IconPhoto size={36} />
    if (type === "application/pdf") return <IconFileTypePdf size={36} />
    return <IconFile size={36} />
}

function getFileIconColor(type: string | null) {
    if (!type) return "neutral/40"
    if (type.startsWith("image/")) return "blue.500"
    if (type === "application/pdf") return "red.500"
    return "neutral/40"
}

function getFileIconBg(type: string | null) {
    if (!type) return "neutral/5"
    if (type.startsWith("image/")) return "blue.50"
    if (type === "application/pdf") return "red.50"
    return "neutral/5"
}

function getFileTypeLabel(type: string | null): string | null {
    if (!type) return null
    if (type.startsWith("image/")) return "Image"
    if (type === "application/pdf") return "PDF"
    if (type.startsWith("text/")) return "Texte"
    if (type.includes("spreadsheet") || type.includes("excel")) return "Tableur"
    if (type.includes("document") || type.includes("word")) return "Document"
    if (type.includes("zip") || type.includes("archive") || type.includes("compressed")) return "Archive"
    return null
}

function getFileTypeBadgeColor(type: string | null): { bg: string; text: string } {
    if (!type) return { bg: "neutral/8", text: "neutral/50" }
    if (type.startsWith("image/")) return { bg: "blue.50", text: "blue.600" }
    if (type === "application/pdf") return { bg: "red.50", text: "red.600" }
    if (type.startsWith("text/")) return { bg: "green.50", text: "green.600" }
    if (type.includes("spreadsheet") || type.includes("excel")) return { bg: "emerald.50", text: "emerald.600" }
    if (type.includes("document") || type.includes("word")) return { bg: "indigo.50", text: "indigo.600" }
    return { bg: "neutral/8", text: "neutral/50" }
}

const cardStyle = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0",
    borderRadius: "xl",
    border: "1px solid",
    borderColor: "neutral/10",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
    overflow: "hidden",
    _hover: {
        borderColor: "primary/25",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
        transform: "translateY(-2px)",
    },
})

export function FilesGrid(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    files: Array<v.InferOutput<typeof returnedSchemas.file>>
    folders: Array<v.InferOutput<typeof returnedSchemas.folder>>
    currentFolderId: string | null
    parentFolderId: string | null
    onFolderOpen: (folderId: string | null) => void
    hasActiveFilters?: boolean
}) {
    const [dragOverFolderId, setDragOverFolderId] = useState<string | null>(null)

    const isEmpty = props.folders.length === 0 && props.files.length === 0 && props.currentFolderId === null

    function handleDragStart(event: DragEvent, fileId: string) {
        event.dataTransfer.setData("text/plain", fileId)
        event.dataTransfer.effectAllowed = "move"
    }

    function handleDragOver(event: DragEvent, folderId: string) {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
        setDragOverFolderId(folderId)
    }

    function handleDragLeave() {
        setDragOverFolderId(null)
    }

    async function handleDrop(event: DragEvent, folderId: string) {
        event.preventDefault()
        setDragOverFolderId(null)

        const fileId = event.dataTransfer.getData("text/plain")
        if (!fileId) return

        const updateResponse = await getResponseBodyFromAPI({
            routeDefinition: updateOneFileRouteDefinition,
            body: {
                idFile: fileId,
                idYear: props.idYear,
                idFolder: folderId,
            },
        })

        if (updateResponse.ok === false) {
            toast({ title: "Impossible de déplacer le fichier", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {
                idYear: props.idYear,
            },
        })

        toast({ title: "Fichier déplacé", variant: "success" })
    }

    if (isEmpty) {
        return (
            <div
                className={css({
                    width: "100%",
                    padding: "1rem",
                    borderRadius: "lg",
                    border: "1px dashed",
                    borderColor: "neutral/15",
                    backgroundColor: "neutral/2",
                })}
            >
                <EmptyState
                    icon={<IconFile size={48} />}
                    title={props.hasActiveFilters ? "Aucun résultat" : "Aucun fichier"}
                    subtitle={props.hasActiveFilters ? undefined : "Ajoutez un fichier ou un dossier pour commencer"}
                />
            </div>
        )
    }

    return (
        <div
            className={css({
                width: "100%",
                padding: "1rem",
                borderRadius: "lg",
                border: "1px dashed",
                borderColor: "neutral/15",
                backgroundColor: "neutral/2",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "0.5rem",
                })}
            >
                {/* Back folder ("..") when inside a folder */}
                {props.currentFolderId !== null && (
                    <div
                        onClick={() => props.onFolderOpen(props.parentFolderId)}
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "0",
                            borderRadius: "lg",
                            border: "2px dashed",
                            borderColor: "neutral/12",
                            backgroundColor: "neutral/2",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            overflow: "hidden",
                            _hover: {
                                borderColor: "primary/25",
                                backgroundColor: "primary/3",
                            },
                        })}
                    >
                        <div
                            className={css({
                                width: "100%",
                                height: "100px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            })}
                        >
                            <div className={css({ color: "neutral/30" })}>
                                <IconArrowUp size={32} />
                            </div>
                        </div>
                        <div
                            className={css({
                                width: "100%",
                                padding: "0.5rem 0.75rem 0.75rem",
                                textAlign: "center",
                            })}
                        >
                            <span
                                className={css({
                                    fontSize: "sm",
                                    fontWeight: "medium",
                                    color: "neutral/50",
                                })}
                            >
                                ..
                            </span>
                        </div>
                    </div>
                )}

                {/* Folders */}
                {props.folders.map((folder) => (
                    <FolderContextMenu
                        key={folder.id}
                        folder={folder}
                        idOrganization={props.idOrganization}
                        idYear={props.idYear}
                    >
                        <div
                            onClick={() => props.onFolderOpen(folder.id)}
                            onDragOver={(e) => handleDragOver(e, folder.id)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, folder.id)}
                            className={cx(
                                css({
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0",
                                    borderRadius: "xl",
                                    border: "1px solid",
                                    borderColor: "amber.200",
                                    backgroundColor: "white",
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    overflow: "hidden",
                                    _hover: {
                                        borderColor: "amber.300",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
                                        transform: "translateY(-2px)",
                                    },
                                }),
                                dragOverFolderId === folder.id &&
                                    css({
                                        borderColor: "primary",
                                        backgroundColor: "primary/5",
                                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
                                    }),
                            )}
                        >
                            {/* Folder icon area */}
                            <div
                                className={css({
                                    width: "100%",
                                    height: "100px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "amber.50",
                                })}
                            >
                                <div className={css({ color: "amber.500" })}>
                                    <IconFolder size={40} />
                                </div>
                            </div>

                            {/* Folder info */}
                            <div
                                className={css({
                                    width: "100%",
                                    padding: "0.625rem 0.75rem 0.75rem",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.125rem",
                                    borderTop: "1px solid",
                                    borderColor: "amber.100",
                                })}
                            >
                                <span
                                    className={css({
                                        width: "100%",
                                        fontSize: "sm",
                                        fontWeight: "semibold",
                                        color: "neutral",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    })}
                                >
                                    {folder.name}
                                </span>
                                <span
                                    className={css({
                                        fontSize: "xs",
                                        color: "neutral/40",
                                    })}
                                >
                                    <FormatDate date={folder.createdAt} />
                                </span>
                            </div>
                        </div>
                    </FolderContextMenu>
                ))}

                {/* Files */}
                {props.files.map((file) => {
                    const typeLabel = getFileTypeLabel(file.type)
                    const badgeColor = getFileTypeBadgeColor(file.type)

                    return (
                        <FileContextMenu
                            key={file.id}
                            file={file}
                            idOrganization={props.idOrganization}
                            idYear={props.idYear}
                        >
                            <div
                                draggable
                                onDragStart={(e) => handleDragStart(e, file.id)}
                                onClick={() => {
                                    applicationRouter.navigate({
                                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage/$idFile",
                                        params: {
                                            idOrganization: props.idOrganization,
                                            idYear: props.idYear,
                                            idFile: file.id,
                                        },
                                    })
                                }}
                                className={cardStyle}
                            >
                                {/* File icon area */}
                                <div
                                    className={css({
                                        width: "100%",
                                        height: "100px",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor: getFileIconBg(file.type),
                                        position: "relative",
                                    })}
                                >
                                    <div className={css({ color: getFileIconColor(file.type) })}>
                                        {getFileIcon(file.type)}
                                    </div>
                                    {/* File type badge */}
                                    {typeLabel && (
                                        <span
                                            className={css({
                                                position: "absolute",
                                                top: "0.5rem",
                                                right: "0.5rem",
                                                fontSize: "2xs",
                                                fontWeight: "semibold",
                                                letterSpacing: "0.025em",
                                                padding: "0.125rem 0.375rem",
                                                borderRadius: "md",
                                                backgroundColor: badgeColor.bg,
                                                color: badgeColor.text,
                                            })}
                                        >
                                            {typeLabel}
                                        </span>
                                    )}
                                </div>

                                {/* File info */}
                                <div
                                    className={css({
                                        width: "100%",
                                        padding: "0.625rem 0.75rem 0.75rem",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.125rem",
                                        borderTop: "1px solid",
                                        borderColor: "neutral/8",
                                    })}
                                >
                                    <span
                                        className={css({
                                            width: "100%",
                                            fontSize: "sm",
                                            fontWeight: "semibold",
                                            color: "neutral",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        })}
                                    >
                                        {file.name ?? file.reference}
                                    </span>
                                    {file.name && file.reference && (
                                        <span
                                            className={css({
                                                width: "100%",
                                                fontSize: "xs",
                                                color: "neutral/50",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            })}
                                        >
                                            {file.reference}
                                        </span>
                                    )}
                                    <div
                                        className={css({
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1",
                                            fontSize: "xs",
                                            color: "neutral/40",
                                            marginTop: "0.125rem",
                                        })}
                                    >
                                        <FormatDate date={file.createdAt} />
                                        {file.size && (
                                            <>
                                                <span className={css({ color: "neutral/20" })}>·</span>
                                                <FormatFileSize size={file.size} />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </FileContextMenu>
                    )
                })}
            </div>
        </div>
    )
}
