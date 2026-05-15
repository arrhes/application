import {
    readOneOrganizationRouteDefinition,
    updateTokensSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import {
    getAmountTTCFromHTInCents,
    INCLUDED_AGENT_TOKENS,
    TOKEN_PACK_PRICE_IN_CENTS,
    TOKEN_TIERS,
    TOKENS_PER_PACK,
    VAT_PERCENT,
} from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent, InputNumber, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { type ReactNode, useEffect, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { ConfirmationModal } from "../../../../components/overlays/dialog/ConfirmationModal.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

function formatTokenValue(value: number) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toLocaleString("fr-FR", {
            maximumFractionDigits: 1,
        })} M`
    }

    if (value >= 1_000) {
        return `${(value / 1_000).toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
        })} k`
    }

    return value.toLocaleString("fr-FR")
}

function formatTokenUnitDelta(quantityDelta: number) {
    if (quantityDelta === 0) {
        return "Aucun ajout"
    }

    return `${quantityDelta} M tokens`
}

function FormSection(props: { title: string; description?: string; children: ReactNode }) {
    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                })}
            >
                <h3
                    className={css({
                        fontSize: "sm",
                        fontWeight: "700",
                        color: "neutral",
                    })}
                >
                    {props.title}
                </h3>
                {props.description ? (
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                            lineHeight: "1.5",
                        })}
                    >
                        {props.description}
                    </p>
                ) : null}
            </div>
            {props.children}
        </section>
    )
}

function UpdateTokensForm(props: { idOrganization: string; currentQuantity: number; currentTokensLeft: number }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [quantityDelta, setQuantityDelta] = useState(0)
    const nextQuantity = props.currentQuantity + quantityDelta
    const deltaAmountInCents = quantityDelta * TOKEN_PACK_PRICE_IN_CENTS
    const deltaAmountTTCInCents = getAmountTTCFromHTInCents(deltaAmountInCents)
    const addedTokens = quantityDelta * TOKENS_PER_PACK
    const nextTokensLeft = props.currentTokensLeft + addedTokens

    useEffect(() => {
        setQuantityDelta(0)
    }, [])

    async function handleSave() {
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateTokensSubscriptionRouteDefinition,
            body: {
                newQuantity: nextQuantity,
            },
        })

        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Erreur lors de la mise à jour",
                variant: "error",
            })
            return
        }

        toast({
            title: "Tokens IA mis à jour",
            variant: "success",
        })

        await invalidateData({
            routeDefinition: readOneOrganizationRouteDefinition,
            body: {
                idOrganization: props.idOrganization,
            },
        })
    }

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                maxWidth: "600px",
            })}
        >
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/70",
                    lineHeight: "1.5",
                })}
            >
                Chaque million de tokens supplémentaire est débité une seule fois depuis le portefeuille. Les tokens
                achetés restent disponibles tant qu'ils n'ont pas été consommés. Montants en HT (TVA {VAT_PERCENT}%).
            </p>
            <FormSection
                title="Ajouter des tokens"
                description="Sélectionnez uniquement les tokens supplémentaires à ajouter. Le compteur repart de zéro à chaque ouverture."
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    <InputNumber
                        value={quantityDelta}
                        onChange={setQuantityDelta}
                        min={0}
                        label="M tokens"
                    />
                    <div
                        className={css({
                            display: "flex",
                            gap: "0.25rem",
                            flexWrap: "wrap",
                        })}
                    >
                        {TOKEN_TIERS.map((tier) => (
                            <button
                                key={tier}
                                type="button"
                                onClick={() => setQuantityDelta(tier)}
                                className={css({
                                    padding: "0.375rem 0.875rem",
                                    border: "1px solid",
                                    borderRadius: "md",
                                    cursor: "pointer",
                                    fontSize: "sm",
                                    fontWeight: "400",
                                    color: "neutral",
                                    borderColor: "neutral/20",
                                    _hover: {
                                        background: "neutral/5",
                                    },
                                })}
                            >
                                {tier === 0 ? "0" : `${tier.toLocaleString("fr-FR")} M`}
                            </button>
                        ))}
                    </div>
                </div>
            </FormSection>
            <FormSection
                title="Récapitulatif"
                description="Vue du solde actuel, du nouveau solde et du montant débité du portefeuille."
            >
                <div
                    className={css({
                        display: "grid",
                        gridTemplateColumns: {
                            base: "1fr",
                            md: "repeat(3, minmax(0, 1fr))",
                        },
                        gap: "0.75rem",
                    })}
                >
                    {[
                        {
                            label: "Solde actuel",
                            value: `${formatTokenValue(props.currentTokensLeft)} tokens`,
                            bg: "neutral/1",
                        },
                        {
                            label: "Nouveau solde",
                            value: `${formatTokenValue(nextTokensLeft)} tokens`,
                            bg: deltaAmountInCents > 0 ? "warning/5" : "neutral/1",
                        },
                        {
                            label: "Débité du portefeuille",
                            value: `${formatEuros(deltaAmountTTCInCents)} TTC`,
                            bg: "neutral/1",
                        },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.25rem",
                                padding: "0.875rem",
                            })}
                            style={{
                                background: `var(--colors-${item.bg})`,
                            }}
                        >
                            <span
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/50",
                                })}
                            >
                                {item.label}
                            </span>
                            <span
                                className={css({
                                    fontSize: "sm",
                                    fontWeight: "600",
                                    color: "neutral",
                                })}
                            >
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            </FormSection>
            <Button
                onClick={() => setConfirmOpen(true)}
                isDisabled={quantityDelta === 0}
            >
                <ButtonOutlineContent
                    leftIcon={<IconPlus />}
                    text="Enregistrer les tokens"
                />
            </Button>
            <ConfirmationModal
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Confirmer l'achat de tokens"
                description={`${formatTokenUnitDelta(quantityDelta)} seront ajoutés et ${formatEuros(deltaAmountTTCInCents)} (TTC) seront débités de votre portefeuille (${formatEuros(deltaAmountInCents)} (HT) + TVA ${VAT_PERCENT}%).`}
                submitButtonProps={{
                    text: "Confirmer l'achat",
                }}
                onSubmit={handleSave}
            />
        </div>
    )
}

export function UpdateTokensPage({ idOrganization }: { idOrganization: string }) {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Modifier les tokens Assistant IA</Page.Title>
            </Page.Header>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization,
                    }}
                >
                    {(organization) => (
                        <UpdateTokensForm
                            idOrganization={idOrganization}
                            currentQuantity={Math.max(
                                Math.round(
                                    (organization.tokensTotalAvailable +
                                        organization.tokensTotalUsed -
                                        INCLUDED_AGENT_TOKENS) /
                                        INCLUDED_AGENT_TOKENS,
                                ),
                                0,
                            )}
                            currentTokensLeft={organization.tokensTotalAvailable}
                        />
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
