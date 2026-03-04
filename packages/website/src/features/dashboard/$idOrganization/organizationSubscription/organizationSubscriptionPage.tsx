import {
    createFirstPaymentRouteDefinition,
    readOrganizationSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCreditCard } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { FormatDateTime } from "../../../../components/formats/formatDateTime.tsx"
import type { ChipColors } from "../../../../components/layouts/chip.tsx"
import { Chip } from "../../../../components/layouts/chip.tsx"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { toast } from "../../../../contexts/toasts/useToast.ts"
import { organizationSubscriptionRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionRoute.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { CancelSubscription } from "./cancelSubscription.js"

const MONTHLY_PRICE_CENTS = 3000

/**
 * Calculate the pro-rata amount in euros for the remaining days of the current month (including today).
 * Must mirror the server-side logic in createFirstPayment.ts.
 */
function getProRataAmount(): string {
    const now = new Date()
    const daysInMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate()
    const remainingDays = daysInMonth - now.getUTCDate() + 1
    const cents = Math.round((remainingDays / daysInMonth) * MONTHLY_PRICE_CENTS)
    return (cents / 100).toFixed(2).replace(".", ",")
}

export function OrganizationSubscriptionPage() {
    const params = useParams({ from: organizationSubscriptionRoute.id })
    const [isSubscribing, setIsSubscribing] = useState(false)

    async function handleSubscribe() {
        setIsSubscribing(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: createFirstPaymentRouteDefinition,
            body: {},
        })

        if (response.ok === false) {
            toast({
                title: "Erreur lors de la création du paiement",
                variant: "error",
            })
            setIsSubscribing(false)
            return
        }

        window.location.href = response.data.checkoutUrl
    }

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper routeDefinition={readOrganizationSubscriptionRouteDefinition} body={{}}>
                    {(subscription) => {
                        return (
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                })}
                            >
                                <SettingsSection.Root>
                                    <SettingsSection.Header title="Statut de l'abonnement" />
                                    <SettingsSection.Row
                                        title="Statut"
                                        description={
                                            subscription.subscriptionStatus === "active"
                                                ? "Votre organisation bénéficie du plan Avancé."
                                                : subscription.subscriptionStatus === "cancelled"
                                                  ? "Votre abonnement a été annulé. L'accès Premium reste actif jusqu'à la fin de la période payée."
                                                  : subscription.subscriptionStatus === "expired"
                                                    ? "Votre abonnement a expiré."
                                                    : "Votre organisation utilise le plan basique."
                                        }
                                    >
                                        <Chip
                                            text={
                                                subscription.subscriptionStatus === "active"
                                                    ? "Avancé"
                                                    : subscription.subscriptionStatus === "cancelled"
                                                      ? "Annulé"
                                                      : "Basique"
                                            }
                                            color={
                                                (subscription.subscriptionStatus === "active"
                                                    ? "success"
                                                    : subscription.subscriptionStatus === "cancelled"
                                                      ? "warning"
                                                      : "neutral") as ChipColors
                                            }
                                        />
                                    </SettingsSection.Row>
                                    {!subscription.isPremium && (
                                        <SettingsSection.Row
                                            title="Passer au plan Avancé"
                                            description={`Un premier paiement de ${getProRataAmount()}\u202f\u20ac sera prélevé pour la fin du mois en cours, puis 30\u202f\u20ac par mois à partir du 1er du mois suivant.`}
                                        >
                                            <Button onClick={handleSubscribe} hasLoader>
                                                <ButtonOutlineContent
                                                    leftIcon={<IconCreditCard />}
                                                    text={isSubscribing ? "Redirection..." : "S'abonner"}
                                                />
                                            </Button>
                                        </SettingsSection.Row>
                                    )}
                                    {subscription.isPremium && subscription.subcriptionEndingAt && (
                                        <SettingsSection.Row
                                            title="Accès jusqu'au"
                                            description="Date de fin de la période en cours."
                                        >
                                            <FormatDateTime date={subscription.subcriptionEndingAt} />
                                        </SettingsSection.Row>
                                    )}
                                    {subscription.subscriptionStatus === "active" && (
                                        <SettingsSection.Row
                                            title="Annuler l'abonnement"
                                            description="Vous conserverez l'accès jusqu'à la fin de la période en cours."
                                            variant="danger"
                                        >
                                            <CancelSubscription idOrganization={params.idOrganization} />
                                        </SettingsSection.Row>
                                    )}
                                </SettingsSection.Root>
                            </div>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
