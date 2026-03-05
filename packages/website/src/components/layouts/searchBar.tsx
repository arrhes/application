import { css } from "@arrhes/ui/utilities/cn.js"
import { InputDebounced } from "../inputs/inputDebounced.js"
import { InputText } from "../inputs/inputText.js"

export function SearchBar(props: { value: string; onChange: (value: string) => void; placeholder?: string }) {
    return (
        <InputDebounced value={props.value} onChange={(value) => props.onChange(value ?? "")}>
            <InputText placeholder={props.placeholder ?? "Recherche"} className={css({ maxWidth: "320px" })} />
        </InputDebounced>
    )
}
