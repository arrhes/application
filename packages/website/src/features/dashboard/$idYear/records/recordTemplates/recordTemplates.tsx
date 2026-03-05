import type { ReactElement } from "react"
import type { UseFormReturn } from "react-hook-form"
import { AmortizationTemplateForm } from "./amortizationTemplate.tsx"

export type RecordTemplateKey = "empty" | "amortization"

export type RecordTemplateFormProps = {
    form: UseFormReturn<any>
    idOrganization: string
    idYear: string
    onTemplateReadyChange: (isReady: boolean) => void
}

export const recordTemplates: Array<{
    key: RecordTemplateKey
    label: string
    hasActionButton: boolean
    formComponent: (props: RecordTemplateFormProps) => ReactElement | null
}> = [
    {
        key: "empty",
        label: "Écriture vide",
        hasActionButton: false,
        formComponent: (_props) => null,
    },
    {
        key: "amortization",
        label: "Dotation aux amortissements (linéaire)",
        hasActionButton: true,
        formComponent: (props) => <AmortizationTemplateForm {...props} />,
    },
]
