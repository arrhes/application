import { useCallback } from "react"
import {
    readOneOrganizationRouteDefinition,
    updateOrganizationStorageCredentialsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, formatFileSize, InputPassword, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDeviceFloppy } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { useState } from "react"
import type * as v from "valibot"
import { Block } from "../../../../components/layouts/block/block.tsx"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function OrganizationStorageCredentialsPage({
    idOrganization: idOrganizationProp,
}: {
    idOrganization?: string
} = {}) {
    const params = useParams({
        strict: false,
    }) as {
        idOrganization?: string
    }
    const idOrganization = idOrganizationProp ?? params.idOrganization ?? ""

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readOneOrganizationRouteDefinition}
                    body={{
                        idOrganization,
                    }}
                >
                    {(organization) => {
                        const org = organization as v.InferOutput<typeof returnedSchemas.organization>
                        return (
                            <>
                                <Block.Root>
                                    <Block.Header title="Stockage" />
                                    <Block.Row
                                        title="Espace utilisé"
                                        description={formatFileSize(org.storageCurrentUsage)}
                                    />
                                </Block.Root>
                                <StorageCredentialsBlock
                                    idOrganization={idOrganization}
                                    org={org}
                                />
                            </>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}

function StorageCredentialsBlock({
    idOrganization,
    org,
}: {
    idOrganization: string
    org: Record<string, string | null | undefined>
}) {
    interface FieldDef {
        key: string
        label: string
        isPassword?: boolean
    }
    const fields: FieldDef[] = [
        { key: "storageEndpoint", label: "Endpoint" },
        { key: "storageAccessKey", label: "Clé d'accès" },
        { key: "storageSecretKey", label: "Clé secrète", isPassword: true },
        { key: "storageBucketName", label: "Bucket" },
        { key: "storageRegion", label: "Région" },
    ]
    const initialSnap = fields.map((f) => `${f.key}:${org[f.key] ?? ""}`).join("|")
    const [values, setValues] = useState<Record<string, string>>(() => {
        const init: Record<string, string> = {}
        for (const f of fields) init[f.key] = org[f.key] ?? ""
        return init
    })
    const [isSaving, setIsSaving] = useState(false)
    const snap = fields.map((f) => `${f.key}:${values[f.key] ?? ""}`).join("|")
    const hasChanges = snap !== initialSnap

    const handleSave = useCallback(async () => {
        setIsSaving(true)
        const body: Record<string, string | null | undefined> = { ...values }
        for (const f of fields) if (body[f.key] === "") body[f.key] = undefined
        const response = await getResponseBodyFromAPI({
            routeDefinition: updateOrganizationStorageCredentialsRouteDefinition,
            body,
        })
        if (response.ok === false) {
            toast({
                title: response.error?.cause ?? "Impossible d'enregistrer",
                variant: "error",
            })
        } else {
            await invalidateData({
                routeDefinition: readOneOrganizationRouteDefinition,
                body: { idOrganization },
            })
            toast({
                title: "Identifiants de stockage mis à jour",
                variant: "success",
            })
        }
        setIsSaving(false)
    }, [values, idOrganization])

    return (
        <Block.Root>
            <Block.Header title="Identifiants de stockage (S3)" />
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.5rem",
                })}
            >
                {fields.map((f) => (
                    <div
                        key={f.key}
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.25rem",
                        })}
                    >
                        <span
                            className={css({ fontSize: "sm", fontWeight: "medium", color: "fg.muted" })}
                        >
                            {f.label}
                        </span>
                        {f.isPassword ? (
                            <InputPassword
                                value={values[f.key] ?? ""}
                                onChange={(v) => setValues((p) => ({ ...p, [f.key]: v ?? "" }))}
                            />
                        ) : (
                            <InputText
                                value={values[f.key] ?? ""}
                                onChange={(v) => setValues((p) => ({ ...p, [f.key]: v ?? "" }))}
                            />
                        )}
                    </div>
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
