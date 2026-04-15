import { updateUserPasswordRouteDefinition } from "@arrhes/application-metadata/routes"
import { InputPassword, toast } from "@arrhes/ui"
import { IconDeviceFloppy } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../../components/forms/formControl.tsx"
import { FormError } from "../../../components/forms/formError.tsx"
import { FormField } from "../../../components/forms/formField.tsx"
import { FormItem } from "../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../components/forms/formRoot.tsx"
import { Drawer } from "../../../components/overlays/drawer/drawer.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

export function UpdateUserPassword(props: { children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Changer le mot de passe" />
                <Drawer.Body>
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
                                toast({ title: response.error?.cause ?? "Impossible de mettre à jour le mot de passe", variant: "error" })
                                return false
                            }
                            toast({ title: "Mot de passe mis à jour avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={() => setOpen(false)}
                        resetOnSubmit
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="currentPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Mot de passe actuel" isRequired />
                                            <FormControl>
                                                <InputPassword value={field.value} onChange={field.onChange} />
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
                                            <FormLabel label="Nouveau mot de passe" isRequired />
                                            <FormControl>
                                                <InputPassword value={field.value} onChange={field.onChange} />
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
                                            <FormLabel label="Confirmer le nouveau mot de passe" isRequired />
                                            <FormControl>
                                                <InputPassword value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                            </Fragment>
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
