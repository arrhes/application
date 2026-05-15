import {
    deleteOneOrganizationRouteDefinition,
    getAllMyOrganizationsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, ButtonPlainContent, Dialog, toast, useModalStore } from "@arrhes/ui"
import { type ComponentPropsWithRef, type ReactElement, useId } from "react"
import type * as v from "valibot"
import { applicationRouter } from "../../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function DeleteOneOrganization(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: ReactElement<ComponentPropsWithRef<"div">>
}) {
    const modalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

    async function onSubmit() {
        const deleteResponse = await getResponseBodyFromAPI({
            routeDefinition: deleteOneOrganizationRouteDefinition,
            body: {},
        })

        if (deleteResponse.ok === false) {
            toast({
                title: "Erreur lors de la suppression de l'organisation",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: getAllMyOrganizationsRouteDefinition,
            body: {},
        })

        toast({
            title: "Organisation supprimée",
            variant: "success",
        })

        applicationRouter.navigate({
            to: "/dashboard/organisations",
        })
    }

    return (
        <Button
            onClick={() =>
                openModal(
                    modalId,
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Voulez-vous supprimer cette organisation ?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Dialog.Description>
                                Cette action supprimera l'organisation et toutes les données associées.
                                Cette action est irréversible.
                            </Dialog.Description>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => closeModal(modalId)}>
                                <ButtonOutlineContent text="Annuler" />
                            </Button>
                            <Button hasLoader onClick={async () => { await onSubmit(); closeModal(modalId) }}>
                                <ButtonPlainContent color="danger" text="Supprimer l'organisation" />
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
