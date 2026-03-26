import { Fragment, Suspense } from "react"
import { CircularLoader } from "@arrhes/ui"
import { DataProvider } from "./data/dataProvider.js"
import { RouterProvider } from "./router/routerProvider.js"

export function RootProvider() {
    return (
        <Fragment>
            <DataProvider>
                <Suspense fallback={<CircularLoader text="Chargement..." />}>
                    <RouterProvider />
                </Suspense>
            </DataProvider>
        </Fragment>
    )
}
