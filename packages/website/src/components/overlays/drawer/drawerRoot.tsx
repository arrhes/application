import { createContext, type JSX, useContext } from "react"

type DrawerContextType = {
    open: boolean
    setOpen: (open: boolean) => void
}

const DrawerContext = createContext<DrawerContextType | null>(null)

export function useDrawerContext() {
    const context = useContext(DrawerContext)
    if (context === null) {
        throw new Error("useDrawerContext must be used within a DrawerRoot")
    }
    return context
}

export function DrawerRoot(props: {
    open: boolean
    onOpenChange: (open: boolean) => void
    children: JSX.Element | JSX.Element[]
}) {
    return (
        <DrawerContext.Provider
            value={{
                open: props.open,
                setOpen: props.onOpenChange,
            }}
        >
            {props.children}
        </DrawerContext.Provider>
    )
}
