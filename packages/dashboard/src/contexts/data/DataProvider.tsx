import { QueryClientProvider } from "@tanstack/react-query"
import type { ReactNode } from "react"
import { dataClient } from "./queryClient.js"

export function DataProvider(props: { children: ReactNode }) {
    return <QueryClientProvider client={dataClient}>{props.children}</QueryClientProvider>
}
