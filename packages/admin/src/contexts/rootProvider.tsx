import { CircularLoader } from "@arrhes/ui"
import { Suspense } from "react"
import { DataProvider } from "./data/dataProvider.js"
import { RouterProvider } from "./router/routerProvider.js"

export function RootProvider() {
    return (
        <DataProvider>
            <Suspense fallback={<CircularLoader text="Chargement..." />}>
                <RouterProvider />
            </Suspense>
        </DataProvider>
    )
}
