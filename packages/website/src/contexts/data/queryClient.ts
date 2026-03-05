import { QueryClient } from "@tanstack/react-query"

export const dataClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 30 * 1000,
        },
    },
})
