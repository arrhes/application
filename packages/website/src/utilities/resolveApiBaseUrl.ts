export function resolveApiBaseUrl(configuredApiBaseUrl: string | undefined) {
    if (typeof window === "undefined") {
        return configuredApiBaseUrl
    }

    const protocol = window.location.protocol
    const hostname = window.location.hostname

    if (hostname === "website.localhost") {
        return `${protocol}//api.localhost`
    }
    if (hostname === "website.arrhes.localhost") {
        return `${protocol}//api.arrhes.localhost`
    }

    return configuredApiBaseUrl
}
