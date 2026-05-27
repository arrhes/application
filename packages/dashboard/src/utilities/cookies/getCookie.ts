export function getCookie(name: string) {
    if (typeof document === "undefined") return undefined
    const encodedName = encodeURIComponent(name)
    const stringCookies = document?.cookie?.split("; ")
    const cookie = stringCookies?.find((x) => x.startsWith(`${encodedName}=`))

    if (!cookie) return undefined

    const rawCookieValue = cookie.slice(encodedName.length + 1)
    if (rawCookieValue === "") return undefined

    return decodeURIComponent(rawCookieValue)
}
