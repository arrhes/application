import {
    readOneOrganizationRouteDefinition,
    updateStorageSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { FREE_STORAGE_BYTES, STORAGE_PRICE_PER_GB_IN_CENTS, VAT_PERCENT } from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { type JSX, type ReactNode, useEffect, useState } from "react"
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

function formatBytes(bytes: number): string {
    if (bytes >= 1_073_741_824) {
        return `${(bytes / 1_073_741_824).toFixed(2)} Go`
    }

    if (bytes >= 1_048_576) {
        return `${(bytes / 1_048_576).toFixed(2)} Mo`
    }

    if (bytes >= 1024) {
        return `${(bytes / 1024).toFixed(2)} Ko`
    }

    return `${bytes} o`
}

function getStorageMaxUsageFromQuantity(quantity: number): number {
    return FREE_STORAGE_BYTES + quantity * FREE_STORAGE_BYTES
}

function getMinimumStorageQuantityFromUsage(storageCurrentUsage: number): number {
    return Math.max(Math.ceil(storageCurrentUsage / FREE_STORAGE_BYTES) - 1, 0)
}

function formatStorageSelection(quantity: number): string {
    return `${quantity + 1} Go disponibles`
}

function formatStorageDelta(quantityDelta: number): string {
    if (quantityDelta === 0) {
        return "Aucun changement"
    }

    if (quantityDelta > 0) {
        return `Ajouter ${quantityDelta} Go`
    }

    return `Retirer ${Math.abs(quantityDelta)} Go`
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

export function UpdateStorageSubscriptionDrawer(props: {
    children: JSX.Element
    idOrganization: string
    currentQuantity: number
    currentUsageInBytes: number
    currentMaxUsageInBytes: number
    onSuccess: () => void
}) {
    const [open, setOpen] = useState(false)
    const [quantityDelta, setQuantityDelta] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const minimumQuantity = getMinimumStorageQuantityFromUsage(props.currentUsageInBytes)
    const minimumQuantityDelta = minimumQuantity - props.currentQuantity
    const nextQuantity = props.currentQuantity + quantityDelta
    const currentAmountInCents = props.currentQuantity * STORAGE_PRICE_PER_GB_IN_CENTS
    const nextAmountInCents = nextQuantity * STORAGE_PRICE_PER_GB_IN_CENTS
    const deltaAmountInCents = nextAmountInCents - currentAmountInCents
    const nextStorageMaxUsageInBytes = getStorageMaxUsageFromQuantity(nextQuantity)

    useEffect(() => {
        if (open) {
            setQuantityDelta(0)
        }
    }, [open])

    async function handleSave() {
        setIsLoading(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateStorageSubscriptionRouteDefinition,
            body: {
                newQuantity: nextQuantity,
            },
        })
        setIsLoading(false)

        if (response.ok === false) {
            toast({ title: response.error?.cause ?? "Erreur lors de la mise à jour", variant: "error" })
            return
        }
        toast({ title: "Modification enregistrée, effective le 1er du mois prochain", variant: "success" })

        await invalidateData({
            routeDefinition: readOneOrganizationRouteDefinition,
            body: { idOrganization: props.idOrganization },
        })

        setOpen(false)
        props.onSuccess()
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier le stockage" />
                <Drawer.Body>
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        })}
                    >
                        <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                            Ajustez le stockage disponible pour l'organisation. La modification sera effective le 1er du
                            mois prochain et debitee automatiquement du portefeuille. Montants en HT (TVA {VAT_PERCENT}
                            %).
                        </p>
                        <DrawerSection
                            title="État actuel"
                            description="Vue instantanée du stockage actuellement disponible et de son coût mensuel."
                        >
                            <div
                                className={css({
                                    display: "grid",
                                    gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" },
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
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                        Utilisation actuelle
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatBytes(props.currentUsageInBytes)}
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
                                        Capacité actuelle
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatBytes(props.currentMaxUsageInBytes)}
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
                                        Go supplémentaires actifs
                                    </span>
                                    <span className={css({ fontSize: "sm", color: "neutral/80" })}>
                                        {props.currentQuantity === 0
                                            ? "Aucun supplément"
                                            : `${props.currentQuantity} Go supplémentaires`}
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
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>Montant actuel</span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatEuros(currentAmountInCents)} HT / mois
                                    </span>
                                </div>
                            </div>
                        </DrawerSection>
                        <DrawerSection
                            title="Ajuster le stockage"
                            description="Choisissez la nouvelle capacité. La sélection repart de la configuration actuelle."
                        >
                            <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                                <span className={css({ fontSize: "sm", color: "neutral/60" })}>
                                    Ajustement sélectionné
                                </span>
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
                                                setQuantityDelta((currentQuantityDelta) => currentQuantityDelta - 1)
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
                                            disabled={quantityDelta <= minimumQuantityDelta}
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
                                                minWidth: "11rem",
                                                fontVariantNumeric: "tabular-nums",
                                            })}
                                        >
                                            {formatStorageDelta(quantityDelta)}
                                        </span>
                                    </div>
                                    <span className={css({ fontSize: "sm", color: "neutral/70" })}>
                                        {quantityDelta > 0
                                            ? `${formatEuros(deltaAmountInCents)} HT / mois debite`
                                            : quantityDelta < 0
                                              ? `${formatEuros(Math.abs(deltaAmountInCents))} HT / mois credite`
                                              : "0,00\u202fEUR HT / mois"}
                                    </span>
                                </div>
                                <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                    Le minimum autorisé est calé sur l'usage actuel:{" "}
                                    {formatBytes(props.currentUsageInBytes)}.
                                </span>
                            </div>
                        </DrawerSection>
                        <DrawerSection
                            title="Nouvel état"
                            description="Prévisualisation de la capacité finale et de l'impact financier avant enregistrement."
                        >
                            <div
                                className={css({
                                    display: "grid",
                                    gridTemplateColumns: { base: "1fr", md: "repeat(2, minmax(0, 1fr))" },
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
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                        Capacité après modification
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatBytes(nextStorageMaxUsageInBytes)}
                                    </span>
                                </div>
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.25rem",
                                        padding: "0.875rem",
                                        background:
                                            deltaAmountInCents > 0
                                                ? "warning/5"
                                                : deltaAmountInCents < 0
                                                  ? "success/5"
                                                  : "neutral/1",
                                    })}
                                >
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                        {deltaAmountInCents > 0
                                            ? "Débité du portefeuille"
                                            : deltaAmountInCents < 0
                                              ? "Crédité au portefeuille"
                                              : "Ajustement portefeuille"}
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatEuros(Math.abs(deltaAmountInCents))}
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
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>Montant actuel</span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatEuros(currentAmountInCents)} HT / mois
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
                                        Nouvelle capacité totale
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatStorageSelection(nextQuantity)}
                                    </span>
                                </div>
                            </div>
                        </DrawerSection>
                        <Button onClick={handleSave} hasLoader isDisabled={isLoading || quantityDelta === 0}>
                            <ButtonOutlineContent
                                leftIcon={deltaAmountInCents < 0 ? <IconMinus /> : <IconPlus />}
                                text={isLoading ? "Enregistrement..." : "Enregistrer le stockage"}
                            />
                        </Button>
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
