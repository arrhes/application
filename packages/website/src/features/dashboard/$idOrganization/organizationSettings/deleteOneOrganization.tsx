import {
    deleteOneOrganizationRouteDefinition,
    getAllMyOrganizationsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function DeleteOneOrganization(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette organisation ?"
            description={
                <>
                    Cette action supprimera l'organisation et toutes les données associées.
                    <br />
                    Cette action est irréversible.
                </>
            }
            submitText="Supprimer l'organisation"
            onSubmit={async () => {
                const deleteResponse = await getResponseBodyFromAPI({
                    routeDefinition: deleteOneOrganizationRouteDefinition,
                    body: {},
                })

                if (deleteResponse.ok === false) {
                    toast({ title: "Erreur lors de la suppression de l'organisation", variant: "error" })
                    return
                }

                await invalidateData({
                    routeDefinition: getAllMyOrganizationsRouteDefinition,
                    body: {},
                })

                toast({ title: "Organisation supprimée", variant: "success" })

                applicationRouter.navigate({ to: "/dashboard/organisations" })
            }}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
