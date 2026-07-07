import { createContext, type Dispatch, type SetStateAction, use } from "react"

export type PopoverContextValue = {
    id: string
    anchorName: string
    isOpen: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const PopoverContext = createContext<PopoverContextValue | null>(null)

export function usePopoverContext(): PopoverContextValue {
    const ctx = use(PopoverContext)
    if (ctx === null) throw new Error("Popover sub-component used outside <Popover.Root>")
    return ctx
}
