import { useEffect, useState } from "react"

export function useDeviceDetect() {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768 || window.outerWidth < 768)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768 || window.outerWidth < 768)
        }
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return {
        isMobile,
    }
}
