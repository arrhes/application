import { IconInfoCircle } from "@tabler/icons-react"
import { DocTip } from "./docTip.js"

export function DocExample(props: { title?: string; children: React.ReactNode }) {
    return (
        <DocTip variant="neutral" title={props.title ?? "Exemple"} icon={IconInfoCircle}>
            {props.children}
        </DocTip>
    )
}
