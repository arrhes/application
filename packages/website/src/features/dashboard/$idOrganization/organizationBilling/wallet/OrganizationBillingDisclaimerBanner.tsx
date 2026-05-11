import {
    readAllOrganizationPaymentsRouteDefinition,
    readOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertTriangle, IconPencil } from "@tabler/icons-react"
import type * as v from "valibot"
import { DataWrapper } from "../../../../../components/layouts/dataWrapper.tsx"
import { UpdateOneOrganization } from "../../organizationSettings/updateOneOrganization.tsx"

export type SubscriptionFeatureType = "storage_gb" | "agent_tokens_million" | "ocr_pages_hundred"

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
            <div
                className={css({
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                })}
            >
                <IconAlertTriangle
                    className={css({
                        color: "warning",
                        flexShrink: 0,
                        marginTop: "0.125rem",
                    })}
                />
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "sm",
                            fontWeight: "600",
                            color: "neutral",
                        })}
                    >
                        Configuration de facturation incomplète
                    </span>
                    <span
                        className={css({
                            fontSize: "sm",
                            color: "neutral/70",
                            lineHeight: "1.5",
                        })}
                    >
                        Aucun moyen de paiement n'est enregistré et les informations de facturation sont incomplètes.
                        Renseignez {missingFields.join(" et ")} pour utiliser correctement les paiements via Mollie.
                    </span>
                </div>
            </div>
            <UpdateOneOrganization organization={props.organization}>
                <Button>
                    <ButtonOutlineContent
                        leftIcon={<IconPencil />}
                        text="Compléter"
                    />
                </Button>
            </UpdateOneOrganization>
        </div>
    )
}
export function OrganizationBillingDisclaimerBanner(props: { idOrganization: string }) {
    return (
        <DataWrapper
            routeDefinition={readOneOrganizationRouteDefinition}
            body={{
                idOrganization: props.idOrganization,
            }}
        >
            {(organization) => (
                <DataWrapper
                    routeDefinition={readAllOrganizationPaymentsRouteDefinition}
                    body={{}}
                >
                    {(payments) => {
                        const hasPaymentMethod = payments.some(
                            (payment) =>
                                payment.status === "paid" &&
                                [
                                    "first",
                                    "setup",
                                    "recurring",
                                ].includes(payment.sequenceType ?? ""),
                        )

                        return (
                            <BillingDisclaimerContent
                                organization={organization}
                                hasPaymentMethod={hasPaymentMethod}
                            />
                        )
                    }}
                </DataWrapper>
            )}
        </DataWrapper>
    )
}
