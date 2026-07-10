import {
    readUserSessionRouteDefinition,
    updateUserLlmCredentialsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, InputPassword, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconAlertCircle, IconDeviceFloppy, IconExternalLink } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { Block } from "../../../components/layouts/block/block.js"
import { DataWrapper } from "../../../components/layouts/DataWrapper.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

type FieldKey = "llmApiKey" | "llmBaseUrl" | "llmModel" | "ocrEndpoint" | "ocrApiKey" | "ocrModel"

const fieldLabels: Record<FieldKey, string> = {
    llmApiKey: "Clé API LLM",
    llmBaseUrl: "URL de base LLM",
    llmModel: "Modèle LLM",
    ocrEndpoint: "Endpoint OCR",
    ocrApiKey: "Clé API OCR",
    ocrModel: "Modèle OCR",
}

const fieldPlaceholders: Partial<Record<FieldKey, string>> = {
    llmBaseUrl: "https://api.mistral.ai/v1",
    ocrEndpoint: "https://api.mistral.ai/v1",
}

const fieldDescriptions: Partial<Record<FieldKey, string>> = {
    ocrApiKey: "Si laissé vide, la clé API LLM sera utilisée.",
}

const requiredFields: FieldKey[] = [
    "llmApiKey",
    "llmBaseUrl",
]

function isPasswordField(key: FieldKey): boolean {
    return key === "llmApiKey" || key === "ocrApiKey"
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
    const isRequired = requiredFields.includes(fieldKey)

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
                {isRequired && (
                    <span
                        className={css({
                            color: "danger",
                        })}
                    >
                        {" "}
                        *
                    </span>
                )}
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
            {fieldDescriptions[fieldKey] && (
                <span
                    className={css({
                        fontSize: "xs",
                        color: "fg.muted",
                    })}
                >
                    {fieldDescriptions[fieldKey]}
                </span>
            )}
        </div>
    )
}

function CredentialsBlock({
    title,
    fields,
    initialValues,
    onSave,
}: {
    title: string
    fields: FieldKey[]
    initialValues: Record<string, string | null | undefined>
    onSave: (values: Record<string, string>) => Promise<void>
}) {
    const initialSnap = fields.map((k) => `${k}:${initialValues[k] ?? ""}`).join("|")
    const [values, setValues] = useState<Record<string, string>>(() => {
        const init: Record<string, string> = {}
        for (const key of fields) {
            init[key] = initialValues[key] ?? ""
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
        const changed: Record<string, string> = {}
        for (const key of fields) {
            if (values[key] !== (initialValues[key] ?? "")) {
                changed[key] = values[key]
            }
        }
        if (Object.keys(changed).length === 0) {
            setIsSaving(false)
            return
        }
        if (changed.ocrApiKey === "") {
            changed.ocrApiKey = undefined as unknown as string
        }
        await onSave(changed)
        setIsSaving(false)
    }

    return (
        <Block.Root>
            <Block.Header title={title} />
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

const llmSpecsLink = "https://platform.openai.com/docs/api-reference/chat"

export function UserLlmCredentialsPage() {
    async function saveBlock(values: Record<string, string>) {
        const body: Record<string, string | null | undefined> = {
            ...values,
        }
        if (body.ocrApiKey === "") {
            body.ocrApiKey = undefined
        }
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateUserLlmCredentialsRouteDefinition,
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
                const missingFields = requiredFields.filter((k) => !user[k])

                return (
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                            padding: "1px",
                        })}
                    >
                        {missingFields.length > 0 && (
                            <div
                                className={css({
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.75rem",
                                    padding: "1rem",
                                    borderRadius: "md",
                                    backgroundColor: "warning/10",
                                    border: "1px solid",
                                    borderColor: "warning/30",
                                    fontSize: "sm",
                                })}
                            >
                                <IconAlertCircle
                                    className={css({
                                        flexShrink: 0,
                                        color: "warning",
                                    })}
                                    size={20}
                                />
                                <span>
                                    Certains identifiants ne sont pas configurés. Renseignez au moins la clé API et
                                    l&apos;URL de base pour utiliser l&apos;assistant IA et l&apos;OCR.
                                </span>
                            </div>
                        )}

                        {/* Specs summary */}
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
                                    Configuration requise
                                </span>
                                <span
                                    className={css({
                                        color: "fg.muted",
                                    })}
                                >
                                    L&apos;assistant nécessite une URL de base et une clé API compatibles OpenAI
                                    (Mistral, OpenAI, Ollama, etc.). L&apos;OCR peut utiliser un endpoint distinct ou
                                    partager la même configuration LLM.
                                </span>
                                <a
                                    href={llmSpecsLink}
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
                                    Voir les spécifications complètes
                                    <IconExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        <CredentialsBlock
                            title="Assistant IA"
                            fields={[
                                "llmBaseUrl",
                                "llmApiKey",
                                "llmModel",
                            ]}
                            initialValues={user}
                            onSave={saveBlock}
                        />

                        <CredentialsBlock
                            title="OCR"
                            fields={[
                                "ocrEndpoint",
                                "ocrApiKey",
                                "ocrModel",
                            ]}
                            initialValues={user}
                            onSave={saveBlock}
                        />
                    </div>
                )
            }}
        </DataWrapper>
    )
}
