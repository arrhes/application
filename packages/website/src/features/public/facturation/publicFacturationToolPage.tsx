import { Button, ButtonOutlineContent, InputText, InputTextArea } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFileUpload, IconLink, IconTextPlus } from "@tabler/icons-react"
import { useState } from "react"
import { UblInvoiceViewer } from "../../facturation/ublInvoiceViewer.js"

export function PublicFacturationToolPage() {
    const [xmlInput, setXmlInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [error, setError] = useState<string | null>(null)

    async function handleFileUpload(file: File | null) {
        if (!file) return
        setError(null)

        try {
            const text = await file.text()
            setXmlInput(text)
        } catch {
            setError("Impossible de lire ce fichier XML.")
        }
    }

    async function loadFromUrl() {
        if (!urlInput.trim()) return
        setError(null)

        try {
            const response = await fetch(urlInput.trim(), { method: "GET" })
            const text = await response.text()

            if (!response.ok) {
                throw new Error(text || "Erreur de chargement")
            }

            setXmlInput(text)
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Impossible de charger ce XML depuis l'URL.")
        }
    }

    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                paddingX: "1rem",
                paddingY: "1.5rem",
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
                <div className={css({ display: "flex", flexDirection: "column", gap: "0.35rem" })}>
                    <h1 className={css({ fontSize: "lg", fontWeight: "semibold", color: "neutral" })}>
                        Outil public facturation UBL
                    </h1>
                    <p className={css({ fontSize: "sm", color: "neutral/70" })}>
                        Déposez un fichier XML, collez son contenu brut, ou chargez-le depuis une URL pour visualiser la
                        facture en mode lisible.
                    </p>
                </div>

                <div
                    className={css({
                        border: "1px solid",
                        borderColor: "neutral/15",
                        borderRadius: "md",
                        backgroundColor: "white",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    })}
                >
                    <label className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                        <span className={css({ fontSize: "sm", color: "neutral" })}>Importer un fichier XML</span>
                        <input
                            type="file"
                            accept=".xml,text/xml,application/xml"
                            onChange={(event) => handleFileUpload(event.target.files?.[0] ?? null)}
                        />
                    </label>

                    <div
                        className={css({
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "0.5rem",
                            flexWrap: "wrap",
                        })}
                    >
                        <div className={css({ flex: 1, minWidth: "16rem" })}>
                            <span className={css({ fontSize: "sm", color: "neutral" })}>Charger depuis une URL</span>
                            <InputText
                                value={urlInput}
                                onChange={(value) => setUrlInput(value ?? "")}
                                placeholder="https://.../facture.xml"
                            />
                        </div>
                        <Button onClick={loadFromUrl}>
                            <ButtonOutlineContent leftIcon={<IconLink />} text="Charger" />
                        </Button>
                    </div>

                    <div className={css({ display: "flex", flexDirection: "column", gap: "0.4rem" })}>
                        <span className={css({ fontSize: "sm", color: "neutral" })}>Ou coller le XML brut</span>
                        <InputTextArea
                            value={xmlInput}
                            onChange={(value) => setXmlInput(value ?? "")}
                            placeholder="Collez ici une facture UBL XML..."
                        />
                    </div>

                    <div className={css({ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" })}>
                        <Button
                            onClick={() => {
                                setXmlInput("")
                                setError(null)
                            }}
                        >
                            <ButtonOutlineContent leftIcon={<IconTextPlus />} text="Réinitialiser" />
                        </Button>
                        <Button
                            onClick={() => {
                                const blob = new Blob([xmlInput], { type: "application/xml;charset=utf-8" })
                                const objectUrl = URL.createObjectURL(blob)
                                const anchor = document.createElement("a")
                                anchor.href = objectUrl
                                anchor.download = "facture.xml"
                                document.body.append(anchor)
                                anchor.click()
                                anchor.remove()
                                URL.revokeObjectURL(objectUrl)
                            }}
                            isDisabled={xmlInput.trim().length === 0}
                        >
                            <ButtonOutlineContent leftIcon={<IconFileUpload />} text="Exporter le XML" />
                        </Button>
                    </div>
                </div>

                {error && (
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
                        {error}
                    </div>
                )}

                {xmlInput.trim().length > 0 && (
                    <UblInvoiceViewer xmlContent={xmlInput} title="Aperçu facture UBL" downloadFileName="facture.xml" />
                )}
            </div>
        </div>
    )
}
