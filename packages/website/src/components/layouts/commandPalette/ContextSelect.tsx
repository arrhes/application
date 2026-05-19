import { InputCombobox } from "@arrhes/ui"

export function ContextSelect(props: {
    placeholder: string
    value: string | null
    onChange: (v: string | null) => void
    options: {
        key: string
        label: string
    }[]
    isLoading?: boolean
}) {
    return (
        <InputCombobox
            placeholder={props.placeholder}
            value={props.value}
            onChange={(v) => props.onChange(v ?? null)}
            options={props.options}
            isLoading={props.isLoading}
            allowEmpty={true}
        />
    )
}
