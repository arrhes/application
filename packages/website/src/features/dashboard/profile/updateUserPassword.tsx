import { updateUserPasswordRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, InputPassword, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconDeviceFloppy } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../../components/forms/formControl.tsx"
import { FormError } from "../../../components/forms/formError.tsx"
import { FormField } from "../../../components/forms/formField.tsx"
import { FormItem } from "../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../components/forms/formRoot.tsx"
import { useTabs } from "../../../contexts/tabs/tabsContext.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

export function UpdateUserPassword(props: { children: JSX.Element }) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={css({
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            })}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Changer le mot de passe",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={updateUserPasswordRouteDefinition.schemas.body}
                            defaultValues={{
                                currentPassword: undefined,
                                newPassword: undefined,
                                newPasswordCheck: undefined,
                            }}
                            submitButtonProps={{
                                leftIcon: <IconDeviceFloppy />,
                                text: "Mettre à jour le mot de passe",
                            }}
                            onSubmit={async (data) => {
                                const response = await getResponseBodyFromAPI({
                                    routeDefinition: updateUserPasswordRouteDefinition,
                                    body: data,
                                })
                                if (response.ok === false) {
                                    toast({
                                        title: response.error?.cause ?? "Impossible de mettre à jour le mot de passe",
                                        variant: "error",
                                    })
                                    return false
                                }
                                toast({
                                    title: "Mot de passe mis à jour avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={() => closeTab(r.current)}
                            resetOnSubmit
                        >
                            {(form) => (
                                <Fragment>
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
                                    <FormField
                                        control={form.control}
                                        name="newPassword"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Nouveau mot de passe"
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
                                    <FormField
                                        control={form.control}
                                        name="newPasswordCheck"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Confirmer le nouveau mot de passe"
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
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
