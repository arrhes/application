import { useState } from "react"

export function useCollapsibleState(
    pathname: string,
    isMatch: boolean,
): [
    boolean,
    (value: boolean) => void,
] {
    const [expanded, setExpanded] = useState(isMatch)
    const [prevPathname, setPrevPathname] = useState(pathname)

    if (prevPathname !== pathname) {
        setPrevPathname(pathname)
        if (isMatch) {
            setExpanded(true)
        }
    }

    return [
        expanded,
        setExpanded,
    ]
}
