import {
    cancelSubscriptionRouteDefinition,
    readOrganizationBillingRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, toast } from "@arrhes/ui"
import { IconPlayerPause } from "@tabler/icons-react"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function CancelSubscription(_props: { idOrganization: string }) {
    return (
        <ConfirmationModal
            title="Voulez-vous mettre en pause votre abonnement ?"
            description={
                <>
                    Votre accès Premium sera maintenu jusqu'à la fin de la période en cours.
                    <br />
                    Aucun nouveau paiement ne sera prélevé.
                    <br />
                    Vous pourrez vous abonner de nouveau à tout moment.
                </>
            }
            submitButtonProps={{
                text: "Mettre en pause l'abonnement",
                color: "danger",
                leftIcon: <IconPlayerPause />,
            }}
            onSubmit={async () => {
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
            }}
        >
            <ButtonOutlineContent
                leftIcon={<IconPlayerPause />}
                text="Mettre en pause l'abonnement"
                color="danger"
            />
        </ConfirmationModal>
    )
}
