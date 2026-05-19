import { createContext, useContext } from "react"
import type { applicationRouter } from "../../routes/applicationRouter.js"

type OuterRouter = typeof applicationRouter

const OuterRouterContext = createContext<OuterRouter | null>(null)

export const OuterRouterProvider = OuterRouterContext.Provider

export function useOuterRouter(): OuterRouter {
    const router = useContext(OuterRouterContext)
    if (router === null) {
        throw new Error("useOuterRouter must be used within an OuterRouterProvider")
    }
    return router
}
