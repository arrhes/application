import { CircularLoader } from "@arrhes/ui"
import { Fragment, Suspense } from "react"
import { DataProvider } from "./data/dataProvider.js"
import { RouterProvider } from "./router/routerProvider.js"
import { ToasterProvider } from "./toasts/toastProvider.js"

export function RootProvider() {
    return (
        <Fragment>
            <ToasterProvider />
            <DataProvider>
                <Suspense fallback={<CircularLoader text="Application loading..." />}>
                    <RouterProvider />
                </Suspense>
            </DataProvider>
        </Fragment>
    )
}
