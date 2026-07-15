import {
    readUserSessionRouteDefinition,
    updateUserOcrCredentialsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, InputPassword, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDeviceFloppy, IconExternalLink } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { Block } from "../../../components/layouts/block/block.js"
import { DataWrapper } from "../../../components/layouts/DataWrapper.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

type FieldKey = "ocrEndpoint" | "ocrApiKey" | "ocrModel"

const fieldLabels: Record<FieldKey, string> = {
    ocrEndpoint: "Endpoint OCR",
    ocrApiKey: "Clé API OCR",
    ocrModel: "Modèle OCR",
}

const fieldPlaceholders: Partial<Record<FieldKey, string>> = {
    ocrEndpoint: "https://api.mistral.ai/v1/ocr",
    ocrModel: "mistral-ocr-latest",
}

function isPasswordField(key: FieldKey): boolean {
    return key === "ocrApiKey"
}

function FieldInput({
    fieldKey,
    value,
    onChange,
}: {
    fieldKey: FieldKey
    value: string
    onChange: (v: string) => void
}) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                width: "100%",
            })}
        >
            <span
                className={css({
                    fontSize: "sm",
                    fontWeight: "medium",
                    color: "fg.muted",
                })}
            >
                {fieldLabels[fieldKey]}
            </span>
            {isPasswordField(fieldKey) ? (
                <InputPassword
                    value={value}
                    onChange={(v) => onChange(v ?? "")}
                />
            ) : (
                <InputText
                    value={value}
                    onChange={(v) => onChange(v ?? "")}
                    placeholder={fieldPlaceholders[fieldKey]}
                />
            )}
        </div>
    )
}

const ocrSpecsLink = "https://docs.mistral.ai/capabilities/document/"

export function UserOcrCredentialsPage() {
    async function save(values: Record<FieldKey, string>) {
        const body: Record<string, string | null | undefined> = {
            ...values,
        }
        if (body.ocrApiKey === "") {
            body.ocrApiKey = undefined
        }
        if (body.ocrEndpoint === "") {
            body.ocrEndpoint = undefined
        }
        if (body.ocrModel === "") {
            body.ocrModel = undefined
        }
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateUserOcrCredentialsRouteDefinition,
            body,
        })
        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Impossible d'enregistrer les modifications",
                variant: "error",
            })
            return
        }
        await invalidateData({
            routeDefinition: readUserSessionRouteDefinition,
            body: {},
        })
        toast({
            title: "Modifications enregistrées",
            variant: "success",
        })
    }

    return (
        <DataWrapper
            routeDefinition={readUserSessionRouteDefinition}
            body={{}}
        >
            {(userSession) => {
                const user = userSession.user as v.InferOutput<typeof returnedSchemas.user> &
                    Record<string, string | null | undefined>

                return (
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                            padding: "1px",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "0.75rem",
                                padding: "1rem",
                                borderRadius: "md",
                                backgroundColor: "accent/5",
                                border: "1px solid",
                                borderColor: "accent/15",
                                fontSize: "sm",
                                lineHeight: "1.5",
                            })}
                        >
                            <div
                                className={css({
                                    flex: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "0.25rem",
                                })}
                            >
                                <span
                                    className={css({
                                        fontWeight: "bold",
                                        color: "fg.default",
                                    })}
                                >
                                    Configuration OCR (BYOK)
                                </span>
                                <span
                                    className={css({
                                        color: "fg.muted",
                                    })}
                                >
                                    Arrhes n&apos;inclut pas d&apos;agent IA intégré. Vous pouvez utiliser votre propre
                                    agent via l&apos;API/CLI. Configurez ici vos identifiants OCR pour extraire le texte
                                    de vos documents directement dans Arrhes.
                                </span>
                                <a
                                    href={ocrSpecsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={css({
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.25rem",
                                        color: "primary",
                                        textDecoration: "underline",
                                        marginTop: "0.25rem",
                                        fontSize: "xs",
                                    })}
                                >
                                    Voir la documentation Mistral OCR
                                    <IconExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        <CredentialsBlock
                            user={user}
                            onSave={save}
                        />
                    </div>
                )
            }}
        </DataWrapper>
    )
}

function CredentialsBlock({
    user,
    onSave,
}: {
    user: Record<string, string | null | undefined>
    onSave: (values: Record<FieldKey, string>) => Promise<void>
}) {
    const fields: FieldKey[] = [
        "ocrEndpoint",
        "ocrApiKey",
        "ocrModel",
    ]
    const initialSnap = fields.map((k) => `${k}:${user[k] ?? ""}`).join("|")
    const [values, setValues] = useState<Record<FieldKey, string>>(() => {
        const init: Record<FieldKey, string> = {
            ocrEndpoint: "",
            ocrApiKey: "",
            ocrModel: "",
        }
        for (const key of fields) {
            init[key] = user[key] ?? ""
        }
        return init
    })
    const [isSaving, setIsSaving] = useState(false)

    const valuesSnap = fields.map((k) => `${k}:${values[k] ?? ""}`).join("|")
    const hasChanges = valuesSnap !== initialSnap

    function updateValue(key: FieldKey, value: string) {
        setValues((prev) => ({
            ...prev,
            [key]: value,
        }))
    }

    async function handleSave() {
        setIsSaving(true)
        await onSave(values)
        setIsSaving(false)
    }

    return (
        <Block.Root>
            <Block.Header title="OCR" />
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.5rem",
                })}
            >
                {fields.map((key) => (
                    <FieldInput
                        key={key}
                        fieldKey={key}
                        value={values[key] ?? ""}
                        onChange={(v) => updateValue(key, v)}
                    />
                ))}
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "flex-end",
                        paddingTop: "0.5rem",
                    })}
                >
                    <Button
                        onClick={handleSave}
                        isDisabled={!hasChanges || isSaving}
                        className={
                            !hasChanges || isSaving
                                ? undefined
                                : css.raw({
                                      borderColor: "primary",
                                      backgroundColor: "primary/10",
                                  })
                        }
                    >
                        <ButtonOutlineContent
                            leftIcon={isSaving ? undefined : <IconDeviceFloppy />}
                            text={isSaving ? "Enregistrement..." : "Enregistrer"}
                        />
                    </Button>
                </div>
            </div>
        </Block.Root>
    )
}
