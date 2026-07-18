import type { ReactNode } from "react"
import { useCallback, useEffect, useState } from "react"
import { SidebarContext } from "./SidebarContext.js"

const SIDEBAR_OPEN_KEY = "arrhes:sidebar-open"
const SIDEBAR_WIDTH_KEY = "arrhes:sidebar-width"
const DEFAULT_WIDTH = 280
const MIN_WIDTH = 200
const MAX_WIDTH = 480

function readStorage(key: string, fallback: string): string {
    try {
        return localStorage.getItem(key) ?? fallback
    } catch {
        return fallback
    }
}

function writeStorage(key: string, value: string): void {
    try {
        localStorage.setItem(key, value)
    } catch {}
}

export function SidebarContextProvider({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(() => readStorage(SIDEBAR_OPEN_KEY, "true") === "true")
    const [width, setWidthValue] = useState(() => {
        const raw = readStorage(SIDEBAR_WIDTH_KEY, String(DEFAULT_WIDTH))
        const parsed = Number.parseInt(raw, 10)
        return Number.isNaN(parsed) ? DEFAULT_WIDTH : Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, parsed))
    })

    useEffect(() => {
        writeStorage(SIDEBAR_OPEN_KEY, String(open))
    }, [open])

    useEffect(() => {
        writeStorage(SIDEBAR_WIDTH_KEY, String(width))
    }, [width])

    const toggle = useCallback(() => {
        setOpen((prev) => !prev)
    }, [])

    const setWidth = useCallback((newWidth: number) => {
        setWidthValue(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth)))
    }, [])

    return (
        <SidebarContext.Provider
            value={{
                open,
                width,
                toggle,
                setWidth,
            }}
        >
            {children}
        </SidebarContext.Provider>
    )
}
