import {
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useRef,
} from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PopoverEntry = {
    isOpen: boolean
}

type PopoverState = Record<string, PopoverEntry>

type PopoverAction =
    | { type: "register"; id: string }
    | { type: "unregister"; id: string }
    | { type: "open"; id: string }
    | { type: "close"; id: string }
    | { type: "closeAll" }

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: PopoverState, action: PopoverAction): PopoverState {
    switch (action.type) {
        case "register":
            return { ...state, [action.id]: { isOpen: false } }
        case "unregister": {
            const { [action.id]: _removed, ...rest } = state
            return rest
        }
        case "open":
            if (state[action.id] === undefined) return state
            if (state[action.id].isOpen) return state
            return { ...state, [action.id]: { isOpen: true } }
        case "close":
            if (state[action.id] === undefined) return state
            if (!state[action.id].isOpen) return state
            return { ...state, [action.id]: { isOpen: false } }
        case "closeAll": {
            const hasOpen = Object.values(state).some((e) => e.isOpen)
            if (!hasOpen) return state
            const next: PopoverState = {}
            for (const id of Object.keys(state)) {
                next[id] = { isOpen: false }
            }
            return next
        }
        default:
            return state
    }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export type PopoverStoreValue = {
    open: (id: string) => void
    close: (id: string) => void
    closeAll: () => void
    isOpen: (id: string) => boolean
    register: (id: string, setOpen: Dispatch<SetStateAction<boolean>>) => void
    unregister: (id: string) => void
}

export const PopoverStoreContext = createContext<PopoverStoreValue | null>(null)

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function usePopoverStore(): PopoverStoreValue {
    const ctx = useContext(PopoverStoreContext)
    if (ctx === null) throw new Error("usePopoverStore must be used within PopoverProvider")
    return ctx
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function PopoverProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {})

    // Mutable map of setOpen callbacks from each PopoverRoot — stored in a ref
    // so changes to these callbacks don't cause a store re-render.
    const setOpenCallbacksRef = useRef<Record<string, Dispatch<SetStateAction<boolean>>>>({})

    const open = useCallback((id: string) => {
        dispatch({ type: "open", id })
        setOpenCallbacksRef.current[id]?.(true)
    }, [])

    const close = useCallback((id: string) => {
        dispatch({ type: "close", id })
        setOpenCallbacksRef.current[id]?.(false)
    }, [])

    const closeAll = useCallback(() => {
        dispatch({ type: "closeAll" })
        for (const setter of Object.values(setOpenCallbacksRef.current)) {
            setter(false)
        }
    }, [])

    const isOpen = useCallback((id: string) => state[id]?.isOpen ?? false, [state])

    const register = useCallback((id: string, setOpen: Dispatch<SetStateAction<boolean>>) => {
        dispatch({ type: "register", id })
        setOpenCallbacksRef.current[id] = setOpen
    }, [])

    const unregister = useCallback((id: string) => {
        dispatch({ type: "unregister", id })
        delete setOpenCallbacksRef.current[id]
    }, [])

    const value = useMemo(
        () => ({ open, close, closeAll, isOpen, register, unregister }),
        [open, close, closeAll, isOpen, register, unregister],
    )

    // Close all open popovers when the user clicks outside any popover/trigger
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const target = e.target as HTMLElement
            if (
                target.closest("[data-popover-content]") === null &&
                target.closest("[data-popover-trigger]") === null
            ) {
                dispatch({ type: "closeAll" })
                for (const setter of Object.values(setOpenCallbacksRef.current)) {
                    setter(false)
                }
            }
        }
        document.addEventListener("click", handleClick, true)
        return () => document.removeEventListener("click", handleClick, true)
    }, [])

    // Close all open popovers on Escape
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                dispatch({ type: "closeAll" })
                for (const setter of Object.values(setOpenCallbacksRef.current)) {
                    setter(false)
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    return <PopoverStoreContext.Provider value={value}>{children}</PopoverStoreContext.Provider>
}
