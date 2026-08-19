import { InputDebounced, InputText } from "@comptasse/ui"

export function SearchBar(props: { value: string; onChange: (value: string) => void; placeholder?: string }) {
    return (
        <InputDebounced
            value={props.value}
            onChange={(value) => props.onChange(value ?? "")}
        >
            <InputText
                placeholder={props.placeholder ?? "Recherche"}
                className={{
                    maxWidth: "320px",
                }}
            />
        </InputDebounced>
    )
}
