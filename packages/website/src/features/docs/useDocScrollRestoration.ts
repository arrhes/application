import { useRouterState } from "@tanstack/react-router"
import { type RefObject, useLayoutEffect, useRef } from "react"

// In-memory, client-side only: lives for the tab's JavaScript lifetime, so it is
// naturally reset on a browser refresh/reload but persists across SPA navigations.
const visitedDocPages = new Map<string, number>()

export function useDocScrollRestoration(containerRef: RefObject<HTMLElement | null>) {
    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    })
    const prevPathnameRef = useRef<string | undefined>(undefined)

    useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return

        const prevPathname = prevPathnameRef.current
        if (prevPathname && prevPathname !== pathname) {
            visitedDocPages.set(prevPathname, container.scrollTop)
        }

        const saved = visitedDocPages.get(pathname)
        container.scrollTop = saved ?? 0
        prevPathnameRef.current = pathname
    }, [
        pathname,
        containerRef,
    ])

    useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return
        const save = () => {
            visitedDocPages.set(pathname, container.scrollTop)
        }
        container.addEventListener("scroll", save)
        save()
        return () => {
            container.removeEventListener("scroll", save)
        }
    }, [
        pathname,
        containerRef,
    ])
}
