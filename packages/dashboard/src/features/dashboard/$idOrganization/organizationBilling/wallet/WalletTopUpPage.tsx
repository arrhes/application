import { createWalletTopUpCheckoutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { parseEuroAmountToCents } from "../../../../../utilities/parseEuroAmountToCents.ts"

export function WalletTopUpPage(_props: { idOrganization: string }) {
    const [amount, setAmount] = useState("25")
    const [isLoading, setIsLoading] = useState(false)

    async function handleTopUp() {
        const amountInCents = parseEuroAmountToCents(amount)

        if (Number.isNaN(amountInCents) || amountInCents <= 0) {
            toast({
                title: "Montant invalide",
                variant: "error",
            })
            return
        }

        setIsLoading(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: createWalletTopUpCheckoutRouteDefinition,
            body: {
                amountInCents,
            },
        })
        setIsLoading(false)

        if (response.ok === false) {
            toast({
                title: "Impossible de démarrer le rechargement",
                variant: "error",
            })
            return
        }

        window.location.href = response.data.checkoutUrl
    }

    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Recharger le portefeuille</Page.Title>
            </Page.Header>
            <Page.Content>
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        maxWidth: "480px",
                    })}
                >
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/70",
                            lineHeight: "1.5",
                        })}
                    >
                        Ajoutez un solde disponible immédiatement pour payer les achats ponctuels et les avances sur
                        abonnement.
                    </p>
                    <InputText
                        value={amount}
                        onChange={(value) => setAmount(value ?? "")}
                        type="number"
                        placeholder="Montant en €"
                    />
                    <Button
                        onClick={handleTopUp}
                        hasLoader
                        isDisabled={isLoading}
                    >
                        <ButtonOutlineContent
                            leftIcon={<IconPlus />}
                            text={isLoading ? "Redirection..." : "Recharger via Mollie"}
                        />
                    </Button>
                </div>
            </Page.Content>
        </Page.Root>
    )
}
