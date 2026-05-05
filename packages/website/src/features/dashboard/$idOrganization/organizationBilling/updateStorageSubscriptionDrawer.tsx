import {
    readOneOrganizationRouteDefinition,
    updateStorageSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import {
    FREE_STORAGE_BYTES,
    getAmountTTCFromHTInCents,
    STORAGE_PRICE_PER_GB_IN_CENTS,
    VAT_PERCENT,
} from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent, InputNumber, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMinus, IconPlus } from "@tabler/icons-react"
import { type JSX, type ReactNode, useEffect, useState } from "react"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.tsx"
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

function getProRataFraction(): number {
    const now = new Date()
    const daysInMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate()
    const remainingDays = daysInMonth - now.getUTCDate() + 1
    return remainingDays / daysInMonth
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
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [quantityDelta, setQuantityDelta] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const minimumQuantity = getMinimumStorageQuantityFromUsage(props.currentUsageInBytes)
    const nextQuantity = props.currentQuantity + quantityDelta
    const currentAmountInCents = props.currentQuantity * STORAGE_PRICE_PER_GB_IN_CENTS
    const nextAmountInCents = nextQuantity * STORAGE_PRICE_PER_GB_IN_CENTS
    const deltaAmountInCents = nextAmountInCents - currentAmountInCents
    const proRataAmountInCents = Math.round(deltaAmountInCents * getProRataFraction())
    const proRataAmountTTCInCents = getAmountTTCFromHTInCents(proRataAmountInCents)
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
        toast({
            title:
                quantityDelta > 0
                    ? "Stockage augmenté immédiatement"
                    : "Réduction enregistrée, effective le 1er du mois prochain",
            variant: "success",
        })

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
                            {quantityDelta > 0
                                ? `Augmenter le stockage est immédiat : le montant prorata du mois est débité du portefeuille. Montants en HT (TVA ${VAT_PERCENT}\u00a0%).`
                                : quantityDelta < 0
                                  ? `Réduire le stockage est effectif le 1er du mois prochain. Aucun remboursement n'est appliqué. Montants en HT (TVA ${VAT_PERCENT}\u00a0%).`
                                  : `Ajustez le stockage disponible pour l'organisation. Montants en HT (TVA ${VAT_PERCENT}\u00a0%).`}
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
                                <InputNumber
                                    value={quantityDelta}
                                    onChange={setQuantityDelta}
                                    min={minimumQuantity - props.currentQuantity}
                                    label="Go / mois"
                                />
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
                                            ? "Débité maintenant (prorata)"
                                            : deltaAmountInCents < 0
                                              ? "Effectif le 1er du mois"
                                              : "Ajustement portefeuille"}
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {deltaAmountInCents > 0
                                            ? `≈\u2009${formatEuros(proRataAmountTTCInCents)} TTC`
                                            : formatEuros(Math.abs(deltaAmountInCents))}
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
                                        Nouveau montant mensuel
                                    </span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {formatEuros(nextAmountInCents)} HT / mois
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
                        <Button onClick={() => setConfirmOpen(true)} isDisabled={isLoading || quantityDelta === 0}>
                            <ButtonOutlineContent
                                leftIcon={deltaAmountInCents < 0 ? <IconMinus /> : <IconPlus />}
                                text="Enregistrer le stockage"
                            />
                        </Button>
                        <ConfirmationModal
                            open={confirmOpen}
                            onOpenChange={setConfirmOpen}
                            title="Confirmer la modification du stockage"
                            description={
                                quantityDelta > 0
                                    ? `${formatStorageDelta(quantityDelta)} sera appliqué immédiatement. ${formatEuros(proRataAmountTTCInCents)} TTC seront débités du portefeuille (${formatEuros(proRataAmountInCents)} HT + TVA ${VAT_PERCENT}%, prorata du mois).`
                                    : `${formatStorageDelta(quantityDelta)} sera effectif le 1er du mois prochain. Aucun remboursement ne sera appliqué.`
                            }
                            submitButtonProps={{ text: "Confirmer" }}
                            onSubmit={handleSave}
                        />
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
