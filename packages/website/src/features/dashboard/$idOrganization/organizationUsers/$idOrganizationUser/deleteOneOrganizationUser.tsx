import {
    deleteOneOrganizationUserRouteDefinition,
    readOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function DeleteOneOrganizationUser(props: {
    organizationUser: v.InferOutput<typeof returnedSchemas.organizationUser>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneOrganizationUserRouteDefinition,
            body: {
                idOrganizationUser: props.organizationUser.id,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la révocation de l'utilisateur", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readOneOrganizationRouteDefinition,
            body: {},
        })
        toast({ title: "Utilisateur révoqué de l'organisation", variant: "success" })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous révoquer l'utilisateur de cette organisation ?"
            description="Cette action est irréversible."
            submitText="Révoquer l'utilisateur"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
