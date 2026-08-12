import {
    deleteOneOrganizationUserRouteDefinition,
    readOneOrganizationRouteDefinition,
} from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { Button, ButtonOutlineContent, ButtonPlainContent, Dialog, toast, useModalStore } from "@comptasse/ui"
import { type ComponentPropsWithRef, type ReactElement, useId } from "react"
import type * as v from "valibot"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function DeleteOneOrganizationUser(props: {
    organizationUser: v.InferOutput<typeof returnedSchemas.organizationUser>
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    const modalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

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
        <Button
            onClick={() =>
                openModal(
                    modalId,
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Voulez-vous révoquer l'utilisateur de cette organisation ?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Dialog.Description>Cette action est irréversible.</Dialog.Description>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => closeModal(modalId)}>
                                <ButtonOutlineContent text="Annuler" />
                            </Button>
                            <Button
                                hasLoader
                                onClick={async () => {
                                    await onSubmit()
                                    closeModal(modalId)
                                }}
                            >
                                <ButtonPlainContent
                                    color="danger"
                                    text="Révoquer l'utilisateur"
                                />
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
