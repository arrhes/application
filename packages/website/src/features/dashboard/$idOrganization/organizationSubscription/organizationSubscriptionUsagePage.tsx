import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationSubscriptionUsageRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionUsageRoute.tsx"
import { OrganizationBillingDisclaimerBanner } from "./organizationBillingComponents.tsx"
import { UpdateOcrSubscriptionDrawer } from "./updateOcrSubscriptionDrawer.tsx"
import { UpdateStorageSubscriptionDrawer } from "./updateStorageSubscriptionDrawer.tsx"
import { UpdateTokensSubscriptionDrawer } from "./updateTokensSubscriptionDrawer.tsx"

const FREE_STORAGE_BYTES = 1_073_741_824
const INCLUDED_AGENT_TOKENS = 1_000_000
const INCLUDED_OCR_PAGES = 100

function getStorageAddonQuantity(storageMaxUsage: number) {
    return Math.max(Math.round((storageMaxUsage - FREE_STORAGE_BYTES) / FREE_STORAGE_BYTES), 0)
}

function getTokenAddonQuantity(totalTokens: number) {
    return Math.max(Math.round((totalTokens - INCLUDED_AGENT_TOKENS) / INCLUDED_AGENT_TOKENS), 0)
}

function getOcrAddonQuantity(totalPages: number) {
    return Math.max(Math.round((totalPages - INCLUDED_OCR_PAGES) / INCLUDED_OCR_PAGES), 0)
}

function formatStorageValue(value: number) {
    if (value >= 1_073_741_824) return `${(value / 1_073_741_824).toFixed(1)}\u202fGo`
    if (value >= 1_048_576) return `${(value / 1_048_576).toFixed(1)}\u202fMo`
    return `${Math.round(value / 1024)}\u202fko`
}

function formatTokenValue(value: number) {
    if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`
    return String(value)
}

function UsageBar(props: { current: number; limit: number; formatValue: (v: number) => string }) {
    const safeLimit = props.limit <= 0 ? 1 : props.limit
    const percentage = Math.min((props.current / safeLimit) * 100, 100)
    const color = percentage >= 90 ? "danger" : percentage >= 70 ? "warning" : "success"

    return (
        <div
            className={css({
                minWidth: "180px",
                width: "100%",
                maxWidth: "512px",
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

export function OrganizationSubscriptionUsagePage() {
    const [refreshKey, setRefreshKey] = useState(0)
    const params = useParams({ from: organizationSubscriptionUsageRoute.id })

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    key={refreshKey}
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{ idOrganization: params.idOrganization }}
                >
                    {(organization) => (
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            })}
                        >
                            {(() => {
                                const currentStorageQuantity = getStorageAddonQuantity(organization.storageMaxUsage)
                                const currentOcrQuantity = getOcrAddonQuantity(
                                    organization.ocrPagesTotalLeft + organization.ocrPagesTotalUsed,
                                )
                                const currentTokenQuantity = getTokenAddonQuantity(
                                    organization.tokensTotalLeft + organization.tokensTotalUsed,
                                )

                                return (
                                    <>
                                        <OrganizationBillingDisclaimerBanner idOrganization={params.idOrganization} />
                                        <SettingsSection.Root>
                                            <SettingsSection.Header title="Utilisation" />
                                            <SettingsSection.Row
                                                title="Stockage"
                                                description="Espace de stockage utilisé."
                                            >
                                                <div
                                                    className={css({
                                                        width: "100%",
                                                        maxWidth: "512px",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "flex-end",
                                                        gap: "0.75rem",
                                                    })}
                                                >
                                                    <UsageBar
                                                        current={organization.storageCurrentUsage}
                                                        limit={organization.storageMaxUsage}
                                                        formatValue={formatStorageValue}
                                                    />
                                                    <UpdateStorageSubscriptionDrawer
                                                        idOrganization={params.idOrganization}
                                                        currentQuantity={currentStorageQuantity}
                                                        currentUsageInBytes={organization.storageCurrentUsage}
                                                        currentMaxUsageInBytes={organization.storageMaxUsage}
                                                        onSuccess={() => setRefreshKey((key) => key + 1)}
                                                    >
                                                        <Button>
                                                            <ButtonOutlineContent leftIcon={<IconPlus />} />
                                                        </Button>
                                                    </UpdateStorageSubscriptionDrawer>
                                                </div>
                                            </SettingsSection.Row>
                                            <SettingsSection.Row
                                                title="Pages OCR"
                                                description="Pages OCR consommées sur le solde actuellement disponible."
                                            >
                                                <div
                                                    className={css({
                                                        width: "100%",
                                                        maxWidth: "512px",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "flex-end",
                                                        gap: "0.75rem",
                                                    })}
                                                >
                                                    <UsageBar
                                                        current={organization.ocrPagesTotalUsed}
                                                        limit={
                                                            organization.ocrPagesTotalLeft +
                                                            organization.ocrPagesTotalUsed
                                                        }
                                                        formatValue={(value) => value.toLocaleString("fr-FR")}
                                                    />
                                                    <UpdateOcrSubscriptionDrawer
                                                        currentQuantity={currentOcrQuantity}
                                                        currentPagesLeft={organization.ocrPagesTotalLeft}
                                                        onSuccess={() => setRefreshKey((key) => key + 1)}
                                                    >
                                                        <Button>
                                                            <ButtonOutlineContent leftIcon={<IconPlus />} />
                                                        </Button>
                                                    </UpdateOcrSubscriptionDrawer>
                                                </div>
                                            </SettingsSection.Row>
                                            <SettingsSection.Row
                                                title="Tokens IA"
                                                description="Tokens consommés sur le solde actuellement disponible."
                                            >
                                                <div
                                                    className={css({
                                                        width: "100%",
                                                        maxWidth: "512px",
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        alignItems: "flex-end",
                                                        gap: "0.75rem",
                                                    })}
                                                >
                                                    <UsageBar
                                                        current={organization.tokensTotalUsed}
                                                        limit={
                                                            organization.tokensTotalLeft + organization.tokensTotalUsed
                                                        }
                                                        formatValue={formatTokenValue}
                                                    />
                                                    <UpdateTokensSubscriptionDrawer
                                                        currentQuantity={currentTokenQuantity}
                                                        currentTokensLeft={organization.tokensTotalLeft}
                                                        onSuccess={() => setRefreshKey((key) => key + 1)}
                                                    >
                                                        <Button>
                                                            <ButtonOutlineContent leftIcon={<IconPlus />} />
                                                        </Button>
                                                    </UpdateTokensSubscriptionDrawer>
                                                </div>
                                            </SettingsSection.Row>
                                        </SettingsSection.Root>
                                    </>
                                )
                            })()}
                        </div>
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
