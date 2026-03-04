import {
    createOneFileRouteDefinition,
    generateFilePutSignedUrlRouteDefinition,
    readAllFilesRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button } from "@arrhes/ui"
import type { JSX } from "react"
import { useRef } from "react"
import type * as v from "valibot"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

const MAX_FILE_SIZE = 1024 * 1024 * 10 // 10 MB

/**
 * Derive a human-readable reference from a file name by stripping the extension.
 */
function referenceFromFileName(name: string): string {
    const dotIndex = name.lastIndexOf(".")
    return dotIndex > 0 ? name.slice(0, dotIndex) : name
}

async function uploadOneFile(params: {
    idOrganization: string
    idYear: string
    idFolder?: string | null
    file: File
}): Promise<boolean> {
    const { file, idOrganization: _idOrganization, idYear, idFolder } = params

    if (file.size > MAX_FILE_SIZE) {
        toast({ title: `"${file.name}" dépasse la taille maximale de 10 Mo`, variant: "error" })
        return false
    }

    // Step 1 — create the database record
    const createResponse = await getResponseBodyFromAPI({
        routeDefinition: createOneFileRouteDefinition,
        body: {
            idYear,
            idFolder: idFolder ?? undefined,
            reference: referenceFromFileName(file.name),
            name: file.name,
        },
    })
    if (createResponse.ok === false) {
        toast({ title: `Impossible de créer "${file.name}"`, variant: "error" })
        return false
    }

    // Step 2 — obtain a pre-signed PUT URL and update storage metadata
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
        return false
    }

    // Step 3 — upload the binary directly to object storage
    const uploadResponse = await fetch(signedUrlResponse.data.url, {
        method: "PUT",
        body: file,
    })
    if (uploadResponse.ok === false) {
        toast({ title: `Échec du téléchargement de "${file.name}"`, variant: "error" })
        return false
    }

    return true
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

        const succeeded = results.filter(Boolean).length
        const failed = results.length - succeeded

        if (succeeded > 0) {
            await invalidateData({
                routeDefinition: readAllFilesRouteDefinition,
                body: {
                    idYear: props.idYear,
                },
            })
        }

        if (failed === 0) {
            toast({
                title: succeeded === 1 ? "Fichier ajouté avec succès" : `${succeeded} fichiers ajoutés avec succès`,
                variant: "success",
            })
        } else {
            toast({
                title: `${succeeded} fichier(s) ajouté(s), ${failed} en erreur`,
                variant: "error",
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
