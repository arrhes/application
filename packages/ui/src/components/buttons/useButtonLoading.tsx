import { use } from "react"
import { ButtonLoadingContext } from "./buttonLoadingContext.js"

/**
 * Hook to access the loading state from a parent Button
 * Returns false if not within a Button context
 */
export function useButtonLoading() {
    return use(ButtonLoadingContext)
}
