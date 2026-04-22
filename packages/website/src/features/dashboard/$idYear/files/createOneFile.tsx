import {
    createOneFileRouteDefinition,
    generateFilePutSignedUrlRouteDefinition,
    readAllFilesRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, toast } from "@arrhes/ui"
import type { JSX } from "react"
import { useRef } from "react"
import type * as v from "valibot"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

const MAX_FILE_SIZE = 1024 * 1024 * 50 // 50 MB

/**
 * Derive a human-readable reference from a file name by stripping the extension.
 */
function referenceFromFileName(name: string): string {
    const dotIndex = name.lastIndexOf(".")
    return dotIndex > 0 ? name.slice(0, dotIndex) : name
}

async function computeSHA256(file: File): Promise<string> {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("")
}

async function uploadOneFile(params: {
    idOrganization: string
    idYear: string
    idFolder?: string | null
    file: File
}): Promise<"added" | "duplicate" | "error"> {
    const { file, idOrganization: _idOrganization, idYear, idFolder } = params

    if (file.size > MAX_FILE_SIZE) {
        toast({ title: `"${file.name}" dépasse la taille maximale de 50 Mo`, variant: "error" })
        return "error"
    }

    const hash = await computeSHA256(file)

    // Step 1 - create the database record (server deduplicates by hash)
    const createResponse = await getResponseBodyFromAPI({
        routeDefinition: createOneFileRouteDefinition,
        body: {
            idYear,
            idFolder: idFolder ?? undefined,
            reference: referenceFromFileName(file.name),
            name: file.name,
            hash,
        },
    })
    if (createResponse.ok === false) {
        toast({ title: `Impossible de créer "${file.name}"`, variant: "error" })
        return "error"
    }

    // If the file already exists in storage (deduplication), skip upload
    if (createResponse.data.storageKey !== null) {
        return "duplicate"
    }

    // Step 2 - obtain a pre-signed PUT URL and update storage metadata
    const signedUrlResponse = await getResponseBodyFromAPI({
        routeDefinition: generateFilePutSignedUrlRouteDefinition,
        body: {
            idYear,
            idFile: createResponse.data.id,
            type: file.type,
            size: file.size,
        },
    })
    if (signedUrlResponse.ok === false) {
        toast({ title: `Impossible de télécharger "${file.name}"`, variant: "error" })
        return "error"
    }

    // Step 3 - upload the binary directly to object storage
    const uploadResponse = await fetch(signedUrlResponse.data.url, {
        method: "PUT",
        body: file,
    })
    if (uploadResponse.ok === false) {
        toast({ title: `Échec du téléchargement de "${file.name}"`, variant: "error" })
        return "error"
    }

    return "added"
}

export function CreateOneFile(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    idFolder?: string | null
    children: JSX.Element
}) {
    const inputRef = useRef<HTMLInputElement | null>(null)

    async function handleFiles(files: FileList) {
        const fileArray = Array.from(files)
        if (fileArray.length === 0) return

        const results = await Promise.all(
            fileArray.map((file) =>
                uploadOneFile({
                    idOrganization: props.idOrganization,
                    idYear: props.idYear,
                    idFolder: props.idFolder,
                    file,
                }),
            ),
        )

        const added = results.filter((r) => r === "added").length
        const duplicates = results.filter((r) => r === "duplicate").length
        const failed = results.filter((r) => r === "error").length

        if (added > 0) {
            await invalidateData({
                routeDefinition: readAllFilesRouteDefinition,
                body: {
                    idYear: props.idYear,
                },
            })
        }

        if (failed > 0) {
            toast({
                title: `${added} fichier(s) ajouté(s), ${failed} en erreur`,
                variant: "error",
            })
        } else if (duplicates > 0 && added === 0) {
            toast({
                title: duplicates === 1 ? "Ce fichier existe déjà" : `Ces ${duplicates} fichiers existent déjà`,
                variant: "information",
            })
        } else if (duplicates > 0) {
            toast({
                title: `${added} fichier(s) ajouté(s), ${duplicates} déjà existant(s)`,
                variant: "success",
            })
        } else {
            toast({
                title: added === 1 ? "Fichier ajouté avec succès" : `${added} fichiers ajoutés avec succès`,
                variant: "success",
            })
        }
    }

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={(event) => {
                    if (event.target.files && event.target.files.length > 0) {
                        handleFiles(event.target.files)
                    }
                    // Reset so selecting the same file(s) again still triggers onChange
                    event.target.value = ""
                }}
            />
            <Button onClick={() => inputRef.current?.click()}>{props.children}</Button>
        </>
    )
}
