import {
    readAllOrganizationPaymentsRouteDefinition,
    readOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertTriangle, IconMinus, IconPlus, IconWallet } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { organizationSubscriptionRoute } from "../../../../routes/root/dashboard/organizations/$idOrganization/organizationSubscription/organizationSubscriptionRoute.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import {
    OrganizationBillingDisclaimerBanner,
    WalletTopUpDrawer,
    WalletWithdrawalDrawer,
} from "./organizationBillingComponents.tsx"

const FREE_STORAGE_BYTES = 1_073_741_824

function getRecurringStorageAmountInCents(storageMaxUsage: number) {
    return Math.max(Math.round((storageMaxUsage - FREE_STORAGE_BYTES) / FREE_STORAGE_BYTES), 0) * 10
}

function getNextMonthSubscriptionAmountInCents(organization: { licenceAmount: number; storageMaxUsage: number }) {
    return organization.licenceAmount + getRecurringStorageAmountInCents(organization.storageMaxUsage)
}

function isCurrentMonthPayment(payment: { periodStart: string | null; createdAt: string }) {
    const date = payment.periodStart ? new Date(payment.periodStart) : new Date(payment.createdAt)
    const now = new Date()

    return date.getUTCFullYear() === now.getUTCFullYear() && date.getUTCMonth() === now.getUTCMonth()
}

function hasCurrentMonthWithdrawal(payments: Array<{ category: string; createdAt: string; status: string }>) {
    const now = new Date()

    return payments.some((payment) => {
        if (payment.category !== "withdrawal" || payment.status === "failed") {
            return false
        }

        const createdAt = new Date(payment.createdAt)
        return createdAt.getUTCFullYear() === now.getUTCFullYear() && createdAt.getUTCMonth() === now.getUTCMonth()
    })
}

function getPaymentLineType(payment: {
    category: string
    serviceType: string | null
    sequenceType: string | null
}): "subscription" | "storage_gb" | "agent_tokens_million" | "ocr_pages_hundred" | null {
    if (
        payment.category === "top_up" ||
        payment.category === "withdrawal" ||
        payment.category === "setup" ||
        payment.sequenceType === "setup"
    ) {
        return null
    }

    if (payment.serviceType === "storage_gb") {
        return "storage_gb"
    }

    if (payment.serviceType === "agent_tokens_million") {
        return "agent_tokens_million"
    }

    if (payment.serviceType === "ocr_pages_hundred") {
        return "ocr_pages_hundred"
    }

    return "subscription"
}

function WalletBalanceCard(props: { balanceInCents: number; hasWithdrawalThisMonth: boolean; onRefresh: () => void }) {
    return (
        <div
            className={css({
                borderRadius: "3xl",
                padding: { base: "1.25rem", md: "1.5rem" },
                background:
                    "radial-gradient(circle at top right, rgba(111, 184, 200, 0.2), transparent 28%), linear-gradient(180deg, #06111b 0%, #0d1726 48%, #111c2d 100%)",
                color: "white",
                border: "1px solid rgba(148, 163, 184, 0.28)",
                boxShadow: "0 24px 50px rgba(2, 6, 23, 0.38)",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "1rem",
                        flexWrap: "wrap",
                    })}
                >
                    <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                        <span
                            className={css({
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "xs",
                                fontWeight: "600",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: "rgba(226, 232, 240, 0.98)",
                            })}
                        >
                            <IconWallet size={15} />
                            Portefeuille disponible
                        </span>
                        <span
                            className={css({
                                fontSize: { base: "3xl", md: "4xl" },
                                lineHeight: "1",
                                fontWeight: "700",
                                fontVariantNumeric: "tabular-nums",
                                letterSpacing: "-0.03em",
                                textShadow: "0 6px 18px rgba(0, 0, 0, 0.24)",
                                color: "white",
                            })}
                        >
                            {formatEuros(props.balanceInCents)}
                        </span>
                        <p
                            className={css({
                                maxWidth: "32rem",
                                fontSize: "sm",
                                lineHeight: "1.6",
                                color: "rgba(241, 245, 249, 0.98)",
                            })}
                        >
                            Utilisez ce solde pour les différents services.
                        </p>
                    </div>
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                        })}
                    >
                        <span
                            className={css({
                                borderRadius: "full",
                                padding: "0.375rem 0.75rem",
                                background: "rgba(15, 59, 76, 0.42)",
                                border: "1px solid rgba(111, 184, 200, 0.34)",
                                fontSize: "xs",
                                color: "rgba(248, 250, 252, 1)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                            })}
                        >
                            Disponible immédiatement
                        </span>
                        <span
                            className={css({
                                borderRadius: "full",
                                padding: "0.375rem 0.75rem",
                                background: "rgba(148, 163, 184, 0.16)",
                                border: "1px solid rgba(226, 232, 240, 0.22)",
                                fontSize: "xs",
                                color: "rgba(248, 250, 252, 1)",
                                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                            })}
                        >
                            Prélevé au début du mois
                        </span>
                    </div>
                </div>
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                    })}
                >
                    <WalletTopUpDrawer onSuccess={props.onRefresh}>
                        <Button>
                            <ButtonOutlineContent leftIcon={<IconPlus />} text="Recharger" />
                        </Button>
                    </WalletTopUpDrawer>
                    <WalletWithdrawalDrawer
                        currentBalanceInCents={props.balanceInCents}
                        hasWithdrawalThisMonth={props.hasWithdrawalThisMonth}
                        onSuccess={props.onRefresh}
                    >
                        <Button isDisabled={props.balanceInCents <= 0}>
                            <ButtonOutlineContent leftIcon={<IconMinus />} text="Retirer" />
                        </Button>
                    </WalletWithdrawalDrawer>
                </div>
                {props.hasWithdrawalThisMonth ? (
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.6rem",
                            padding: "0.85rem 0.95rem",
                            borderRadius: "lg",
                            background: "rgba(245, 158, 11, 0.14)",
                            border: "1px solid rgba(245, 158, 11, 0.28)",
                            color: "rgba(255, 251, 235, 0.96)",
                        })}
                    >
                        <IconAlertTriangle size={16} className={css({ flexShrink: 0, marginTop: "0.1rem" })} />
                        <span className={css({ fontSize: "sm", lineHeight: "1.5" })}>
                            Le retrait mensuel a déjà été utilisé. Un nouveau retrait sera possible au début du mois
                            prochain.
                        </span>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export function OrganizationWalletPage() {
    const [refreshKey, setRefreshKey] = useState(0)
    const params = useParams({ from: organizationSubscriptionRoute.id })

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
                                const nextMonthSubscriptionAmountInCents =
                                    getNextMonthSubscriptionAmountInCents(organization)
                                const isWalletShortForNextMonth =
                                    nextMonthSubscriptionAmountInCents > 0 &&
                                    organization.walletBalanceInCents < nextMonthSubscriptionAmountInCents

                                return (
                                    <>
                                        <OrganizationBillingDisclaimerBanner idOrganization={params.idOrganization} />
                                        {isWalletShortForNextMonth ? (
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    gap: "1rem",
                                                    flexWrap: "wrap",
                                                    padding: "1rem 1.1rem",
                                                    borderRadius: "xl",
                                                    border: "1px solid token(colors.warning/30)",
                                                    background:
                                                        "linear-gradient(180deg, rgba(245, 158, 11, 0.12) 0%, rgba(255, 251, 235, 0.92) 100%)",
                                                })}
                                            >
                                                <div
                                                    className={css({
                                                        display: "flex",
                                                        alignItems: "flex-start",
                                                        gap: "0.75rem",
                                                    })}
                                                >
                                                    <IconAlertTriangle
                                                        className={css({
                                                            color: "warning",
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
                                                            Solde insuffisant pour le prochain prélèvement mensuel
                                                        </span>
                                                        <span
                                                            className={css({
                                                                fontSize: "sm",
                                                                color: "neutral/70",
                                                                lineHeight: "1.5",
                                                            })}
                                                        >
                                                            {formatEuros(organization.walletBalanceInCents)} disponibles
                                                            pour {formatEuros(nextMonthSubscriptionAmountInCents)}{" "}
                                                            requis au début du mois prochain.
                                                        </span>
                                                    </div>
                                                </div>
                                                <WalletTopUpDrawer onSuccess={() => setRefreshKey((key) => key + 1)}>
                                                    <Button>
                                                        <ButtonOutlineContent
                                                            leftIcon={<IconPlus />}
                                                            text="Recharger maintenant"
                                                        />
                                                    </Button>
                                                </WalletTopUpDrawer>
                                            </div>
                                        ) : null}
                                        <SettingsSection.Root>
                                            <SettingsSection.Header
                                                title="Portefeuille"
                                                description="Rechargez un solde utilisable immédiatement pour les achats ponctuels et les avances sur services."
                                            />
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    justifyContent: "flex-end",
                                                    padding: "0.75rem 1rem 0",
                                                })}
                                            >
                                                <WalletTopUpDrawer onSuccess={() => setRefreshKey((key) => key + 1)}>
                                                    <Button>
                                                        <ButtonOutlineContent
                                                            leftIcon={<IconPlus />}
                                                            text="Recharger le portefeuille"
                                                        />
                                                    </Button>
                                                </WalletTopUpDrawer>
                                            </div>
                                            <div className={css({ padding: "0.75rem 1rem 1rem" })}>
                                                <DataWrapper
                                                    routeDefinition={readAllOrganizationPaymentsRouteDefinition}
                                                    body={{}}
                                                >
                                                    {(payments) => (
                                                        <WalletBalanceCard
                                                            balanceInCents={organization.walletBalanceInCents}
                                                            hasWithdrawalThisMonth={hasCurrentMonthWithdrawal(payments)}
                                                            onRefresh={() => setRefreshKey((key) => key + 1)}
                                                        />
                                                    )}
                                                </DataWrapper>
                                            </div>
                                        </SettingsSection.Root>
                                        <SettingsSection.Root>
                                            <SettingsSection.Header
                                                title="Mois en cours"
                                                description="Recapitulatif des paiements comptabilisés sur le mois en cours."
                                            />
                                            <DataWrapper
                                                routeDefinition={readAllOrganizationPaymentsRouteDefinition}
                                                body={{}}
                                            >
                                                {(payments) => {
                                                    const currentMonthPayments = payments.filter(
                                                        (payment) =>
                                                            payment.status !== "failed" &&
                                                            payment.status !== "refunded" &&
                                                            isCurrentMonthPayment(payment),
                                                    )

                                                    const lineItems = [
                                                        { type: "subscription", label: "Abonnement", unit: null },
                                                        { type: "storage_gb", label: "Stockage", unit: "1 Go / mois" },
                                                        {
                                                            type: "agent_tokens_million",
                                                            label: "Tokens Assistant IA",
                                                            unit: "1 million de tokens",
                                                        },
                                                        {
                                                            type: "ocr_pages_hundred",
                                                            label: "Traitement de pages par OCR",
                                                            unit: "100 pages",
                                                        },
                                                    ] as const

                                                    const totalsByType = currentMonthPayments.reduce<
                                                        Record<string, { amount: number; quantity: number }>
                                                    >((acc, payment) => {
                                                        const lineType = getPaymentLineType(payment)

                                                        if (lineType === null) return acc
                                                        if (!acc[lineType]) acc[lineType] = { amount: 0, quantity: 0 }

                                                        acc[lineType].amount += payment.amountInCents
                                                        acc[lineType].quantity += 1

                                                        return acc
                                                    }, {})

                                                    const totalAmount = currentMonthPayments.reduce(
                                                        (sum, payment) =>
                                                            getPaymentLineType(payment) === null
                                                                ? sum
                                                                : sum + payment.amountInCents,
                                                        0,
                                                    )

                                                    return (
                                                        <div
                                                            className={css({
                                                                width: "100%",
                                                                padding: "0.5rem 1rem 0.75rem",
                                                            })}
                                                        >
                                                            <div
                                                                className={css({
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                })}
                                                            >
                                                                <div
                                                                    className={css({
                                                                        display: "grid",
                                                                        gridTemplateColumns:
                                                                            "minmax(0, 2fr) minmax(0, 1.5fr) minmax(88px, 0.8fr) minmax(100px, 1fr)",
                                                                        gap: "0.75rem",
                                                                        padding: "0 0 0.5rem",
                                                                        borderBottom:
                                                                            "1px solid token(colors.neutral/10)",
                                                                        marginBottom: "0.125rem",
                                                                    })}
                                                                >
                                                                    <span
                                                                        className={css({
                                                                            fontSize: "xs",
                                                                            fontWeight: "600",
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.04em",
                                                                            color: "neutral/50",
                                                                        })}
                                                                    >
                                                                        Service
                                                                    </span>
                                                                    <span
                                                                        className={css({
                                                                            fontSize: "xs",
                                                                            fontWeight: "600",
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.04em",
                                                                            color: "neutral/50",
                                                                        })}
                                                                    >
                                                                        Unité
                                                                    </span>
                                                                    <span
                                                                        className={css({
                                                                            fontSize: "xs",
                                                                            fontWeight: "600",
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.04em",
                                                                            color: "neutral/50",
                                                                            textAlign: "right",
                                                                        })}
                                                                    >
                                                                        Quantité
                                                                    </span>
                                                                    <span
                                                                        className={css({
                                                                            fontSize: "xs",
                                                                            fontWeight: "600",
                                                                            textTransform: "uppercase",
                                                                            letterSpacing: "0.04em",
                                                                            color: "neutral/50",
                                                                            textAlign: "right",
                                                                        })}
                                                                    >
                                                                        Montant
                                                                    </span>
                                                                </div>
                                                                {lineItems.map((line, index) => {
                                                                    const data = totalsByType[line.type] ?? {
                                                                        amount: 0,
                                                                        quantity: 0,
                                                                    }

                                                                    return (
                                                                        <div
                                                                            key={line.type}
                                                                            className={css({
                                                                                display: "grid",
                                                                                gridTemplateColumns:
                                                                                    "minmax(0, 2fr) minmax(0, 1.5fr) minmax(88px, 0.8fr) minmax(100px, 1fr)",
                                                                                gap: "0.75rem",
                                                                                alignItems: "center",
                                                                                padding: "0.625rem 0",
                                                                                borderBottom:
                                                                                    index < lineItems.length - 1
                                                                                        ? "1px solid token(colors.neutral/10)"
                                                                                        : "none",
                                                                            })}
                                                                        >
                                                                            <span
                                                                                className={css({
                                                                                    fontSize: "sm",
                                                                                    fontWeight: "500",
                                                                                    color: "neutral",
                                                                                })}
                                                                            >
                                                                                {line.label}
                                                                            </span>
                                                                            <span
                                                                                className={css({
                                                                                    fontSize: "xs",
                                                                                    color: "neutral/60",
                                                                                })}
                                                                            >
                                                                                {line.unit ?? "-"}
                                                                            </span>
                                                                            <span
                                                                                className={css({
                                                                                    fontSize: "sm",
                                                                                    color:
                                                                                        data.quantity === 0
                                                                                            ? "neutral/40"
                                                                                            : "neutral/70",
                                                                                    textAlign: "right",
                                                                                    fontVariantNumeric: "tabular-nums",
                                                                                })}
                                                                            >
                                                                                {data.quantity === 0
                                                                                    ? "-"
                                                                                    : data.quantity}
                                                                            </span>
                                                                            <span
                                                                                className={css({
                                                                                    fontSize: "sm",
                                                                                    color:
                                                                                        data.amount === 0
                                                                                            ? "neutral/40"
                                                                                            : "neutral",
                                                                                    fontVariantNumeric: "tabular-nums",
                                                                                    textAlign: "right",
                                                                                })}
                                                                            >
                                                                                {formatEuros(data.amount)}
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                })}
                                                                <div
                                                                    className={css({
                                                                        display: "grid",
                                                                        gridTemplateColumns:
                                                                            "minmax(0, 2fr) minmax(0, 1.5fr) minmax(88px, 0.8fr) minmax(100px, 1fr)",
                                                                        gap: "0.75rem",
                                                                        alignItems: "center",
                                                                        padding: "0.75rem 0 0.125rem",
                                                                        borderTop: "2px solid token(colors.neutral/20)",
                                                                        marginTop: "0.25rem",
                                                                    })}
                                                                >
                                                                    <span
                                                                        className={css({
                                                                            fontWeight: "600",
                                                                            fontSize: "sm",
                                                                        })}
                                                                    >
                                                                        Total
                                                                    </span>
                                                                    <span />
                                                                    <span />
                                                                    <span
                                                                        className={css({
                                                                            fontWeight: "600",
                                                                            fontSize: "sm",
                                                                            fontVariantNumeric: "tabular-nums",
                                                                            textAlign: "right",
                                                                        })}
                                                                    >
                                                                        {formatEuros(totalAmount)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }}
                                            </DataWrapper>
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
