import { createContext, type Dispatch, type SetStateAction } from "react"

export type PopoverStoreValue = {
    open: (id: string) => void
    close: (id: string) => void
    closeAll: () => void
    isOpen: (id: string) => boolean
    register: (id: string, setOpen: Dispatch<SetStateAction<boolean>>) => void
    unregister: (id: string) => void
}

export const PopoverStoreContext = createContext<PopoverStoreValue | null>(null)
