import type { returnedSchemas } from "@arrhes/application-metadata"
import { Button, ButtonOutlineContent, CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCode, IconTable } from "@tabler/icons-react"
import { useEffect, useMemo, useState } from "react"
import type * as v from "valibot"
import { parseInvoiceSummary } from "../../../../facturation/parseInvoiceSummary.ts"
import { ValidEN16931XML } from "../../../../facturation/ValidEN16931XML.tsx"
import { XMLHeader } from "../../../../facturation/XMLHeader.tsx"
import { XMLTable } from "../../../../facturation/XMLTable.tsx"
import { getInvoiceXmlContent } from "./getInvoiceXmlContent.ts"

function createPrettyXml(xml: string) {
    const parser = new DOMParser()
    const document = parser.parseFromString(xml, "application/xml")
    const serializer = new XMLSerializer()
    const compact = serializer.serializeToString(document)
    return compact.replace(/></g, ">\n<")
}

export function InvoiceXMLViewer(props: {
    invoice: v.InferOutput<typeof returnedSchemas.invoice>
}) {
    const [xmlContent, setXmlContent] = useState("")
    const [isRawView, setIsRawView] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        async function loadXml() {
            if (props.invoice.xmlStorageKey === null) {
                setErrorMessage("Le XML n'est pas encore disponible")
                setIsLoading(false)
                return
            }

            setIsLoading(true)
            setErrorMessage(null)

            const result = await getInvoiceXmlContent(props.invoice.id)
            if (abortController.signal.aborted) {
                return
            }

            if (!result.ok) {
                setErrorMessage(result.errorMessage)
                setIsLoading(false)
                return
            }

            setXmlContent(result.xmlContent)
            setIsLoading(false)
        }

        void loadXml()

        return () => {
            abortController.abort()
        }
    }, [props.invoice.id, props.invoice.xmlStorageKey])

    const parsed = useMemo(() => parseInvoiceSummary(xmlContent), [xmlContent])
    const prettyXmlContent = useMemo(() => createPrettyXml(xmlContent), [xmlContent])

    if (isLoading === true) {
        return (
            <CircularLoader text="Chargement du XML..." />
        )
    }
    if (errorMessage !== null) {
        return (
            <div
                className={css({
                    border: "1px solid",
                    borderColor: "danger/30",
                    borderRadius: "md",
                    backgroundColor: "danger/5",
                    color: "danger",
                    padding: "0.75rem",
                    fontSize: "sm",
                    whiteSpace: "pre-wrap",
                })}
            >
                {errorMessage}
            </div>
        )
    }
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <div className={css({ display: "flex", justifyContent: "flex-end" })}>
                <Button onClick={() => setIsRawView((value) => !value)}>
                    <ButtonOutlineContent
                        leftIcon={isRawView ? <IconTable /> : <IconCode />}
                        text={isRawView ? "Voir sous forme de tableau" : "Voir le XML brut"}
                    />
                </Button>
            </div>

            {isRawView ? (
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
                        lineHeight: "1.6",
                        color: "neutral",
                        overflowX: "auto",
                    })}
                >
                    {prettyXmlContent}
                </pre>
            ) : null}

            {isRawView
                ? null
                : parsed.isValid
                    ? (
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            })}
                        >
                            <ValidEN16931XML xmlContent={xmlContent} />
                            <XMLHeader xmlContent={xmlContent} />
                            <XMLTable xmlContent={xmlContent} />
                        </div>
                    )
                    : (
                        <div
                            className={css({
                                border: "1px solid",
                                borderColor: "danger/30",
                                borderRadius: "md",
                                backgroundColor: "danger/5",
                                color: "danger",
                                padding: "0.75rem",
                                fontSize: "sm",
                            })}
                        >
                            Impossible d'interpréter ce XML comme une facture UBL.
                        </div>
                    )}
        </div>
    )
}
