import { updateTokensSubscriptionRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { type JSX, type ReactNode, useEffect, useState } from "react"
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"

const TOKENS_PER_PACK = 1_000_000
const TOKEN_PACK_PRICE_IN_CENTS = 100

function formatTokenValue(value: number) {
    if (value >= 1_000_000) {
        return `${(value / 1_000_000).toLocaleString("fr-FR", { maximumFractionDigits: 1 })} M`
    }

    if (value >= 1_000) {
        return `${(value / 1_000).toLocaleString("fr-FR", { maximumFractionDigits: 0 })} k`
    }

    return value.toLocaleString("fr-FR")
}

function formatTokenUnitDelta(quantityDelta: number) {
    if (quantityDelta === 0) {
        return "Aucun ajout"
    }

    return `Ajouter ${quantityDelta} M tokens`
}

function DrawerSection(props: { title: string; description?: string; children: ReactNode }) {
    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
            })}
        >
            <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                <h3 className={css({ fontSize: "sm", fontWeight: "700", color: "neutral" })}>{props.title}</h3>
                {props.description ? (
                    <p className={css({ fontSize: "sm", color: "neutral/60", lineHeight: "1.5" })}>
                        {props.description}
                    </p>
                ) : null}
            </div>
            {props.children}
        </section>
    )
}

export function UpdateTokensSubscriptionDrawer(props: {
    children: JSX.Element
    currentQuantity: number
    currentTokensLeft: number
    onSuccess: () => void
}) {
    const [open, setOpen] = useState(false)
    const [quantityDelta, setQuantityDelta] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const nextQuantity = props.currentQuantity + quantityDelta
    const deltaAmountInCents = quantityDelta * TOKEN_PACK_PRICE_IN_CENTS
    const addedTokens = quantityDelta * TOKENS_PER_PACK
    const nextTokensLeft = props.currentTokensLeft + addedTokens

    useEffect(() => {
        if (open) {
            setQuantityDelta(0)
        }
    }, [open])

    async function handleSave() {
        setIsLoading(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateTokensSubscriptionRouteDefinition,
            body: {
                newQuantity: nextQuantity,
            },
        })
        setIsLoading(false)

        if (response.ok === false) {
            toast({ title: response.error?.cause ?? "Erreur lors de la mise à jour", variant: "error" })
            return
        }
        toast({ title: "Tokens IA mis à jour", variant: "success" })
        setOpen(false)
        props.onSuccess()
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier les tokens Assistant IA" />
                <Drawer.Body>
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        })}
                    >
                        <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                            Chaque million de tokens supplémentaire est débité une seule fois depuis le portefeuille.
                            Les tokens achetés restent disponibles tant qu'ils n'ont pas été consommés.
                        </p>
                        <DrawerSection
                            title="Ajuster les tokens"
                            description="Sélectionnez uniquement les tokens supplémentaires à ajouter. Le compteur repart de zéro à chaque ouverture."
                        >
                            <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                                <span className={css({ fontSize: "sm", color: "neutral/60" })}>Ajout sélectionné</span>
                                <div
                                    className={css({
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "0.75rem",
                                        flexWrap: "wrap",
                                    })}
                                >
                                    <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem" })}>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setQuantityDelta((currentQuantityDelta) =>
                                                    Math.max(currentQuantityDelta - 1, 0),
                                                )
                                            }
                                            className={css({
                                                width: "2rem",
                                                height: "2rem",
                                                border: "1px solid token(colors.neutral/20)",
                                                borderRadius: "md",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                background: "transparent",
                                                color: "neutral",
                                                _hover: { background: "neutral/5" },
                                            })}
                                            disabled={quantityDelta === 0}
                                        >
                                            <IconMinus size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setQuantityDelta((currentQuantityDelta) => currentQuantityDelta + 1)
                                            }
                                            className={css({
                                                width: "2rem",
                                                height: "2rem",
                                                border: "1px solid token(colors.neutral/20)",
                                                borderRadius: "md",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                                background: "transparent",
                                                color: "neutral",
                                                _hover: { background: "neutral/5" },
                                            })}
                                        >
                                            <IconPlus size={14} />
                                        </button>
                                        <span
                                            className={css({
                                                minWidth: "12rem",
                                                fontVariantNumeric: "tabular-nums",
                                            })}
                                        >
                                            {formatTokenUnitDelta(quantityDelta)}
                                        </span>
                                    </div>
                                    <span className={css({ fontSize: "sm", color: "neutral/70" })}>
                                        {formatEuros(deltaAmountInCents)} débité
                                    </span>
                                </div>
                            </div>
                        </DrawerSection>
                        <DrawerSection
                            title="Récapitulatif"
                            description="Vue du solde actuel, du nouveau solde et du montant débité du portefeuille."
                        >
                            <div
                                className={css({
                                    display: "grid",
                                    gridTemplateColumns: { base: "1fr", md: "repeat(3, minmax(0, 1fr))" },
                                    gap: "0.75rem",
                                })}
                            >
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.25rem",
                                        padding: "0.875rem",
                                        background: "neutral/1",
                                    })}
                                >
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>Solde actuel</span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatTokenValue(props.currentTokensLeft)} tokens
                                    </span>
                                </div>
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.25rem",
                                        padding: "0.875rem",
                                        background: deltaAmountInCents > 0 ? "warning/5" : "neutral/1",
                                    })}
                                >
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>Nouveau solde</span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatTokenValue(nextTokensLeft)} tokens
                                    </span>
                                </div>
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.25rem",
                                        padding: "0.875rem",
                                        background: "neutral/1",
                                    })}
                                >
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                        Débité du portefeuille
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatEuros(deltaAmountInCents)}
                                    </span>
                                </div>
                            </div>
                        </DrawerSection>
                        <Button onClick={handleSave} hasLoader isDisabled={isLoading || quantityDelta === 0}>
                            <ButtonOutlineContent
                                leftIcon={<IconPlus />}
                                text={isLoading ? "Enregistrement..." : "Enregistrer les tokens"}
                            />
                        </Button>
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
