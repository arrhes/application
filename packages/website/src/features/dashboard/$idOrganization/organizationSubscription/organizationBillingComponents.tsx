import {
    createWalletTopUpCheckoutRouteDefinition,
    createWalletWithdrawalRouteDefinition,
    readAllOrganizationPaymentsRouteDefinition,
    readOneOrganizationRouteDefinition
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertTriangle, IconMinus, IconPencil, IconPlus } from "@tabler/icons-react"
import { type JSX, useEffect, useState } from "react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { parseEuroAmountToCents } from "../../../../utilities/parseEuroAmountToCents.ts"
import { UpdateOneOrganization } from "../organizationSettings/updateOneOrganization.tsx"


export type SubscriptionFeatureType = "storage_gb" | "agent_tokens_million" | "ocr_pages_hundred"


export function WalletTopUpDrawer(props: { children: JSX.Element; onSuccess: () => void }) {
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState("25")
    const [isLoading, setIsLoading] = useState(false)

    async function handleTopUp() {
        const amountInCents = parseEuroAmountToCents(amount)

        if (Number.isNaN(amountInCents) || amountInCents <= 0) {
            toast({ title: "Montant invalide", variant: "error" })
            return
        }

        setIsLoading(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: createWalletTopUpCheckoutRouteDefinition,
            body: { amountInCents },
        })
        setIsLoading(false)

        if (response.ok === false) {
            toast({ title: "Impossible de démarrer le rechargement", variant: "error" })
            return
        }

        props.onSuccess()
        window.location.href = response.data.checkoutUrl
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Recharger le portefeuille" />
                <Drawer.Body>
                    <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
                        <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                            Ajoutez un solde disponible immédiatement pour payer les achats ponctuels et les avances sur
                            abonnement.
                        </p>
                        <InputText
                            value={amount}
                            onChange={(value) => setAmount(value ?? "")}
                            type="number"
                            placeholder="Montant en €"
                        />
                        <Button onClick={handleTopUp} hasLoader isDisabled={isLoading}>
                            <ButtonOutlineContent
                                leftIcon={<IconPlus />}
                                text={isLoading ? "Redirection..." : "Recharger via Mollie"}
                            />
                        </Button>
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}

export function WalletWithdrawalDrawer(props: {
    children: JSX.Element
    currentBalanceInCents: number
    hasWithdrawalThisMonth: boolean
    onSuccess: () => void
}) {
    const [open, setOpen] = useState(false)
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (open) {
            setAmount((props.currentBalanceInCents / 100).toFixed(2).replace(".", ","))
        }
    }, [open, props.currentBalanceInCents])

    async function handleWithdrawal() {
        const amountInCents = parseEuroAmountToCents(amount)

        if (Number.isNaN(amountInCents) || amountInCents <= 0) {
            toast({ title: "Montant invalide", variant: "error" })
            return
        }

        setIsLoading(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: createWalletWithdrawalRouteDefinition,
            body: { amountInCents },
        })
        setIsLoading(false)

        if (response.ok === false) {
            toast({ title: response.error?.cause ?? "Impossible d'initier le retrait", variant: "error" })
            return
        }

        toast({ title: "Retrait demandé", variant: "success" })
        setOpen(false)
        props.onSuccess()
    }

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Retirer du portefeuille" />
                <Drawer.Body>
                    <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
                        <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                            Le retrait est effectué par remboursement Mollie depuis un rechargement compatible déjà
                            payé.
                        </p>
                        <p className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                            Un seul retrait portefeuille est autorisé par mois calendaire pour limiter les abus.
                        </p>
                        <InputText
                            value={amount}
                            onChange={(value) => setAmount(value ?? "")}
                            type="number"
                            placeholder="Montant en €"
                        />
                        <Button
                            onClick={handleWithdrawal}
                            hasLoader
                            isDisabled={isLoading || props.currentBalanceInCents <= 0 || props.hasWithdrawalThisMonth}
                        >
                            <ButtonOutlineContent
                                leftIcon={<IconMinus />}
                                text={
                                    isLoading
                                        ? "Traitement..."
                                        : props.hasWithdrawalThisMonth
                                            ? "Retrait déjà utilisé ce mois-ci"
                                            : "Retirer via Mollie"
                                }
                            />
                        </Button>
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}

function BillingDisclaimerContent(props: {
    organization: v.InferOutput<typeof returnedSchemas.organization>
    hasPaymentMethod: boolean
}) {
    const isMissingBillingInformation = props.organization.email === null || props.organization.siren === null

    if (props.hasPaymentMethod || isMissingBillingInformation === false) {
        return null
    }

    const missingFields = [
        props.organization.email === null ? "email" : null,
        props.organization.siren === null ? "SIREN" : null,
    ].filter((value): value is string => value !== null)

    return (
        <div
            className={css({
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                borderRadius: "xl",
                border: "1px solid token(colors.warning/25)",
                background: "warning/5",
            })}
        >
            <div className={css({ display: "flex", alignItems: "flex-start", gap: "0.75rem" })}>
                <IconAlertTriangle className={css({ color: "warning", flexShrink: 0, marginTop: "0.125rem" })} />
                <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                    <span className={css({ fontSize: "sm", fontWeight: "600", color: "neutral" })}>
                        Configuration de facturation incomplète
                    </span>
                    <span className={css({ fontSize: "sm", color: "neutral/70", lineHeight: "1.5" })}>
                        Aucun moyen de paiement n'est enregistré et les informations de facturation sont incomplètes.
                        Renseignez {missingFields.join(" et ")} pour utiliser correctement les paiements via Mollie.
                    </span>
                </div>
            </div>
            <UpdateOneOrganization organization={props.organization}>
                <Button>
                    <ButtonOutlineContent leftIcon={<IconPencil />} text="Compléter" />
                </Button>
            </UpdateOneOrganization>
        </div>
    )
}

export function OrganizationBillingDisclaimerBanner(props: { idOrganization: string }) {
    return (
        <DataWrapper
            routeDefinition={readOneOrganizationRouteDefinition}
            body={{ idOrganization: props.idOrganization }}
        >
            {(organization) => (
                <DataWrapper routeDefinition={readAllOrganizationPaymentsRouteDefinition} body={{}}>
                    {(payments) => {
                        const hasPaymentMethod = payments.some(
                            (payment) =>
                                payment.status === "paid" &&
                                ["first", "setup", "recurring"].includes(payment.sequenceType ?? ""),
                        )

                        return (
                            <BillingDisclaimerContent organization={organization} hasPaymentMethod={hasPaymentMethod} />
                        )
                    }}
                </DataWrapper>
            )}
        </DataWrapper>
    )
}
