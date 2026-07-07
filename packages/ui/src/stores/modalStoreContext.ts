import { createContext, type ReactNode } from "react"

export type ModalStoreValue = {
    open: (id: string, content: ReactNode) => void
    close: (id: string) => void
    isOpen: (id: string) => boolean
}

export const ModalStoreContext = createContext<ModalStoreValue | null>(null)

export const ModalItemContext = createContext<{
    closeModal: () => void
} | null>(null)
