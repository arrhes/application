import { deleteOneTagRouteDefinition, readAllTagsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../../../components/overlays/dialog/confirmationModal.tsx"
import { applicationRouter } from "../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function DeleteOneTag(props: {
    tag: v.InferOutput<typeof returnedSchemas.tag>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneTagRouteDefinition,
            body: {
                idTag: props.tag.id,
                idYear: props.tag.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({
                title: "Erreur lors de la suppression de la catégorie",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readAllTagsRouteDefinition,
            body: {
                idYear: props.tag.idYear,
            },
        })

        toast({
            title: "Catégorie supprimée",
            variant: "success",
        })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/catégories",
            params: {
                idOrganization: props.tag.idOrganization,
                idYear: props.tag.idYear,
            },
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous supprimer cette catégorie ?"
            description={
                <>
                    Cette action supprimera la catégorie et toutes ses mentions associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitButtonProps={{
                color: "danger",
                text: "Supprimer la catégorie",
            }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
