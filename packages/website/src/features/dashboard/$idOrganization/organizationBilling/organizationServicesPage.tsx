import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import {
    FREE_STORAGE_BYTES,
    INCLUDED_AGENT_TOKENS,
    INCLUDED_OCR_PAGES,
    STORAGE_PRICE_PER_GB_IN_CENTS,
    VAT_PERCENT,
} from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertTriangle, IconPencil } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { type JSX, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { organizationServicesRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationBilling/organizationBillingsRoute.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { UpdateLicenceSubscriptionDrawer } from "./updateLicenceSubscriptionDrawer.tsx"
import { UpdateOcrSubscriptionDrawer } from "./updateOcrSubscriptionDrawer.tsx"
import { UpdateStorageSubscriptionDrawer } from "./updateStorageSubscriptionDrawer.tsx"
import { UpdateTokensSubscriptionDrawer } from "./updateTokensSubscriptionDrawer.tsx"
import { OrganizationBillingDisclaimerBanner } from "./wallet/OrganizationBillingDisclaimerBanner.tsx"

function getStorageAddonQuantity(storageLimit: number) {
    return Math.max(Math.round((storageLimit - FREE_STORAGE_BYTES) / FREE_STORAGE_BYTES), 0)
}

function getRecurringStorageAmountInCents(storageLimit: number) {
    return getStorageAddonQuantity(storageLimit) * STORAGE_PRICE_PER_GB_IN_CENTS
}

function getTokenAddonQuantity(totalTokens: number) {
    return Math.max(Math.round((totalTokens - INCLUDED_AGENT_TOKENS) / INCLUDED_AGENT_TOKENS), 0)
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

function UsageBar(props: { current: number; limit: number; formatValue: (v: number) => string }) {
    const safeLimit = props.limit <= 0 ? 1 : props.limit
    const percentage = Math.min((props.current / safeLimit) * 100, 100)
    const color = percentage >= 90 ? "danger" : percentage >= 70 ? "warning" : "success"

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "xs",
                    color: "neutral/70",
                })}
            >
                <span>
                    {props.formatValue(props.current)} / {props.formatValue(props.limit)}
                </span>
                <span>{percentage.toFixed(0)}%</span>
            </div>
            <div
                className={css({
                    width: "100%",
                    height: "0.5rem",
                    borderRadius: "full",
                    backgroundColor: "neutral/10",
                    overflow: "hidden",
                })}
            >
                <div
                    className={css({ height: "100%", borderRadius: "full", transition: "width 0.3s ease" })}
                    style={{ width: `${percentage}%`, backgroundColor: `var(--colors-${color})` }}
                />
            </div>
        </div>
    )
}

function ServiceCard(props: {
    title: string
    description: string
    frequency?: string
    billingMode: "recurring" | "one_time"
    details: Array<{ label: string; value: string }>
    usage?: JSX.Element
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
                // boxShadow: isRecurring ? "0 8px 24px rgba(15, 23, 42, 0.06)" : "0 12px 28px rgba(181, 129, 28, 0.08)",
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
            {props.usage ? <div className={css({ width: "100%" })}>{props.usage}</div> : null}
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
                            organization.storageLimit,
                        )
                        const currentStorageQuantity = getStorageAddonQuantity(organization.storageLimit)
                        const currentTokenQuantity = getTokenAddonQuantity(
                            organization.tokensTotalAvailable + organization.tokensTotalUsed,
                        )
                        const currentOcrAddonPages = Math.max(
                            organization.ocrPagesTotalAvailable + organization.ocrPagesTotalUsed - INCLUDED_OCR_PAGES,
                            0,
                        )
                        const nextMonthSubscriptionAmountInCents =
                            currentSupportAmountInCents + currentStorageAmountInCents
                        const isWalletInsufficient =
                            nextMonthSubscriptionAmountInCents > 0 &&
                            organization.walletBalanceInCents < nextMonthSubscriptionAmountInCents

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
                                {isWalletInsufficient ? (
                                    <div
                                        className={css({
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: "0.75rem",
                                            padding: "1rem",
                                            borderRadius: "xl",
                                            border: "1px solid token(colors.error/25)",
                                            background: "error/5",
                                        })}
                                    >
                                        <IconAlertTriangle
                                            className={css({
                                                color: "error",
                                                flexShrink: 0,
                                                marginTop: "0.125rem",
                                            })}
                                        />
                                        <div
                                            className={css({
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.25rem",
                                            })}
                                        >
                                            <span
                                                className={css({
                                                    fontSize: "sm",
                                                    fontWeight: "600",
                                                    color: "neutral",
                                                })}
                                            >
                                                Solde insuffisant pour le prochain mois
                                            </span>
                                            <span
                                                className={css({
                                                    fontSize: "sm",
                                                    color: "neutral/70",
                                                    lineHeight: "1.5",
                                                })}
                                            >
                                                Vos abonnements récurrents s'élèvent à{" "}
                                                {formatEuros(nextMonthSubscriptionAmountInCents)} HT/mois (TVA{" "}
                                                {VAT_PERCENT}%), mais votre portefeuille ne contient que{" "}
                                                {formatEuros(organization.walletBalanceInCents)}. Rechargez votre
                                                portefeuille pour éviter une interruption de service le 1er du mois.
                                            </span>
                                        </div>
                                    </div>
                                ) : null}
                                <ServiceCard
                                    title="Licence Arrhes"
                                    description={`Montant mensuel libre pour votre licence Arrhes. Vous pouvez le laisser à 0 EUR HT ou définir le montant de votre choix. Votre contribution nous aide à financer le développement d'Arrhes et à maintenir des prix abordables. TVA ${VAT_PERCENT}% appliquée.`}
                                    frequency="Par mois"
                                    billingMode="recurring"
                                    details={[
                                        {
                                            label: "Montant mensuel",
                                            value: `${formatEuros(currentSupportAmountInCents)} HT`,
                                        },
                                        ...(organization.licenceAmountPending !== null
                                            ? [
                                                  {
                                                      label: "En attente le 1er",
                                                      value: `${formatEuros(organization.licenceAmountPending)} HT`,
                                                  },
                                              ]
                                            : []),
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
                                    description={`1 Go est inclus gratuitement. Le stockage supplémentaire est facturé mensuellement en HT, sans minimum requis (TVA ${VAT_PERCENT}%).`}
                                    frequency="Par mois"
                                    billingMode="recurring"
                                    details={[
                                        { label: "Prix / mois", value: `0,10 EUR HT / Go (TVA ${VAT_PERCENT}%)` },
                                        {
                                            label: "Montant actuel",
                                            value: `${formatEuros(currentStorageAmountInCents)} HT / mois`,
                                        },
                                        ...(organization.storageLimitPending !== null
                                            ? [
                                                  {
                                                      label: "En attente le 1er",
                                                      value: `${formatStorageValue(organization.storageLimitPending)} / mois`,
                                                  },
                                              ]
                                            : []),
                                    ]}
                                    usage={
                                        <UsageBar
                                            current={organization.storageCurrentUsage}
                                            limit={organization.storageLimit}
                                            formatValue={formatStorageValue}
                                        />
                                    }
                                    action={
                                        <UpdateStorageSubscriptionDrawer
                                            idOrganization={params.idOrganization}
                                            currentQuantity={currentStorageQuantity}
                                            currentUsageInBytes={organization.storageCurrentUsage}
                                            currentMaxUsageInBytes={organization.storageLimit}
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
                                    description={`Ajoutez des tokens au-delà du quota de base inclus pour continuer d'utiliser l'assistant IA. Chaque million supplémentaire est débité une seule fois depuis le portefeuille en HT (TVA ${VAT_PERCENT}%).`}
                                    billingMode="one_time"
                                    details={[
                                        {
                                            label: "Restants",
                                            value: `${formatTokenValue(organization.tokensTotalAvailable)} tokens`,
                                        },
                                        {
                                            label: "Prix unitaire",
                                            value: `1,00 EUR HT / M tokens (TVA ${VAT_PERCENT}%)`,
                                        },
                                    ]}
                                    action={
                                        <UpdateTokensSubscriptionDrawer
                                            currentQuantity={currentTokenQuantity}
                                            currentTokensLeft={organization.tokensTotalAvailable}
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
                                    description={`Convertissez plus de documents. Ajoutez des pages au-delà du quota de base inclus. Chaque page supplémentaire ajoutée au quota est débitée une seule fois depuis le portefeuille en HT (TVA ${VAT_PERCENT}%).`}
                                    billingMode="one_time"
                                    details={[
                                        {
                                            label: "Restantes",
                                            value: `${organization.ocrPagesTotalAvailable.toLocaleString("fr-FR")} pages`,
                                        },
                                        { label: "Prix unitaire", value: `0,01 EUR HT / page (TVA ${VAT_PERCENT}%)` },
                                    ]}
                                    action={
                                        <UpdateOcrSubscriptionDrawer
                                            currentQuantity={currentOcrAddonPages}
                                            currentPagesLeft={organization.ocrPagesTotalAvailable}
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
