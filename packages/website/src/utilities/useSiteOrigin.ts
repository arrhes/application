import { useEffect, useState } from "react"

const DEFAULT_ORIGIN = "https://comptasse.com"

export function useSiteOrigin() {
    const [origin, setOrigin] = useState(DEFAULT_ORIGIN)

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    return origin
}
