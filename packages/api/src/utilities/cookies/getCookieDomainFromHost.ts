export function getCookieDomainFromHost(parameters: {
    hostHeader: string | undefined
    fallbackDomain: string
}) {
    const host = (parameters.hostHeader ?? "").trim().toLowerCase()
    const hostname = host.split(":")[0]

    if (hostname.endsWith(".arrhes.localhost") || hostname === "arrhes.localhost") {
        return "arrhes.localhost"
    }

    if (hostname.endsWith(".localhost") || hostname === "localhost") {
        return "localhost"
    }

    return parameters.fallbackDomain
}
