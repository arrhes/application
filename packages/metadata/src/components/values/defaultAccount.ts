import type { accountType } from "./accountType.js"

export type DefaultAccount = {
    number: number
    isMandatory: boolean
    isClass: boolean
    isSelectable: boolean
    type: (typeof accountType)[number]
    label: string
    children: Array<DefaultAccount>
}
