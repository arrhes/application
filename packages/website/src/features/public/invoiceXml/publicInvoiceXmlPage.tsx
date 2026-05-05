import { CircularLoader, Logo } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useParams } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { publicInvoiceXmlRoute } from "../../../routes/root/publicInvoiceXmlRoute.js"

export function PublicInvoiceXmlPage() {
    const { invoiceNumber } = useParams({ from: publicInvoiceXmlRoute.id })

    const [isLoading, setIsLoading] = useState(true)
    const [xmlContent, setXmlContent] = useState("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
        if (!apiBaseUrl) {
            setIsLoading(false)
            setErrorMessage("VITE_API_BASE_URL is not configured.")
            return
        }

        const abortController = new AbortController()

        async function loadXml() {
            try {
                setIsLoading(true)
                setErrorMessage(null)

                const response = await fetch(
                    `${apiBaseUrl}/public/invoices/${encodeURIComponent(invoiceNumber)}/ubl.xml`,
                    {
                        method: "GET",
                        signal: abortController.signal,
                    },
                )

                const responseText = await response.text()

                if (!response.ok) {
                    throw new Error(responseText || "Unable to load invoice XML")
                }

                setXmlContent(responseText)
            } catch (error: unknown) {
                if (abortController.signal.aborted) {
                    return
                }

                setErrorMessage(error instanceof Error ? error.message : "Unable to load invoice XML")
            } finally {
                setIsLoading(false)
            }
        }

        loadXml()

        return () => {
            abortController.abort()
        }
    }, [invoiceNumber])

    return (
        <div
            className={css({
                minHeight: "100vh",
                width: "100%",
                backgroundColor: "background",
                paddingX: "1rem",
                paddingY: "2rem",
                display: "flex",
                justifyContent: "center",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "5xl",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <Logo />
                    <h1
                        className={css({
                            fontSize: "sm",
                            fontWeight: "semibold",
                            color: "neutral",
                        })}
                    >
                        Facture UBL XML
                    </h1>
                </div>

                <p
                    className={css({
                        fontSize: "xs",
                        color: "neutral/70",
                    })}
                >
                    Reference: {invoiceNumber}
                </p>

                {isLoading && <CircularLoader text="Chargement du XML..." />}

                {!isLoading && errorMessage && (
                    <div
                        className={css({
                            border: "1px solid",
                            borderColor: "error/40",
                            borderRadius: "md",
                            backgroundColor: "error/5",
                            padding: "0.75rem",
                            color: "error",
                            fontSize: "xs",
                            whiteSpace: "pre-wrap",
                        })}
                    >
                        {errorMessage}
                    </div>
                )}

                {!isLoading && !errorMessage && (
                    <pre
                        className={css({
                            margin: 0,
                            border: "1px solid",
                            borderColor: "neutral/20",
                            borderRadius: "md",
                            backgroundColor: "white",
                            padding: "1rem",
                            fontFamily: "mono",
                            fontSize: "xs",
                            lineHeight: "1.5",
                            color: "neutral",
                            overflowX: "auto",
                        })}
                    >
                        {xmlContent}
                    </pre>
                )}
            </div>
        </div>
    )
}
