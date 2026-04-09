import { deleteOneFileRouteDefinition, readAllFilesRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { applicationRouter } from "../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function DeleteOneFile(props: {
    file: v.InferOutput<typeof returnedSchemas.file>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneFileRouteDefinition,
            body: {
                idFile: props.file.id,
                idYear: props.file.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du fichier", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllFilesRouteDefinition,
            body: {
                idYear: props.file.idYear,
            },
        })

        toast({ title: "Fichier supprimé", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/stockage",
            params: {
                idOrganization: props.file.idOrganization,
                idYear: props.file.idYear,
            },
            search: { idFolder: undefined },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer ce fichier ?"
            description={
                <>
                    Cette action supprimera le fichier et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer le fichier"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
