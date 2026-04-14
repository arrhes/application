import {
    deleteOneComputationRouteDefinition,
    readAllComputationsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../../../../components/overlays/dialog/confirmationModal.tsx"
import { applicationRouter } from "../../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../utilities/invalidateData.ts"

export function DeleteOneComputation(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneComputationRouteDefinition,
            body: {
                idComputation: props.computation.id,
                idYear: props.computation.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la ligne de calcul", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllComputationsRouteDefinition,
            body: {
                idYear: props.computation.idYear,
            },
        })

        toast({ title: "Ligne de calcul supprimée", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/compte-de-résultat",
            params: {
                idOrganization: props.computation.idOrganization,
                idYear: props.computation.idYear,
            },
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous supprimer cette ligne de calcul ?"
            description={
                <>
                    Cette action supprimera la ligne de calcul et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitButtonProps={{ color: "danger", text: "Supprimer la ligne de calcul" }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
