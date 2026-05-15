const sizes = [
    "o",
    "ko",
    "Mo",
    "Go",
    "To",
]

export function formatFileSize(size?: number | null) {
    if (size === undefined || size === null) return "/"

    if (size === 0) return `0 ${sizes.at(0)}`
    const i = Math.floor(Math.log(size) / Math.log(1000))
    return `${parseFloat((size / 1000 ** i).toFixed(2))} ${sizes.at(i)}`
}
