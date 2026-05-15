import type { readAllApiKeysRouteDefinition as ReadAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import { deleteOneApiKeyRouteDefinition, readAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, ButtonPlainContent, Dialog, toast, useModalStore } from "@arrhes/ui"
import { type ComponentPropsWithRef, type ReactElement, useId } from "react"
import type * as v from "valibot"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function DeleteOneApiKey(props: {
    apiKey: v.InferOutput<typeof ReadAllApiKeysRouteDefinition.schemas.return>[number]
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    const modalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneApiKeyRouteDefinition,
            body: {
                idApiKey: props.apiKey.id,
            },
        })

        if (deleteResponse.ok === false) {
            toast({
                title: "Erreur lors de la suppression de la clé API",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readAllApiKeysRouteDefinition,
            body: {},
        })
        toast({
            title: "Clé API supprimée avec succès",
            variant: "success",
        })
    }

    return (
        <Button
            onClick={() =>
                openModal(
                    modalId,
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Voulez-vous supprimer cette clé API ?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Dialog.Description>
                                Cette action est irréversible. Les applications utilisant cette clé ne pourront plus accéder à l'API.
                            </Dialog.Description>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => closeModal(modalId)}>
                                <ButtonOutlineContent text="Annuler" />
                            </Button>
                            <Button hasLoader onClick={async () => { await onSubmit(); closeModal(modalId) }}>
                                <ButtonPlainContent color="danger" text="Supprimer la clé" />
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>,
                )
            }
        >
            {props.children}
        </Button>
    )
}
