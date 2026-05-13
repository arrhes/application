import {
    createWalletWithdrawalRouteDefinition,
    readAllOrganizationPaymentsRouteDefinition,
    readOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMinus } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { parseEuroAmountToCents } from "../../../../../utilities/parseEuroAmountToCents.ts"

function hasCurrentMonthWithdrawal(
    payments: Array<{
        category: string
        createdAt: string
        status: string
    }>,
) {
    const now = new Date()

    return payments.some((payment) => {
        if (payment.category !== "withdrawal" || payment.status === "failed") {
            return false
        }

        const createdAt = new Date(payment.createdAt)
        return createdAt.getUTCFullYear() === now.getUTCFullYear() && createdAt.getUTCMonth() === now.getUTCMonth()
    })
}

function WalletWithdrawalForm(props: { currentBalanceInCents: number; hasWithdrawalThisMonth: boolean }) {
    const [amount, setAmount] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setAmount((props.currentBalanceInCents / 100).toFixed(2).replace(".", ","))
    }, [
        props.currentBalanceInCents,
    ])

    async function handleWithdrawal() {
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
            routeDefinition: createWalletWithdrawalRouteDefinition,
            body: {
                amountInCents,
            },
        })
        setIsLoading(false)

        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Impossible d'initier le retrait",
                variant: "error",
            })
            return
        }

        toast({
            title: "Retrait demandé",
            variant: "success",
        })
    }

    return (
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
                Le retrait est effectué par remboursement Mollie depuis un rechargement compatible déjà payé.
            </p>
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/70",
                    lineHeight: "1.5",
                })}
            >
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
    )
}

export function WalletWithdrawalPage({ idOrganization }: { idOrganization: string }) {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Retirer du portefeuille</Page.Title>
            </Page.Header>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization,
                    }}
                >
                    {(organization) => (
                        <DataWrapper
                            routeDefinition={readAllOrganizationPaymentsRouteDefinition}
                            body={{}}
                        >
                            {(payments) => (
                                <WalletWithdrawalForm
                                    currentBalanceInCents={organization.walletBalanceInCents}
                                    hasWithdrawalThisMonth={hasCurrentMonthWithdrawal(payments)}
                                />
                            )}
                        </DataWrapper>
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
