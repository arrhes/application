import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { type JSX, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { organizationServicesRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionsRoute.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { OrganizationBillingDisclaimerBanner } from "./organizationBillingComponents.tsx"
import { UpdateLicenceSubscriptionDrawer } from "./updateLicenceSubscriptionDrawer.tsx"
import { UpdateOcrSubscriptionDrawer } from "./updateOcrSubscriptionDrawer.tsx"
import { UpdateStorageSubscriptionDrawer } from "./updateStorageSubscriptionDrawer.tsx"
import { UpdateTokensSubscriptionDrawer } from "./updateTokensSubscriptionDrawer.tsx"

const FREE_STORAGE_BYTES = 1_073_741_824
const INCLUDED_AGENT_TOKENS = 1_000_000
const INCLUDED_OCR_PAGES = 100

function getStorageAddonQuantity(storageMaxUsage: number) {
    return Math.max(Math.round((storageMaxUsage - FREE_STORAGE_BYTES) / FREE_STORAGE_BYTES), 0)
}

function getRecurringStorageAmountInCents(storageMaxUsage: number) {
    return getStorageAddonQuantity(storageMaxUsage) * 10
}

function getTokenAddonQuantity(totalTokens: number) {
    return Math.max(Math.round((totalTokens - INCLUDED_AGENT_TOKENS) / INCLUDED_AGENT_TOKENS), 0)
}

function getOcrAddonQuantity(totalPages: number) {
    return Math.max(Math.round((totalPages - INCLUDED_OCR_PAGES) / INCLUDED_OCR_PAGES), 0)
}

function formatStorageValue(value: number) {
    if (value >= 1_073_741_824) {
        return `${(value / 1_073_741_824).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Go`
    }

    if (value >= 1_048_576) {
        return `${(value / 1_048_576).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} Mo`
    }

    return `${Math.round(value / 1024).toLocaleString("fr-FR")} ko`
}

function formatTokenValue(value: number) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} M`
    }

    if (value >= 1_000) {
        return `${(value / 1_000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k`
    }

    return value.toLocaleString("fr-FR")
}

function ServiceCard(props: {
    title: string
    description: string
    frequency?: string
    billingMode: "recurring" | "one_time"
    details: Array<{ label: string; value: string }>
    action: JSX.Element
}) {
    const isRecurring = props.billingMode === "recurring"

    return (
        <div
            className={css({
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
                padding: "1.25rem",
                borderRadius: "2xl",
                border: isRecurring ? "1px solid rgba(15, 59, 76, 0.12)" : "1px solid rgba(213, 168, 79, 0.2)",
                boxShadow: isRecurring ? "0 8px 24px rgba(15, 23, 42, 0.06)" : "0 12px 28px rgba(181, 129, 28, 0.08)",
            })}
        >
            <div
                className={css({
                    position: "absolute",
                    inset: "0 auto auto 0",
                    width: "100%",
                    height: "0.3rem",
                    background: isRecurring
                        ? "linear-gradient(90deg, #0f3b4c 0%, #6fb8c8 100%)"
                        : "linear-gradient(90deg, #d5a84f 0%, #f3d38a 100%)",
                })}
            />
            <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    })}
                >
                    <span
                        className={css({
                            display: "inline-flex",
                            alignItems: "center",
                            borderRadius: "full",
                            padding: "0.35rem 0.7rem",
                            fontSize: "xs",
                            fontWeight: "700",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: isRecurring ? "#0f3b4c" : "#8a6116",
                            background: isRecurring ? "rgba(15, 59, 76, 0.08)" : "rgba(213, 168, 79, 0.18)",
                        })}
                    >
                        {isRecurring ? "Abonnement" : "Paiement unique"}
                    </span>
                    {props.frequency ? (
                        <span
                            className={css({
                                fontSize: "xs",
                                fontWeight: "600",
                                color: isRecurring ? "neutral/55" : "#9a6c1a",
                            })}
                        >
                            {props.frequency}
                        </span>
                    ) : null}
                </div>
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    })}
                >
                    <span className={css({ fontSize: "lg", fontWeight: "600", color: "neutral" })}>{props.title}</span>
                    <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                        {props.description}
                    </p>
                </div>
            </div>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                {props.details.map((detail) => (
                    <div
                        key={detail.label}
                        className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}
                    >
                        <span className={css({ fontSize: "xs", color: "neutral/50", textTransform: "uppercase" })}>
                            {detail.label}
                        </span>
                        <span
                            className={css({
                                fontSize: "sm",
                                color: "neutral",
                                fontWeight: "600",
                                fontVariantNumeric: "tabular-nums",
                                lineHeight: "1.5",
                            })}
                        >
                            {detail.value}
                        </span>
                    </div>
                ))}
            </div>
            <div className={css({ display: "flex", justifyContent: "flex-end" })}>{props.action}</div>
        </div>
    )
}

export function OrganizationServicesPage() {
    const [refreshKey, setRefreshKey] = useState(0)
    const params = useParams({ from: organizationServicesRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    key={refreshKey}
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{ idOrganization: params.idOrganization }}
                >
                    {(organization) => {
                        const currentSupportAmountInCents = organization.licenceAmount
                        const currentStorageAmountInCents = getRecurringStorageAmountInCents(
                            organization.storageMaxUsage,
                        )
                        const currentStorageQuantity = getStorageAddonQuantity(organization.storageMaxUsage)
                        const currentTokenQuantity = getTokenAddonQuantity(
                            organization.tokensTotalLeft + organization.tokensTotalUsed,
                        )
                        const currentOcrQuantity = getOcrAddonQuantity(
                            organization.ocrPagesTotalLeft + organization.ocrPagesTotalUsed,
                        )
                        const currentStorageLimit = organization.storageMaxUsage
                        const currentTokenLeft = organization.tokensTotalLeft
                        const currentOcrLeft = organization.ocrPagesTotalLeft

                        return (
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.25rem",
                                })}
                            >
                                <OrganizationBillingDisclaimerBanner idOrganization={params.idOrganization} />
                                <ServiceCard
                                    title="Licence Arrhes"
                                    description="Montant mensuel libre pour votre licence Arrhes. Vous pouvez le laisser à 0 € ou définir le montant de votre choix. Votre contribution nous aide à financer le développement d'Arrhes et à maintenir des prix abordables."
                                    frequency="Par mois"
                                    billingMode="recurring"
                                    details={[
                                        {
                                            label: "Montant mensuel",
                                            value: formatEuros(currentSupportAmountInCents),
                                        },
                                    ]}
                                    action={
                                        <UpdateLicenceSubscriptionDrawer
                                            idOrganization={params.idOrganization}
                                            currentAmountInCents={currentSupportAmountInCents}
                                            onSuccess={() => setRefreshKey((key) => key + 1)}
                                        >
                                            <Button>
                                                <ButtonOutlineContent leftIcon={<IconPencil />} text="Modifier" />
                                            </Button>
                                        </UpdateLicenceSubscriptionDrawer>
                                    }
                                />
                                <ServiceCard
                                    title="Stockage"
                                    description="1 Go est inclus gratuitement. Le stockage supplémentaire est facturé mensuellement, sans minimum requis."
                                    frequency="Par mois"
                                    billingMode="recurring"
                                    details={[
                                        { label: "Prix / mois", value: "0,10 € / Go" },
                                        {
                                            label: "Stockage disponible de l'organisation",
                                            value: formatStorageValue(currentStorageLimit),
                                        },
                                        {
                                            label: "Montant actuel",
                                            value: `${formatEuros(currentStorageAmountInCents)} / mois`,
                                        },
                                    ]}
                                    action={
                                        <UpdateStorageSubscriptionDrawer
                                            idOrganization={params.idOrganization}
                                            currentQuantity={currentStorageQuantity}
                                            currentUsageInBytes={organization.storageCurrentUsage}
                                            currentMaxUsageInBytes={organization.storageMaxUsage}
                                            onSuccess={() => setRefreshKey((key) => key + 1)}
                                        >
                                            <Button>
                                                <ButtonOutlineContent leftIcon={<IconPencil />} text="Modifier" />
                                            </Button>
                                        </UpdateStorageSubscriptionDrawer>
                                    }
                                />
                                <ServiceCard
                                    title="Assistant IA"
                                    description="Ajoutez des tokens au-delà du quota de base inclus pour pouvoir continuer d'utiliser l'assistant IA. Chaque million supplémentaire est débité une seule fois depuis le portefeuille."
                                    billingMode="one_time"
                                    details={[
                                        {
                                            label: "Quota restant de l'organisation",
                                            value: `${formatTokenValue(currentTokenLeft)} tokens`,
                                        },
                                        { label: "Prix unitaire", value: "1,00 € / M tokens" },
                                    ]}
                                    action={
                                        <UpdateTokensSubscriptionDrawer
                                            currentQuantity={currentTokenQuantity}
                                            currentTokensLeft={currentTokenLeft}
                                            onSuccess={() => setRefreshKey((key) => key + 1)}
                                        >
                                            <Button>
                                                <ButtonOutlineContent leftIcon={<IconPencil />} text="Modifier" />
                                            </Button>
                                        </UpdateTokensSubscriptionDrawer>
                                    }
                                />
                                <ServiceCard
                                    title="Traitement des documents par OCR"
                                    description="Convertissez plus de documents. Ajoutez des pages au-delà du quota de base inclus. Chaque page supplémentaire ajoutée au quota est débité une seule fois depuis le portefeuille."
                                    billingMode="one_time"
                                    details={[
                                        {
                                            label: "Quota restant de l'organisation",
                                            value: `${currentOcrLeft.toLocaleString("fr-FR")} pages`,
                                        },
                                        { label: "Prix unitaire", value: "0,01 € / page" },
                                    ]}
                                    action={
                                        <UpdateOcrSubscriptionDrawer
                                            currentQuantity={currentOcrQuantity}
                                            currentPagesLeft={currentOcrLeft}
                                            onSuccess={() => setRefreshKey((key) => key + 1)}
                                        >
                                            <Button>
                                                <ButtonOutlineContent leftIcon={<IconPencil />} text="Modifier" />
                                            </Button>
                                        </UpdateOcrSubscriptionDrawer>
                                    }
                                />
                            </div>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
