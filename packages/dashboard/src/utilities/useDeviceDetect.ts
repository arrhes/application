import { useEffect, useState } from "react"

export function useDeviceDetect() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (!window) return

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768 || window.outerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return {
        isMobile,
    }
}
