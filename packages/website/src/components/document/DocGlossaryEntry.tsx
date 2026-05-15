import type { ReactNode } from "react"
import { DocDefinition } from "./DocDefinition.js"

export function DocGlossaryEntry(props: { term: string; children: ReactNode }) {
    const id = props.term
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

    return (
        <div id={id}>
            <DocDefinition term={props.term}>{props.children}</DocDefinition>
        </div>
    )
}
