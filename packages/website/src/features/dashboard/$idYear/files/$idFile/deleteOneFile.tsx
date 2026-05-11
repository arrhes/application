import { readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../../components/overlays/dialog/confirmationModal.tsx"
import { applicationRouter } from "../../../../../routes/applicationRouter.tsx"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"
import { deleteFileWithSignedUrl } from "../deleteFileWithSignedUrl.ts"

export function DeleteOneFile(props: {
    file: v.InferOutput<typeof returnedSchemas.file>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const isDeleted = await deleteFileWithSignedUrl({
            idFile: props.file.id,
            idYear: props.file.idYear,
        })

        if (isDeleted === false) {
            toast({
                title: "Erreur lors de la suppression du fichier",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {
                idYear: props.file.idYear,
            },
        })

        toast({
            title: "Fichier supprimé",
            variant: "success",
        })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage",
            params: {
                idOrganization: props.file.idOrganization,
                idYear: props.file.idYear,
            },
            search: {
                idFolder: undefined,
            },
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous supprimer ce fichier ?"
            description={
                <>
                    Cette action supprimera le fichier et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitButtonProps={{
                color: "danger",
                text: "Supprimer le fichier",
            }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
