export function formatSelect(
    key: string | null | undefined,
    options: {
        key: string
        label: string
    }[],
) {
    return options.find((x) => x.key === key)?.label ?? ""
}
