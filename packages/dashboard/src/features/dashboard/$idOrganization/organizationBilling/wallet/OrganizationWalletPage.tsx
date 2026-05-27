import { readOneOrganizationRouteDefinition } from "@arrhes/application-metadata/routes"
import { FREE_STORAGE_BYTES, STORAGE_PRICE_PER_GB_IN_CENTS } from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertTriangle, IconCashMinus, IconPigMoney, IconPlus, IconWallet } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DataWrapper } from "../../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../../components/layouts/settingsSection/settingsSection.tsx"
import { useTabs } from "../../../../../contexts/tabs/useTabs.js"
import { formatEuros } from "../../../../../utilities/formatEuros.tsx"
import { OrganizationBillingDisclaimerBanner } from "./OrganizationBillingDisclaimerBanner.tsx"
import { WalletCurrentMonth } from "./WalletCurrentMonth.tsx"

function getRecurringStorageAmountInCents(storageLimit: number) {
    return (
        Math.max(Math.round((storageLimit - FREE_STORAGE_BYTES) / FREE_STORAGE_BYTES), 0) *
        STORAGE_PRICE_PER_GB_IN_CENTS
    )
}

function getNextMonthSubscriptionAmountInCents(organization: { licenceAmount: number; storageLimit: number }) {
    return organization.licenceAmount + getRecurringStorageAmountInCents(organization.storageLimit)
}

export function OrganizationWalletPage({ idOrganization: idOrganizationProp }: { idOrganization?: string } = {}) {
    const { openTab } = useTabs()
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization,
                    }}
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
                                        <OrganizationBillingDisclaimerBanner idOrganization={idOrganization} />
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
                                                <Button
                                                    onClick={() =>
                                                        openTab({
                                                            component: "facturation-recharge",
                                                            props: {
                                                                idOrganization,
                                                            },
                                                        })
                                                    }
                                                >
                                                    <ButtonOutlineContent
                                                        leftIcon={<IconPlus />}
                                                        text="Recharger maintenant"
                                                    />
                                                </Button>
                                            </div>
                                        ) : null}
                                        <SettingsSection.Root>
                                            <SettingsSection.Header
                                                title="Portefeuille"
                                                description="Montant actuellement disponible dans votre portefeuille."
                                            />
                                            <div
                                                className={css({
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    gap: "1rem",
                                                })}
                                            >
                                                <div
                                                    className={css({
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "flex-end",
                                                        alignItems: "center",
                                                        gap: "0.5rem",
                                                    })}
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            openTab({
                                                                component: "facturation-recharge",
                                                                props: {
                                                                    idOrganization,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        <ButtonOutlineContent
                                                            leftIcon={<IconPigMoney />}
                                                            text="Recharger le portefeuille"
                                                        />
                                                    </Button>
                                                    <Button
                                                        isDisabled={organization.walletBalanceInCents <= 0}
                                                        onClick={() =>
                                                            openTab({
                                                                component: "facturation-retrait",
                                                                props: {
                                                                    idOrganization,
                                                                },
                                                            })
                                                        }
                                                    >
                                                        <ButtonOutlineContent
                                                            leftIcon={<IconCashMinus />}
                                                            text="Retirer"
                                                        />
                                                    </Button>
                                                </div>
                                                <div className={css({})}>
                                                    <div
                                                        className={css({
                                                            borderRadius: "3xl",
                                                            padding: {
                                                                base: "1.25rem",
                                                                md: "1.5rem",
                                                            },
                                                            background:
                                                                "radial-gradient(circle at top right, rgba(111, 184, 200, 0.2), transparent 28%), linear-gradient(180deg, #06111b 0%, #0d1726 48%, #111c2d 100%)",
                                                            color: "white",
                                                            border: "1px solid rgba(148, 163, 184, 0.28)",
                                                            // boxShadow: "0 24px 50px rgba(2, 6, 23, 0.38)",
                                                        })}
                                                    >
                                                        <div
                                                            className={css({
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                gap: "0.5rem",
                                                            })}
                                                        >
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
                                                                <IconWallet
                                                                    size={15}
                                                                    className={css({
                                                                        stroke: "white",
                                                                    })}
                                                                />
                                                                Montant disponible
                                                            </span>
                                                            <span
                                                                className={css({
                                                                    fontSize: {
                                                                        base: "3xl",
                                                                        md: "4xl",
                                                                    },
                                                                    lineHeight: "1",
                                                                    fontWeight: "700",
                                                                    fontVariantNumeric: "tabular-nums",
                                                                    letterSpacing: "-0.03em",
                                                                    textShadow: "0 6px 18px rgba(0, 0, 0, 0.24)",
                                                                    color: "white",
                                                                })}
                                                            >
                                                                {formatEuros(organization.walletBalanceInCents)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SettingsSection.Root>
                                        <SettingsSection.Root>
                                            <SettingsSection.Header
                                                title="Mois en cours"
                                                description="Récapitulatif des paiements comptabilisés sur le mois en cours."
                                            />
                                            <WalletCurrentMonth organization={organization} />
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
