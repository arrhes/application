import {
    createFirstPaymentRouteDefinition,
    readOrganizationBillingRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, ButtonPlainContent, Dialog, toast, useModalStore } from "@arrhes/ui"
import { IconPlayerPlay } from "@tabler/icons-react"
import { useId } from "react"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function ResumeSubscription() {
    const modalId = useId()
    const { open: openModal, close: closeModal } = useModalStore()

    async function onSubmit() {
        const response = await getResponseBodyFromAPI({
            routeDefinition: createFirstPaymentRouteDefinition,
            body: {},
        })

        if (response.ok === false) {
            toast({
                title: "Erreur lors de la reprise des paiements",
                variant: "error",
            })
            return
        }

        await invalidateData({
            routeDefinition: readOrganizationBillingRouteDefinition,
            body: {},
        })

        window.location.href = response.data.checkoutUrl
    }

    return (
        <Button
            onClick={() =>
                openModal(
                    modalId,
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Voulez-vous reprendre les paiements de votre abonnement ?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Dialog.Description>
                                Les prélèvements mensuels automatiques reprendront à partir de la prochaine échéance.
                                Aucun nouveau paiement immédiat ne sera prélevé.
                            </Dialog.Description>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => closeModal(modalId)}>
                                <ButtonOutlineContent text="Annuler" />
                            </Button>
                            <Button hasLoader onClick={async () => { await onSubmit(); closeModal(modalId) }}>
                                <ButtonPlainContent leftIcon={<IconPlayerPlay />} text="Reprendre les paiements" />
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>,
                )
            }
        >
            <ButtonOutlineContent
                leftIcon={<IconPlayerPlay />}
                text="Reprendre l'abonnement"
            />
        </Button>
    )
}
