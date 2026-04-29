import {
    createWalletTopUpCheckoutRouteDefinition
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Drawer } from "../../../../../components/overlays/drawer/drawer.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { parseEuroAmountToCents } from "../../../../../utilities/parseEuroAmountToCents.ts"


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

