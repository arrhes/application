import { useContext } from "react"
import { ButtonLoadingContext } from "./Button.js"

/**
 * Hook to access the loading state from a parent Button
 * Returns false if not within a Button context
 */
export function useButtonLoading() {
    return useContext(ButtonLoadingContext)
}
