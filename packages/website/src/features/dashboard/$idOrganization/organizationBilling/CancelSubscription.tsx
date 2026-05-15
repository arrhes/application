import {
    cancelSubscriptionRouteDefinition,
    readOrganizationBillingRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, ButtonPlainContent, Dialog, toast, useModalStore } from "@arrhes/ui"
import { IconPlayerPause } from "@tabler/icons-react"
import { useId } from "react"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function CancelSubscription(_props: { idOrganization: string }) {
    const modalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

    async function onSubmit() {
        const response = await getResponseBodyFromAPI({
            routeDefinition: cancelSubscriptionRouteDefinition,
            body: {},
        })

        if (response.ok === false) {
            toast({
                title: "Erreur lors de la mise en pause de l'abonnement",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readOrganizationBillingRouteDefinition,
            body: {},
        })

        toast({
            title: "Abonnement mis en pause",
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
                            <Dialog.Title>Voulez-vous mettre en pause votre abonnement ?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Dialog.Description>
                                Votre accès Premium sera maintenu jusqu'à la fin de la période en cours.
                                Aucun nouveau paiement ne sera prélevé.
                                Vous pourrez vous abonner de nouveau à tout moment.
                            </Dialog.Description>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => closeModal(modalId)}>
                                <ButtonOutlineContent text="Annuler" />
                            </Button>
                            <Button hasLoader onClick={async () => { await onSubmit(); closeModal(modalId) }}>
                                <ButtonPlainContent color="danger" leftIcon={<IconPlayerPause />} text="Mettre en pause l'abonnement" />
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>,
                )
            }
        >
            <ButtonOutlineContent
                leftIcon={<IconPlayerPause />}
                text="Mettre en pause l'abonnement"
                color="danger"
            />
        </Button>
    )
}
