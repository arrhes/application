export function capitalizeString(string: string) {
    if (string.length === 0) {
        return string
    }
    const firstLetter = string.charAt(0).toUpperCase()
    const restOfString = string.slice(1)

    return firstLetter + restOfString
}
