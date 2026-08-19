import { CircularLoader, ModalProvider, PopoverProvider, ToasterProvider } from "@comptasse/ui"
import { Fragment, Suspense } from "react"
import { RouterProvider } from "./router/RouterProvider.js"

export function RootProvider() {
    return (
        <Fragment>
            <ToasterProvider />
            <ModalProvider>
                <PopoverProvider>
                    <Suspense fallback={<CircularLoader text="Application loading..." />}>
                        <RouterProvider />
                    </Suspense>
                </PopoverProvider>
            </ModalProvider>
        </Fragment>
    )
}
