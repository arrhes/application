import {
    readOneOrganizationRouteDefinition,
    updateOrganizationStorageCredentialsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, formatFileSize, InputPassword, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCloud, IconDeviceFloppy } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../components/forms/FormRoot.tsx"
import { DataWrapper } from "../../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { SettingsSection } from "../../../../components/layouts/settingsSection/settingsSection.tsx"
import { useTabs } from "../../../../contexts/tabs/useTabs.tsx"
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
    const { openPanelTab, closeTab } = useTabs()

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
                            <SettingsSection.Root>
                                <SettingsSection.Header title="Stockage" />
                                <SettingsSection.Row
                                    title="Espace utilisé"
                                    description={`${formatFileSize(org.storageCurrentUsage)} / ${formatFileSize(org.storageLimit)}`}
                                />
                                <SettingsSection.Row
                                    title="Identifiants de stockage"
                                    description="Configurez les accès au stockage externe (S3 compatible)."
                                >
                                    <Button
                                        className={{
                                            padding: "0",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            width: "fit-content",
                                            height: "fit-content",
                                        }}
                                        onClick={() => {
                                            const r = {
                                                current: "",
                                            }
                                            r.current = openPanelTab(
                                                "Identifiants de stockage",
                                                <div
                                                    className={css({
                                                        padding: "2rem",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "1rem",
                                                    })}
                                                >
                                                    <FormRoot
                                                        schema={
                                                            updateOrganizationStorageCredentialsRouteDefinition.schemas
                                                                .body
                                                        }
                                                        defaultValues={{
                                                            storageEndpoint: org.storageEndpoint,
                                                            storageAccessKey: org.storageAccessKey,
                                                            storageSecretKey: org.storageSecretKey,
                                                            storageBucketName: org.storageBucketName,
                                                            storageRegion: org.storageRegion,
                                                        }}
                                                        submitButtonProps={{
                                                            leftIcon: <IconDeviceFloppy />,
                                                            text: "Enregistrer",
                                                        }}
                                                        onSubmit={async (data) => {
                                                            const response = await getResponseBodyFromAPI({
                                                                routeDefinition:
                                                                    updateOrganizationStorageCredentialsRouteDefinition,
                                                                body: data,
                                                            })
                                                            if (response.ok === false) {
                                                                toast({
                                                                    title:
                                                                        response.error?.cause ??
                                                                        "Impossible de mettre à jour les identifiants de stockage",
                                                                    variant: "error",
                                                                })
                                                                return false
                                                            }
                                                            toast({
                                                                title: "Identifiants de stockage mis à jour avec succès",
                                                                variant: "success",
                                                            })
                                                            return true
                                                        }}
                                                        onCancel={undefined}
                                                        onSuccess={async () => {
                                                            await invalidateData({
                                                                routeDefinition: readOneOrganizationRouteDefinition,
                                                                body: {
                                                                    idOrganization,
                                                                },
                                                            })
                                                            closeTab(r.current)
                                                        }}
                                                    >
                                                        {(form) => (
                                                            <Fragment>
                                                                <FormField
                                                                    control={form.control}
                                                                    name="storageEndpoint"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Endpoint de stockage"
                                                                                isRequired={false}
                                                                                description={undefined}
                                                                                tooltip={undefined}
                                                                            />
                                                                            <FormControl>
                                                                                <InputText
                                                                                    value={field.value ?? ""}
                                                                                    onChange={field.onChange}
                                                                                />
                                                                            </FormControl>
                                                                            <FormError />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="storageAccessKey"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Clé d'accès"
                                                                                isRequired={false}
                                                                                description={undefined}
                                                                                tooltip={undefined}
                                                                            />
                                                                            <FormControl>
                                                                                <InputText
                                                                                    value={field.value ?? ""}
                                                                                    onChange={field.onChange}
                                                                                />
                                                                            </FormControl>
                                                                            <FormError />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="storageSecretKey"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Clé secrète"
                                                                                isRequired={false}
                                                                                description={undefined}
                                                                                tooltip={undefined}
                                                                            />
                                                                            <FormControl>
                                                                                <InputPassword
                                                                                    value={field.value ?? ""}
                                                                                    onChange={field.onChange}
                                                                                />
                                                                            </FormControl>
                                                                            <FormError />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="storageBucketName"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Nom du bucket"
                                                                                isRequired={false}
                                                                                description={undefined}
                                                                                tooltip={undefined}
                                                                            />
                                                                            <FormControl>
                                                                                <InputText
                                                                                    value={field.value ?? ""}
                                                                                    onChange={field.onChange}
                                                                                />
                                                                            </FormControl>
                                                                            <FormError />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={form.control}
                                                                    name="storageRegion"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Région"
                                                                                isRequired={false}
                                                                                description={undefined}
                                                                                tooltip={undefined}
                                                                            />
                                                                            <FormControl>
                                                                                <InputText
                                                                                    value={field.value ?? ""}
                                                                                    onChange={field.onChange}
                                                                                />
                                                                            </FormControl>
                                                                            <FormError />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </Fragment>
                                                        )}
                                                    </FormRoot>
                                                </div>,
                                            )
                                        }}
                                    >
                                        <ButtonOutlineContent
                                            leftIcon={<IconCloud />}
                                            text="Modifier"
                                        />
                                    </Button>
                                </SettingsSection.Row>
                            </SettingsSection.Root>
                        )
                    }}
                </DataWrapper>
            </Page.Content>
        </Page.Root>
    )
}
