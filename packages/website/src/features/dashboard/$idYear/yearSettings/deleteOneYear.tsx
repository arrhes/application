import { deleteOneYearRouteDefinition, readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function DeleteOneYear(props: {
    year: v.InferOutput<typeof returnedSchemas.year>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneYearRouteDefinition,
            body: {
                idYear: props.year.id,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de l'exercice", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllYearsRouteDefinition,
            body: {},
        })

        toast({ title: "Exercice supprimé", variant: "success" })

        applicationRouter.navigate({
            to: "/dashboard/organisations/$idOrganization/exercices",
            params: {
                idOrganization: props.year.idOrganization,
            },
        })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cet exercice ?"
            description={
                <>
                    Cette action supprimera l'exercice et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer l'exercice"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
