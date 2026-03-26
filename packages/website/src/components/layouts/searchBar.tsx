import { InputDebounced, InputText } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"

export function SearchBar(props: { value: string; onChange: (value: string) => void; placeholder?: string }) {
    return (
        <InputDebounced value={props.value} onChange={(value) => props.onChange(value ?? "")}>
            <InputText placeholder={props.placeholder ?? "Recherche"} className={css({ maxWidth: "320px" })} />
        </InputDebounced>
    )
}
