import { CircularLoader, ModalProvider, PopoverProvider, ToasterProvider } from "@comptasse/ui"
import { Fragment, Suspense } from "react"
import { DataProvider } from "./data/DataProvider.js"
import { RouterProvider } from "./router/RouterProvider.js"

export function RootProvider() {
    return (
        <Fragment>
            <ToasterProvider />
            <ModalProvider>
                <PopoverProvider>
                    <DataProvider>
                        <Suspense fallback={<CircularLoader text="Chargement de l'application..." />}>
                            <RouterProvider />
                        </Suspense>
                    </DataProvider>
                </PopoverProvider>
            </ModalProvider>
        </Fragment>
    )
}
