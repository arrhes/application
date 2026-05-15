import {
    createFirstPaymentRouteDefinition,
    readOrganizationBillingRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, toast } from "@arrhes/ui"
import { IconPlayerPlay } from "@tabler/icons-react"
import { ConfirmationModal } from "../../../../components/overlays/dialog/ConfirmationModal.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function ResumeSubscription() {
    return (
        <ConfirmationModal
            title="Voulez-vous reprendre les paiements de votre abonnement ?"
            description={
                <>
                    Les prélèvements mensuels automatiques reprendront à partir de la prochaine échéance.
                    <br />
                    Aucun nouveau paiement immédiat ne sera prélevé.
                </>
            }
            submitButtonProps={{
                color: "default",
                text: "Reprendre les paiements",
                leftIcon: <IconPlayerPlay />,
            }}
            onSubmit={async () => {
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
            }}
        >
            <ButtonOutlineContent
                leftIcon={<IconPlayerPlay />}
                text="Reprendre l'abonnement"
            />
        </ConfirmationModal>
    )
}
