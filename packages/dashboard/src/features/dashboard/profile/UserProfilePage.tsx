import {
    readUserSessionRouteDefinition,
    updateUserOcrCredentialsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, InputPassword, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDeviceFloppy, IconHome, IconKey, IconMail, IconScan, IconTrash, IconUserShield } from "@tabler/icons-react"
import { Suspense, useState } from "react"
import type * as v from "valibot"
import { Block } from "../../../components/layouts/block/block.tsx"
import { DataWrapper } from "../../../components/layouts/DataWrapper.tsx"
import { SubPageContent } from "../../../components/layouts/SubPageContent.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"
import { DeleteUser } from "./DeleteUser.tsx"
import { UpdateUserEmail } from "./UpdateUserEmail.tsx"
import { UpdateUserPassword } from "./UpdateUserPassword.tsx"

export function UserProfilePage({ subTab }: { subTab?: string } = {}) {
    return (
        <SubPageContent
            defaultKey={subTab ?? "général"}
            sections={{
                profil: {
                    items: [
                        {
                            key: "général",
                            label: "Général",
                            icon: <IconHome />,
                            content: (
                                <Suspense fallback={null}>
                                    <GeneralTab />
                                </Suspense>
                            ),
                        },
                        {
                            key: "sécurité",
                            label: "Sécurité",
                            icon: <IconUserShield />,
                            content: (
                                <Suspense fallback={null}>
                                    <SecurityTab />
                                </Suspense>
                            ),
                        },
                        {
                            key: "ocr",
                            label: "OCR",
                            icon: <IconScan />,
                            content: (
                                <Suspense fallback={null}>
                                    <OcrTab />
                                </Suspense>
                            ),
                        },
                    ],
                },
            }}
        />
    )
}

function GeneralTab() {
    return (
        <DataWrapper
            routeDefinition={readUserSessionRouteDefinition}
            body={{}}
        >
            {(userSession) => (
                <Block.Root>
                    <Block.Header title="Informations du compte" />
                    <Block.Row
                        title="Adresse email"
                        description={userSession.user.email}
                    >
                        <UpdateUserEmail>
                            <Button>
                                <ButtonOutlineContent
                                    leftIcon={<IconMail />}
                                    text="Modifier"
                                />
                            </Button>
                        </UpdateUserEmail>
                    </Block.Row>
                </Block.Root>
            )}
        </DataWrapper>
    )
}

function SecurityTab() {
    return (
        <>
            <Block.Root>
                <Block.Header title="Mot de passe" />
                <Block.Row
                    title="Modifier le mot de passe"
                    description="Mettez à jour le mot de passe de votre compte."
                >
                    <UpdateUserPassword>
                        <Button>
                            <ButtonOutlineContent
                                leftIcon={<IconKey />}
                                text="Modifier"
                            />
                        </Button>
                    </UpdateUserPassword>
                </Block.Row>
            </Block.Root>
            <Block.Root variant="danger">
                <Block.Header title="Zone de danger" variant="danger" />
                <Block.Row
                    title="Supprimer le compte"
                    description="Cette action est irréversible. Toutes vos données seront supprimées."
                    variant="danger"
                >
                    <DeleteUser>
                        <Button>
                            <ButtonOutlineContent
                                leftIcon={<IconTrash />}
                                text="Supprimer"
                                color="danger"
                            />
                        </Button>
                    </DeleteUser>
                </Block.Row>
            </Block.Root>
        </>
    )
}

function OcrTab() {
    return (
        <DataWrapper
            routeDefinition={readUserSessionRouteDefinition}
            body={{}}
        >
            {(userSession) => {
                const user = userSession.user as v.InferOutput<typeof returnedSchemas.user> &
                    Record<string, string | null | undefined>
                return <OcrBlock user={user} />
            }}
        </DataWrapper>
    )
}

function OcrBlock({ user }: { user: Record<string, string | null | undefined> }) {
    const fields: Array<"ocrEndpoint" | "ocrApiKey" | "ocrModel"> = [
        "ocrEndpoint",
        "ocrApiKey",
        "ocrModel",
    ]
    const fieldLabels: Record<string, string> = {
        ocrEndpoint: "Endpoint OCR",
        ocrApiKey: "Clé API OCR",
        ocrModel: "Modèle OCR",
    }
    const fieldPlaceholders: Partial<Record<string, string>> = {
        ocrEndpoint: "https://api.mistral.ai/v1/ocr",
        ocrModel: "mistral-ocr-latest",
    }
    const initialSnap = fields.map((k) => `${k}:${user[k] ?? ""}`).join("|")
    const [values, setValues] = useState<Record<string, string>>(() => {
        const init: Record<string, string> = {
            ocrEndpoint: "",
            ocrApiKey: "",
            ocrModel: "",
        }
        for (const key of fields) init[key] = user[key] ?? ""
        return init
    })
    const [isSaving, setIsSaving] = useState(false)
    const snap = fields.map((k) => `${k}:${values[k] ?? ""}`).join("|")
    const hasChanges = snap !== initialSnap

    async function handleSave() {
        setIsSaving(true)
        const body: Record<string, string | null | undefined> = { ...values }
        if (body.ocrApiKey === "") body.ocrApiKey = undefined
        if (body.ocrEndpoint === "") body.ocrEndpoint = undefined
        if (body.ocrModel === "") body.ocrModel = undefined
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateUserOcrCredentialsRouteDefinition,
            body,
        })
        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Impossible d'enregistrer les modifications",
                variant: "error",
            })
        } else {
            await invalidateData({ routeDefinition: readUserSessionRouteDefinition, body: {} })
            toast({ title: "Modifications enregistrées", variant: "success" })
        }
        setIsSaving(false)
    }

    return (
        <Block.Root>
            <Block.Header
                title="OCR"
                description="Configurez vos identifiants OCR pour extraire le texte de vos documents."
            />
            <div className={css({ display: "flex", flexDirection: "column", gap: "1rem", padding: "1.5rem" })}>
                {fields.map((key) => (
                    <div key={key} className={css({ display: "flex", flexDirection: "column", gap: "0.25rem", width: "100%" })}>
                        <span className={css({ fontSize: "sm", fontWeight: "medium", color: "fg.muted" })}>
                            {fieldLabels[key]}
                        </span>
                        {key === "ocrApiKey" ? (
                            <InputPassword value={values[key] ?? ""} onChange={(v) => setValues((p) => ({ ...p, [key]: v ?? "" }))} />
                        ) : (
                            <InputText value={values[key] ?? ""} onChange={(v) => setValues((p) => ({ ...p, [key]: v ?? "" }))} placeholder={fieldPlaceholders[key]} />
                        )}
                    </div>
                ))}
                <div className={css({ display: "flex", justifyContent: "flex-end", paddingTop: "0.5rem" })}>
                    <Button onClick={handleSave} isDisabled={!hasChanges || isSaving}>
                        <ButtonOutlineContent leftIcon={isSaving ? undefined : <IconDeviceFloppy />} text={isSaving ? "Enregistrement..." : "Enregistrer"} />
                    </Button>
                </div>
            </div>
        </Block.Root>
    )
}
