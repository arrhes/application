import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useEffect,
    useId,
    useState,
} from "react"
import { usePopoverStore } from "../../../stores/popoverStore.js"

// ---------------------------------------------------------------------------
// Context shared between Root / Trigger / Content / Close
// ---------------------------------------------------------------------------

export type PopoverContextValue = {
    id: string
    anchorName: string
    isOpen: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const PopoverContext = createContext<PopoverContextValue | null>(null)

export function usePopoverContext(): PopoverContextValue {
    const ctx = useContext(PopoverContext)
    if (ctx === null) throw new Error("Popover sub-component used outside <Popover.Root>")
    return ctx
}

// ---------------------------------------------------------------------------
// PopoverRoot
// ---------------------------------------------------------------------------

export function PopoverRoot(props: {
    children: ReactNode
    /** Optionally override the auto-generated id (must be a valid CSS ident fragment). */
    id?: string
    /** Controlled open state. */
    open?: boolean
    /** Controlled open-change callback. */
    onOpenChange?: (open: boolean) => void
}) {
    const reactId = useId()
    const id = props.id ?? reactId.replace(/:/g, "")
    const anchorName = `--popover-${id}`

    const isControlled = props.open !== undefined
    const [localOpen, setLocalOpen] = useState(false)

    const isOpen = isControlled ? (props.open ?? false) : localOpen

    const setOpen: Dispatch<SetStateAction<boolean>> = (valueOrUpdater) => {
        const next = typeof valueOrUpdater === "function" ? valueOrUpdater(isOpen) : valueOrUpdater
        if (!isControlled) setLocalOpen(next)
        props.onOpenChange?.(next)
    }

    const store = usePopoverStore()

    useEffect(() => {
        store.register(id, setOpen)
        return () => store.unregister(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        id,
    ])

    return (
        <PopoverContext.Provider
            value={{
                id,
                anchorName,
                isOpen,
                setOpen,
            }}
        >
            {props.children}
        </PopoverContext.Provider>
    )
}
