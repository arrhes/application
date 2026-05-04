import { updateOcrSubscriptionRouteDefinition } from "@arrhes/application-metadata/routes"
import { OCR_PAGE_PRICE_IN_CENTS, OCR_PAGE_TIERS, VAT_PERCENT } from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent, ButtonPlainContent, InputNumber, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCreditCard, IconX } from "@tabler/icons-react"
import { type JSX, type ReactNode, useEffect, useState } from "react"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.tsx"
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"

function formatPageDelta(quantityDelta: number) {
    if (quantityDelta === 0) {
        return "Aucun ajout"
    }

    return `Ajouter ${quantityDelta.toLocaleString("fr-FR")} page${quantityDelta > 1 ? "s" : ""}`
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

export function UpdateOcrSubscriptionDrawer(props: {
    children: JSX.Element
    currentQuantity: number
    currentPagesLeft: number
    onSuccess: () => void
}) {
    const [open, setOpen] = useState(false)
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [quantityDelta, setQuantityDelta] = useState(0)
    const nextQuantity = props.currentQuantity + quantityDelta
    const deltaAmountInCents = quantityDelta * OCR_PAGE_PRICE_IN_CENTS
    const nextPagesLeft = props.currentPagesLeft + quantityDelta

    useEffect(() => {
        if (open) {
            setQuantityDelta(0)
        }
    }, [open])

    async function handleSave() {
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateOcrSubscriptionRouteDefinition,
            body: {
                newQuantity: nextQuantity,
            },
        })

        if (response.ok === false) {
            toast({ title: response.error?.cause ?? "Erreur lors de la mise à jour", variant: "error" })
            return
        }
        toast({ title: "Pages OCR mises à jour", variant: "success" })
        setOpen(false)
        props.onSuccess()
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Ajouter des pages OCR" />
                <Drawer.Body>
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                        })}
                    >
                        <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                            Chaque page supplementaire est debitee 0,01 EUR HT une seule fois depuis le portefeuille.
                            Les pages achetees restent disponibles tant qu'elles ne sont pas consommees. TVA{" "}
                            {VAT_PERCENT}% en sus.
                        </p>
                        <DrawerSection
                            title="Ajouter des pages OCR"
                            description="Sélectionnez uniquement les pages supplémentaires à ajouter."
                        >
                            <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                                <InputNumber value={quantityDelta} onChange={setQuantityDelta} min={0} label="pages" />
                                <div className={css({ display: "flex", gap: "0.25rem", flexWrap: "wrap" })}>
                                    {OCR_PAGE_TIERS.map((tier) => (
                                        <Button key={tier} onClick={() => setQuantityDelta(tier)}>
                                            <ButtonOutlineContent
                                                text={tier === 0 ? "0" : `${tier.toLocaleString("fr-FR")} pages`}
                                            />
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </DrawerSection>
                        <DrawerSection
                            title="Récapitulatif"
                            description="Vue du quota actuel, du nouveau quota et du montant débité du portefeuille."
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
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>Quota actuel</span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {props.currentPagesLeft.toLocaleString("fr-FR")} pages
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
                                    <span className={css({ fontSize: "xs", color: "neutral/50" })}>Nouveau quota</span>
                                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                                        {nextPagesLeft.toLocaleString("fr-FR")} pages
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
                                        {formatEuros(deltaAmountInCents)} HT
                                    </span>
                                </div>
                            </div>
                        </DrawerSection>
                        <div
                            className={css({
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <Button
                                onClick={() => {
                                    setOpen(false)
                                }}
                            >
                                <ButtonOutlineContent leftIcon={<IconX />} text="Annuler" />
                            </Button>
                            <Button onClick={() => setConfirmOpen(true)} isDisabled={quantityDelta === 0}>
                                <ButtonPlainContent
                                    leftIcon={<IconCreditCard />}
                                    text="Confirmer l'achat"
                                    isDisabled={quantityDelta === 0}
                                />
                            </Button>
                        </div>
                        <ConfirmationModal
                            open={confirmOpen}
                            onOpenChange={setConfirmOpen}
                            title="Confirmer l'achat de pages OCR"
                            description={`${formatPageDelta(quantityDelta)} seront ajoutees et ${formatEuros(deltaAmountInCents)} HT seront debites de votre portefeuille (TVA ${VAT_PERCENT}% en sus).`}
                            submitButtonProps={{ text: "Confirmer l'achat" }}
                            onSubmit={handleSave}
                        />
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
