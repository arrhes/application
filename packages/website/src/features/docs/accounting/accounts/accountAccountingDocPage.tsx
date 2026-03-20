import { useParams } from "@tanstack/react-router"
import { lazy, Suspense } from "react"
import { AccountNotFound } from "./components/accountNotFound.js"
import { accountPageRegistry } from "./components/accountPageRegistry.js"

const lazyPages = new Map<string, React.LazyExoticComponent<React.ComponentType>>()

function getLazyPage(slug: string) {
    const existing = lazyPages.get(slug)
    if (existing) return existing

    const entry = accountPageRegistry[slug]
    if (!entry) return null

    const LazyComponent = lazy(async () => {
        const mod = await entry.loader()
        return { default: mod[entry.exportName] as React.ComponentType }
    })

    lazyPages.set(slug, LazyComponent)
    return LazyComponent
}

export function AccountAccountingDocPage() {
    const { account: slug } = useParams({ strict: false }) as { account: string }
    const LazyPage = getLazyPage(slug)

    if (!LazyPage) {
        return <AccountNotFound />
    }

    return (
        <Suspense>
            <LazyPage />
        </Suspense>
    )
}
