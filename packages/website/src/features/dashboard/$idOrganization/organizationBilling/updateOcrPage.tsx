import {
    readOneOrganizationRouteDefinition,
    updateOcrSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import {
    getAmountTTCFromHTInCents,
    INCLUDED_OCR_PAGES,
    OCR_PAGE_PRICE_IN_CENTS,
    OCR_PAGE_TIERS,
    VAT_PERCENT,
} from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent, ButtonPlainContent, InputNumber, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCreditCard, IconX } from "@tabler/icons-react"
import { type ReactNode, useEffect, useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

function formatPageDelta(quantityDelta: number) {
    if (quantityDelta === 0) {
        return "Aucun ajout"
    }

    return `${quantityDelta.toLocaleString("fr-FR")} page${quantityDelta > 1 ? "s" : ""}`
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

function UpdateOcrForm(props: { idOrganization: string; currentQuantity: number; currentPagesLeft: number }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [quantityDelta, setQuantityDelta] = useState(0)
    const nextQuantity = props.currentQuantity + quantityDelta
    const deltaAmountInCents = quantityDelta * OCR_PAGE_PRICE_IN_CENTS
    const deltaAmountTTCInCents = getAmountTTCFromHTInCents(deltaAmountInCents)
    const nextPagesLeft = props.currentPagesLeft + quantityDelta

    useEffect(() => {
        setQuantityDelta(0)
    }, [])

    async function handleSave() {
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateOcrSubscriptionRouteDefinition,
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
            title: "Pages OCR mises à jour",
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
                Chaque page supplémentaire est débitée 0,01€ (HT) une seule fois depuis le portefeuille. Les pages
                achetées restent disponibles tant qu'elles ne sont pas consommées.
            </p>
            <FormSection
                title="Ajouter des pages OCR"
                description="Sélectionnez uniquement les pages supplémentaires à ajouter."
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
                        label="pages"
                    />
                    <div
                        className={css({
                            display: "flex",
                            gap: "0.25rem",
                            flexWrap: "wrap",
                        })}
                    >
                        {OCR_PAGE_TIERS.map((tier) => (
                            <Button
                                key={tier}
                                onClick={() => setQuantityDelta(tier)}
                            >
                                <ButtonOutlineContent
                                    text={tier === 0 ? "0" : `${tier.toLocaleString("fr-FR")} pages`}
                                />
                            </Button>
                        ))}
                    </div>
                </div>
            </FormSection>
            <FormSection
                title="Récapitulatif"
                description="Vue du quota actuel, du nouveau quota et du montant débité du portefeuille."
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
                            label: "Quota actuel",
                            value: `${props.currentPagesLeft.toLocaleString("fr-FR")} pages`,
                            bg: "neutral/1",
                        },
                        {
                            label: "Nouveau quota",
                            value: `${nextPagesLeft.toLocaleString("fr-FR")} pages`,
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
            <div
                className={css({
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <Button onClick={() => setQuantityDelta(0)}>
                    <ButtonOutlineContent
                        leftIcon={<IconX />}
                        text="Réinitialiser"
                    />
                </Button>
                <Button
                    onClick={() => setConfirmOpen(true)}
                    isDisabled={quantityDelta === 0}
                >
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
                description={`${formatPageDelta(quantityDelta)} seront ajoutées et ${formatEuros(deltaAmountTTCInCents)} (TTC) seront débités de votre portefeuille (${formatEuros(deltaAmountInCents)} HT + TVA ${VAT_PERCENT}%).`}
                submitButtonProps={{
                    text: "Confirmer l'achat",
                }}
                onSubmit={handleSave}
            />
        </div>
    )
}

export function UpdateOcrPage({ idOrganization }: { idOrganization: string }) {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Ajouter des pages OCR</Page.Title>
            </Page.Header>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization,
                    }}
                >
                    {(organization) => (
                        <UpdateOcrForm
                            idOrganization={idOrganization}
                            currentQuantity={Math.max(
                                organization.ocrPagesTotalAvailable +
                                    organization.ocrPagesTotalUsed -
                                    INCLUDED_OCR_PAGES,
                                0,
                            )}
                            currentPagesLeft={organization.ocrPagesTotalAvailable}
                        />
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
