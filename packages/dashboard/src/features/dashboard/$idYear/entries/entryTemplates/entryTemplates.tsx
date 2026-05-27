import type { ReactElement } from "react"
import type { UseFormReturn } from "react-hook-form"
import { AmortizationTemplateForm } from "./AmortizationTemplateForm.tsx"

export type EntryTemplateKey = "empty" | "amortization"

export type EntryTemplateFormProps = {
    form: UseFormReturn<any>
    idOrganization: string
    idYear: string
    onTemplateReadyChange: (isReady: boolean) => void
}

export const entryTemplates: Array<{
    key: EntryTemplateKey
    label: string
    hasActionButton: boolean
    formComponent: (props: EntryTemplateFormProps) => ReactElement | null
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
