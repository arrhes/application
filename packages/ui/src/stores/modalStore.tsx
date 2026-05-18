import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ModalEntry = {
    content: ReactNode
    isOpen: boolean
}

type ModalState = Record<string, ModalEntry>

type ModalAction =
    | {
          type: "open"
          id: string
          content: ReactNode
      }
    | {
          type: "close"
          id: string
      }

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(state: ModalState, action: ModalAction): ModalState {
    switch (action.type) {
        case "open":
            return {
                ...state,
                [action.id]: {
                    content: action.content,
                    isOpen: true,
                },
            }
        case "close": {
            const entry = state[action.id]
            if (entry === undefined) return state
            return {
                ...state,
                [action.id]: {
                    ...entry,
                    isOpen: false,
                },
            }
        }
        default:
            return state
    }
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

export type ModalStoreValue = {
    open: (id: string, content: ReactNode) => void
    close: (id: string) => void
    isOpen: (id: string) => boolean
}

export const ModalStoreContext = createContext<ModalStoreValue | null>(null)

/** Provided by ModalProvider around each rendered modal entry so sub-components
 *  (DialogHeader close button) can close the modal without needing to know its id. */
export const ModalItemContext = createContext<{
    closeModal: () => void
} | null>(null)

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useModalStore(): ModalStoreValue {
    const ctx = useContext(ModalStoreContext)
    if (ctx === null) throw new Error("useModalStore must be used within ModalProvider")
    return ctx
}

export function useModalItem() {
    return useContext(ModalItemContext)
}

// ---------------------------------------------------------------------------
// ModalItem — one native <dialog> per modal entry
// ---------------------------------------------------------------------------

function ModalItem({ id, entry, close }: { id: string; entry: ModalEntry; close: (id: string) => void }) {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (dialog === null) return
        if (entry.isOpen) {
            if (!dialog.open) dialog.showModal()
        } else {
            if (dialog.open) dialog.close()
        }
    }, [
        entry.isOpen,
    ])

    function handleCancel(e: React.SyntheticEvent) {
        e.preventDefault()
        close(id)
    }

    function handleClick(e: React.MouseEvent<HTMLDivElement>) {
        // Clicks on the centering wrapper itself = click in the backdrop area
        if (e.target === wrapperRef.current) {
            close(id)
        }
    }

    return (
        /*
         * The <dialog> UA styles are reset inline so we own the full layout.
         * ::backdrop is styled via the injected <style> in ModalProvider.
         * The inner div is the flex centering container; DialogContent renders as the white card.
         */
        <dialog
            ref={dialogRef}
            aria-modal="true"
            onCancel={handleCancel}
            style={{
                border: "none",
                padding: 0,
                background: "transparent",
                maxWidth: "none",
                maxHeight: "none",
                width: "100vw",
                height: "100dvh",
                overflow: "hidden",
            }}
        >
            <div
                ref={wrapperRef}
                onClick={handleClick}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                }}
            >
                <ModalItemContext.Provider
                    value={{
                        closeModal: () => close(id),
                    }}
                >
                    {entry.content}
                </ModalItemContext.Provider>
            </div>
        </dialog>
    )
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function ModalProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {})

    const open = useCallback((id: string, content: ReactNode) => {
        dispatch({
            type: "open",
            id,
            content,
        })
    }, [])

    const close = useCallback((id: string) => {
        dispatch({
            type: "close",
            id,
        })
    }, [])

    const isOpen = useCallback(
        (id: string) => state[id]?.isOpen ?? false,
        [
            state,
        ],
    )

    const value = useMemo(
        () => ({
            open,
            close,
            isOpen,
        }),
        [
            open,
            close,
            isOpen,
        ],
    )

    return (
        <ModalStoreContext.Provider value={value}>
            {/* Backdrop CSS — injected once for all modals */}
            <style>{`dialog[aria-modal="true"]::backdrop { background-color: rgba(0,0,0,0.12); }`}</style>
            {children}
            {Object.entries(state).map(([id, entry]) => (
                <ModalItem
                    key={id}
                    id={id}
                    entry={entry}
                    close={close}
                />
            ))}
        </ModalStoreContext.Provider>
    )
}
