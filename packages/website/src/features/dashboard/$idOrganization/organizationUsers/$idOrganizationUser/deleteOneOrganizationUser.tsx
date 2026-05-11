import {
    deleteOneOrganizationUserRouteDefinition,
    readOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { toast } from "@arrhes/ui"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { ConfirmationModal } from "../../../../../components/overlays/dialog/confirmationModal.tsx"
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
            toast({
                title: "Erreur lors de la révocation de l'utilisateur",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readOneOrganizationRouteDefinition,
            body: {
                idOrganization: props.organizationUser.idOrganization,
            },
        })
        toast({
            title: "Utilisateur révoqué de l'organisation",
            variant: "success",
        })
    }

    return (
        <ConfirmationModal
            title="Voulez-vous révoquer l'utilisateur de cette organisation ?"
            description="Cette action est irréversible."
            submitButtonProps={{
                color: "danger",
                text: "Révoquer l'utilisateur",
            }}
            onSubmit={onSubmit}
        >
            {props.children}
        </ConfirmationModal>
    )
}
