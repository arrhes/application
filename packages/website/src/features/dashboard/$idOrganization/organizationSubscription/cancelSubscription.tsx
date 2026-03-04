import {
    cancelSubscriptionRouteDefinition,
    readOrganizationSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent } from "@arrhes/ui"
import { IconX } from "@tabler/icons-react"
import { DeleteConfirmation } from "../../../../components/overlays/dialog/deleteConfirmation.tsx"
import { toast } from "../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function CancelSubscription(_props: { idOrganization: string }) {
    return (
        <DeleteConfirmation
            title="Voulez-vous annuler votre abonnement ?"
            description={
                <>
                    Votre accès Premium sera maintenu jusqu'à la fin de la période en cours.
                    <br />
                    Aucun nouveau paiement ne sera prélevé.
                    <br />
                    Vous pourrez vous réabonner à tout moment.
                </>
            }
            submitText="Annuler l'abonnement"
            onSubmit={async () => {
                const response = await getResponseBodyFromAPI({
                    routeDefinition: cancelSubscriptionRouteDefinition,
                    body: {},
                })

                if (response.ok === false) {
                    toast({
                        title: "Erreur lors de l'annulation de l'abonnement",
                        variant: "error",
                    })
                    return
                }

                await invalidateData({
                    routeDefinition: readOrganizationSubscriptionRouteDefinition,
                    body: {},
                })

                toast({ title: "Abonnement annulé", variant: "success" })
            }}
        >
            <ButtonOutlineContent leftIcon={<IconX />} text="Annuler l'abonnement" color="danger" />
        </DeleteConfirmation>
    )
}
