import { deleteOneEntryRouteDefinition, readAllEntriesRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../../components/overlays/dialog/confirmationModal.tsx"
import { applicationRouter } from "../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function DeleteOneEntry(props: {
    entry: v.InferOutput<typeof returnedSchemas.entry>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneEntryRouteDefinition,
            body: {
                idEntry: props.entry.id,
                idYear: props.entry.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({
                title: "Erreur lors de la suppression de l'écriture",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readAllEntriesRouteDefinition,
            body: {
                idYear: props.entry.idYear,
            },
        })

        toast({
            title: "Écriture supprimée",
            variant: "success",
        })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures",
            params: {
                idOrganization: props.entry.idOrganization,
                idYear: props.entry.idYear,
            },
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous supprimer cette écriture ?"
            description={
                <>
                    Cette action supprimera l'écriture et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitButtonProps={{
                color: "danger",
                text: "Supprimer l'écriture",
            }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
