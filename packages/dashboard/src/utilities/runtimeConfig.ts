export type RuntimeConfig = {
    apiBaseUrl?: string
}

export function getRuntimeConfig(): RuntimeConfig {
    return (
        (
            globalThis as {
                __COMPTASSE_CONFIG__?: RuntimeConfig
            }
        ).__COMPTASSE_CONFIG__ ?? {}
    )
}
