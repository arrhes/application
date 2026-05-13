import {
    readOneOrganizationRouteDefinition,
    updateLicenceSubscriptionRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { getAmountTTCFromHTInCents, SUPPORT_TIERS, VAT_PERCENT } from "@arrhes/application-metadata/utilities"
import { Button, ButtonOutlineContent, toast } from "@arrhes/ui"
import { InputCurrency } from "@arrhes/ui/components/inputs/inputCurrency.js"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDeviceFloppy } from "@tabler/icons-react"
import { useState } from "react"
import { DataWrapper } from "../../../../components/layouts/dataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { ConfirmationModal } from "../../../../components/overlays/dialog/confirmationModal.tsx"
import { formatEuros } from "../../../../utilities/formatEuros.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

function UpdateLicenceForm(props: { idOrganization: string; currentAmountInCents: number }) {
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [value, setValue] = useState<number>(props.currentAmountInCents)
    const [isSaving, setIsSaving] = useState(false)
    const valueTTCInCents = getAmountTTCFromHTInCents(value)

    async function handleSave() {
        if (Number.isNaN(value) || value < 0) {
            toast({
                title: "Montant invalide",
                variant: "error",
            })
            return
        }

        setIsSaving(true)
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateLicenceSubscriptionRouteDefinition,
            body: {
                newAmountInCents: value,
            },
        })
        setIsSaving(false)

        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Erreur lors de la mise à jour",
                variant: "error",
            })
            return
        }

        toast({
            title: "Modification enregistrée, effective le 1er du mois prochain",
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
                La licence Arrhes est un montant mensuel libre, prélevé depuis le portefeuille le 1er de chaque mois.
                Vous pouvez le laisser à 0,00€ ou contribuer librement au développement d'Arrhes et bénéficier d'un
                support privilégié. Le montant est HT.
            </p>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                <InputCurrency
                    value={value}
                    onChange={(v) => {
                        setValue(v ?? 0)
                    }}
                    type="number"
                    placeholder="Montant mensuel en €"
                />
                <div
                    className={css({
                        display: "flex",
                        gap: "0.25rem",
                        flexWrap: "wrap",
                    })}
                >
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
                                _hover: {
                                    background: "neutral/5",
                                },
                            })}
                        >
                            {formatEuros(tier)}
                        </button>
                    ))}
                </div>
            </div>
            <Button
                onClick={() => setConfirmOpen(true)}
                hasLoader
                isDisabled={isSaving}
            >
                <ButtonOutlineContent
                    leftIcon={<IconDeviceFloppy />}
                    text={isSaving ? "Enregistrement..." : "Enregistrer"}
                />
            </Button>
            <ConfirmationModal
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                title="Confirmer la modification de la licence"
                description={`Votre contribution mensuelle passera à ${formatEuros(valueTTCInCents)} TTC (${formatEuros(value)} HT + TVA ${VAT_PERCENT}%), effective le 1er du mois prochain.`}
                submitButtonProps={{
                    text: "Confirmer",
                }}
                onSubmit={handleSave}
            />
        </div>
    )
}

export function UpdateLicencePage({ idOrganization }: { idOrganization: string }) {
    return (
        <Page.Root>
            <Page.Header>
                <Page.Title>Modifier le montant de la licence</Page.Title>
            </Page.Header>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization,
                    }}
                >
                    {(organization) => (
                        <UpdateLicenceForm
                            idOrganization={idOrganization}
                            currentAmountInCents={organization.licenceAmount}
                        />
                    )}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
