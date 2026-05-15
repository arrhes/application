import { reverseOneEntryRouteDefinition } from "@arrhes/application-metadata"
import {
    readAllEntriesRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readAllEntryTagsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../components/overlays/dialog/ConfirmationModal.tsx"
import { applicationRouter } from "../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function ReverseOneEntry(props: {
    entry: v.InferOutput<typeof returnedSchemas.entry>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const reverseResponse = await getResponseBodyFromAPI({
            routeDefinition: reverseOneEntryRouteDefinition,
            body: {
                idEntry: props.entry.id,
                idYear: props.entry.idYear,
            },
        })

        if (reverseResponse.ok === false) {
            toast({
                title: "Erreur lors de l'extourne de l'écriture",
                variant: "error",
            })
            return
        }

        await Promise.all([
            invalidateData({
                routeDefinition: readAllEntriesRouteDefinition,
                body: {
                    idYear: props.entry.idYear,
                },
            }),
            invalidateData({
                routeDefinition: readAllEntryLinesRouteDefinition,
                body: {
                    idYear: props.entry.idYear,
                },
            }),
            invalidateData({
                routeDefinition: readAllEntryTagsRouteDefinition,
                body: {
                    idYear: props.entry.idYear,
                },
            }),
        ])

        toast({
            title: "Écriture extournée",
            variant: "success",
        })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry",
            params: {
                idOrganization: props.entry.idOrganization,
                idYear: props.entry.idYear,
                idEntry: reverseResponse.data.id,
            },
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous extourner cette écriture ?"
            description={
                <>
                    Cette action créera une écriture d'extourne avec les mêmes mouvements inversés.
                    <br />
                    L'écriture originale ne sera pas modifiée.
                </>
            }
            submitButtonProps={{
                text: "Extourner l'écriture",
            }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
