import {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useState,
} from "react"
import { usePopoverStore } from "../../../stores/popoverStore.js"
import { PopoverContext } from "./popoverContext.js"

// ---------------------------------------------------------------------------
// Context shared between Root / Trigger / Content / Close
// ---------------------------------------------------------------------------

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

    const setOpen: Dispatch<SetStateAction<boolean>> = useCallback(
        (valueOrUpdater) => {
            const next = typeof valueOrUpdater === "function" ? valueOrUpdater(isOpen) : valueOrUpdater
            if (!isControlled) setLocalOpen(next)
            props.onOpenChange?.(next)
        },
        [
            isControlled,
            isOpen,
            props.onOpenChange,
        ],
    )

    const store = usePopoverStore()

    useEffect(() => {
        store.register(id, setOpen)
        return () => store.unregister(id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        id,
        store.unregister,
        store.register,
        setOpen,
    ])

    const popoverContextValue = useMemo(
        () => ({
            id,
            anchorName,
            isOpen,
            setOpen,
        }),
        [
            id,
            anchorName,
            isOpen,
            setOpen,
        ],
    )

    return <PopoverContext.Provider value={popoverContextValue}>{props.children}</PopoverContext.Provider>
}
