import {
    deleteOneEntryLineRouteDefinition,
    readAllEntryLinesRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../../../components/overlays/dialog/ConfirmationModal.tsx"
import { applicationRouter } from "../../../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function DeleteOneEntryLine(props: {
    entryLine: v.InferOutput<typeof returnedSchemas.entryLine>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneEntryLineRouteDefinition,
            body: {
                idEntryLine: props.entryLine.id,
                idYear: props.entryLine.idYear,
            },
        })

        if (deleteResponse.ok === false) {
            toast({
                title: "Erreur lors de la suppression du mouvement",
                variant: "error",
            })
            return
        }

        await Promise.all([
            invalidateData({
                routeDefinition: readAllEntryLinesRouteDefinition,
                body: {
                    idYear: props.entryLine.idYear,
                    idEntry: props.entryLine.idEntry,
                },
            }),
            invalidateData({
                routeDefinition: readAllEntryLinesRouteDefinition,
                body: {
                    idYear: props.entryLine.idYear,
                },
            }),
        ])

        toast({
            title: "Écriture supprimée",
            variant: "success",
        })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry",
            params: {
                idOrganization: props.entryLine.idOrganization,
                idYear: props.entryLine.idYear,
                idEntry: props.entryLine.idEntry,
            },
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous supprimer ce mouvement ?"
            description={
                <>
                    Cette action supprimera le mouvement et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitButtonProps={{
                color: "danger",
                text: "Supprimer le mouvement",
            }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
