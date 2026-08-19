import { readUserSessionRouteDefinition, updateUserEmailRouteDefinition } from "@comptasse/application-metadata/routes"
import { Button, InputPassword, InputText, toast } from "@comptasse/ui"
import { IconDeviceFloppy } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../../components/forms/FormControl.tsx"
import { FormError } from "../../../components/forms/FormError.tsx"
import { FormField } from "../../../components/forms/FormField.tsx"
import { FormItem } from "../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../components/forms/FormRoot.tsx"
import { useRightPanel } from "../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

export function UpdateUserEmail(props: { children: JSX.Element }) {
    const { openPanel, closePanel } = useRightPanel()

    const form = (
        <FormRoot
            schema={updateUserEmailRouteDefinition.schemas.body}
            defaultValues={{
                currentPassword: undefined,
                email: undefined,
            }}
            submitButtonProps={{
                leftIcon: <IconDeviceFloppy />,
                text: "Mettre à jour l'email",
            }}
            onSubmit={async (data) => {
                const response = await getResponseBodyFromAPI({
                    routeDefinition: updateUserEmailRouteDefinition,
                    body: data,
                })
                if (response.ok === false) {
                    toast({
                        title: response.error?.cause ?? "Impossible de mettre à jour l'email",
                        variant: "error",
                    })
                    return false
                }
                toast({
                    title: "Adresse email mise à jour",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={() => {
                invalidateData({
                    routeDefinition: readUserSessionRouteDefinition,
                    body: {},
                })
                closePanel()
            }}
            resetOnSubmit
        >
            {(form) => (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Nouvelle adresse email"
                                    isRequired
                                />
                                <FormControl>
                                    <InputText
                                        type="email"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Mot de passe actuel"
                                    isRequired
                                />
                                <FormControl>
                                    <InputPassword
                                        value={field.value}
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
    )

    return (
        <Button
            className={{
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            }}
            onClick={() => openPanel(form, "Mettre à jour l'email")}
        >
            {props.children}
        </Button>
    )
}
