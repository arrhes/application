import {
    deleteOneRecordRowRouteDefinition,
    readAllRecordRowsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function DeleteOneRecordRow(props: {
    recordRow: v.InferOutput<typeof returnedSchemas.recordRow>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneRecordRowRouteDefinition,
            body: {
                idRecordRow: props.recordRow.id,
                idYear: props.recordRow.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression du mouvement", variant: "error" })
            return
        }

        await Promise.all([
            invalidateData({
                routeDefinition: readAllRecordRowsRouteDefinition,
                body: {
                    idYear: props.recordRow.idYear,
                    idRecord: props.recordRow.idRecord,
                },
            }),
            invalidateData({
                routeDefinition: readAllRecordRowsRouteDefinition,
                body: {
                    idYear: props.recordRow.idYear,
                },
            }),
        ])

        toast({ title: "Écriture supprimée", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord",
            params: {
                idOrganization: props.recordRow.idOrganization,
                idYear: props.recordRow.idYear,
                idRecord: props.recordRow.idRecord,
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer ce mouvement ?"
            description={
                <>
                    Cette action supprimera le mouvement et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer le mouvement"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
