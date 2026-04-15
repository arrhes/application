import { readUserSessionRouteDefinition, updateUserEmailRouteDefinition } from "@arrhes/application-metadata/routes"
import { InputPassword, InputText, toast } from "@arrhes/ui"
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
import { invalidateData } from "../../../utilities/invalidateData.ts"

export function UpdateUserEmail(props: { children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Changer l'adresse email" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateUserEmailRouteDefinition.schemas.body}
                        defaultValues={{
                            currentPassword: undefined,
                            emailToValidate: undefined,
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
                                toast({ title: response.error?.cause ?? "Impossible de mettre à jour l'email", variant: "error" })
                                return false
                            }
                            toast({
                                title: "Un email de vérification a été envoyé à la nouvelle adresse",
                                variant: "success",
                            })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={() => {
                            invalidateData({ routeDefinition: readUserSessionRouteDefinition, body: {} })
                            setOpen(false)
                        }}
                        resetOnSubmit
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="emailToValidate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Nouvelle adresse email" isRequired />
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
                                            <FormLabel label="Mot de passe actuel" isRequired />
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
