export function getCookieDomainFromHost(parameters: { hostHeader: string | undefined; fallbackDomain: string }) {
    const host = (parameters.hostHeader ?? "").trim().toLowerCase()
    const hostname = host.split(":")[0]

    if (hostname.endsWith(".comptasse.localhost") || hostname === "comptasse.localhost") {
        return "comptasse.localhost"
    }

    if (hostname.endsWith(".localhost") || hostname === "localhost") {
        return "localhost"
    }

    return parameters.fallbackDomain
}
