import type { readAllApiKeysRouteDefinition as ReadAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import { deleteOneApiKeyRouteDefinition, readAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import type { ComponentPropsWithRef, ReactElement } from "react"
import type * as v from "valibot"
import { DeleteConfirmation } from "../../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function DeleteOneApiKey(props: {
    apiKey: v.InferOutput<typeof ReadAllApiKeysRouteDefinition.schemas.return>[number]
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneApiKeyRouteDefinition,
            body: {
                idApiKey: props.apiKey.id,
            },
        })

        if (deleteResponse.ok === false) {
            toast({ title: "Erreur lors de la suppression de la clé API", variant: "error" })
            return
        }

        await invalidateData({
            routeDefinition: readAllApiKeysRouteDefinition,
            body: {},
        })
        toast({ title: "Clé API supprimée avec succès", variant: "success" })
    }

    return (
        <DeleteConfirmation
            title="Voulez-vous supprimer cette clé API ?"
            description="Cette action est irréversible. Les applications utilisant cette clé ne pourront plus accéder à l'API."
            submitText="Supprimer la clé"
            onSubmit={onSubmit}
        >
            {props.children}
        </DeleteConfirmation>
    )
}
