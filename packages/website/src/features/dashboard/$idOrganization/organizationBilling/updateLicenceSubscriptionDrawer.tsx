import {
    readOneOrganizationRouteDefinition,
    updateLicenceSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { SUPPORT_TIERS } from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent, toast } from "@arrhes/ui"
import { InputCurrency } from "@arrhes/ui/components/inputs/inputCurrency.js"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDeviceFloppy } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function UpdateLicenceSubscriptionDrawer(props: {
    children: JSX.Element
    idOrganization: string
    currentAmountInCents: number
    onSuccess: () => void
}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<number>(props.currentAmountInCents)
    const [isSaving, setIsSaving] = useState(false)

    async function handleSaveSupport() {
        if (Number.isNaN(value) || value < 0) {
            toast({ title: "Montant invalide", variant: "error" })
            return
        }

        setIsSaving(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateLicenceSubscriptionRouteDefinition,
            body: { newAmountInCents: value },
        })
        setIsSaving(false)

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
                <Drawer.Header title="Modifier le montant de la licence" />
                <Drawer.Body>
                    <div className={css({ display: "flex", flexDirection: "column", gap: "1rem" })}>
                        <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                            <span className={css({ fontSize: "sm", color: "neutral/60" })}>Montant libre</span>
                            <InputCurrency
                                value={value}
                                onChange={(value) => {
                                    setValue(value ?? 0)
                                }}
                                type="number"
                                placeholder="Montant mensuel en €"
                            />
                            <div className={css({ display: "flex", gap: "0.5rem", flexWrap: "wrap" })}>
                                {SUPPORT_TIERS.map((tier) => (
                                    <button
                                        key={tier}
                                        type="button"
                                        onClick={() => {
                                            setValue(tier)
                                        }}
                                        className={css({
                                            padding: "0.375rem 0.875rem",
                                            border: "1px solid",
                                            borderRadius: "md",
                                            cursor: "pointer",
                                            fontSize: "sm",
                                            fontWeight: "400",
                                            color: "neutral",
                                            borderColor: "neutral/20",
                                            _hover: { background: "neutral/5" },
                                        })}
                                    >
                                        {formatEuros(tier)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Button onClick={handleSaveSupport} hasLoader isDisabled={isSaving}>
                            <ButtonOutlineContent
                                leftIcon={<IconDeviceFloppy />}
                                text={isSaving ? "Enregistrement..." : "Enregistrer"}
                            />
                        </Button>
                    </div>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
