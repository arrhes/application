import type { accountType } from "./accountType.js"

export type DefaultAccount = {
    number: number
    isOptional: boolean
    isSelectable: boolean
    type: (typeof accountType)[number]
    label: string
    children: Array<DefaultAccount>
}
