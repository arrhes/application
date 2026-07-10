import {
    readUserSessionRouteDefinition,
    updateUserLlmCredentialsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, InputPassword, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDeviceFloppy, IconRobot } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../components/forms/FormControl.tsx"
import { FormError } from "../../../components/forms/FormError.tsx"
import { FormField } from "../../../components/forms/FormField.tsx"
import { FormItem } from "../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../components/forms/FormRoot.tsx"
import { DataWrapper } from "../../../components/layouts/DataWrapper.tsx"
import { Page } from "../../../components/layouts/page/page.js"
import { SettingsSection } from "../../../components/layouts/settingsSection/settingsSection.tsx"
import { useTabs } from "../../../contexts/tabs/useTabs.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

export function UserLlmCredentialsPage() {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Page.Root>
            <Page.Content>
                <DataWrapper
                    routeDefinition={readUserSessionRouteDefinition}
                    body={{}}
                >
                    {(userSession) => {
                        const user = userSession.user as v.InferOutput<typeof returnedSchemas.user>
                        return (
                            <SettingsSection.Root>
                                <SettingsSection.Header title="IA et OCR" />
                                <SettingsSection.Row
                                    title="Identifiants LLM et OCR"
                                    description="Configurez votre fournisseur LLM, votre modèle et votre clé API OCR."
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
                                                "Identifiants LLM et OCR",
                                                <div
                                                    className={css({
                                                        padding: "2rem",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "1rem",
                                                    })}
                                                >
                                                    <FormRoot
                                                        schema={updateUserLlmCredentialsRouteDefinition.schemas.body}
                                                        defaultValues={{
                                                            llmProvider: user.llmProvider,
                                                            llmApiKey: user.llmApiKey,
                                                            llmBaseUrl: user.llmBaseUrl,
                                                            llmModel: user.llmModel,
                                                            ocrApiKey: user.ocrApiKey,
                                                        }}
                                                        submitButtonProps={{
                                                            leftIcon: <IconDeviceFloppy />,
                                                            text: "Enregistrer",
                                                        }}
                                                        onSubmit={async (data) => {
                                                            const body = {
                                                                ...data,
                                                                ocrApiKey:
                                                                    data.ocrApiKey === "" ||
                                                                    data.ocrApiKey === undefined
                                                                        ? undefined
                                                                        : data.ocrApiKey,
                                                            }
                                                            const response = await getResponseBodyFromAPI({
                                                                routeDefinition:
                                                                    updateUserLlmCredentialsRouteDefinition,
                                                                body,
                                                            })
                                                            if (response.ok === false) {
                                                                toast({
                                                                    title:
                                                                        response.error?.cause ??
                                                                        "Impossible de mettre à jour les identifiants",
                                                                    variant: "error",
                                                                })
                                                                return false
                                                            }
                                                            toast({
                                                                title: "Identifiants mis à jour avec succès",
                                                                variant: "success",
                                                            })
                                                            return true
                                                        }}
                                                        onCancel={undefined}
                                                        onSuccess={async () => {
                                                            await invalidateData({
                                                                routeDefinition: readUserSessionRouteDefinition,
                                                                body: {},
                                                            })
                                                            closeTab(r.current)
                                                        }}
                                                    >
                                                        {(form) => (
                                                            <Fragment>
                                                                <FormField
                                                                    control={form.control}
                                                                    name="llmProvider"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Fournisseur LLM"
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
                                                                    name="llmApiKey"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Clé API LLM"
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
                                                                    name="llmBaseUrl"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="URL de base LLM"
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
                                                                    name="llmModel"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Modèle LLM"
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
                                                                    name="ocrApiKey"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel
                                                                                label="Clé API OCR (optionnelle)"
                                                                                isRequired={false}
                                                                                description="Si laissé vide, la clé API LLM sera utilisée."
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
                                                            </Fragment>
                                                        )}
                                                    </FormRoot>
                                                </div>,
                                            )
                                        }}
                                    >
                                        <ButtonOutlineContent
                                            leftIcon={<IconRobot />}
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
