import { createWalletWithdrawalRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMinus } from "@tabler/icons-react"
import { type JSX, useEffect, useState } from "react"
import { Drawer } from "../../../../../components/overlays/drawer/drawer.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { parseEuroAmountToCents } from "../../../../../utilities/parseEuroAmountToCents.ts"

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
