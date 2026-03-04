import {
    deleteOneRecordLabelRouteDefinition,
    readAllRecordLabelsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function DeleteOneRecordLabel(props: {
    recordLabel: v.InferOutput<typeof returnedSchemas.recordLabel>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneRecordLabelRouteDefinition,
            body: {
                idRecordLabel: props.recordLabel.id,
                idYear: props.recordLabel.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la catégorie", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllRecordLabelsRouteDefinition,
            body: {
                idYear: props.recordLabel.idYear,
            },
        })

        toast({ title: "Catégorie supprimée", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/catégories",
            params: {
                idOrganization: props.recordLabel.idOrganization,
                idYear: props.recordLabel.idYear,
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette catégorie ?"
            description={
                <>
                    Cette action supprimera la catégorie et toutes ses mentions associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer la catégorie"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
