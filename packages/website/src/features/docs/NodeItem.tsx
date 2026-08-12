import type { Icon, IconProps } from "@tabler/icons-react"
import type { ReactElement } from "react"

export type NodeItem = Array<{
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    hash?: string
    path?: string | null
    label: string
    children?: NodeItem
}>
