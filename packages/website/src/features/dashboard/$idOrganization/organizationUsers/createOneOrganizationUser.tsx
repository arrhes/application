import {
    createOneOrganizationUserRouteDefinition,
    readAllOrganizationUsersRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../components/forms/formError.tsx"
import { FormField } from "../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../components/forms/formRoot.tsx"
import { InputText } from "../../../../components/inputs/inputText.tsx"
import { InputToggle } from "../../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function CreateOneOrganizationUser(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Ajouter un nouvel utilisateur" />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneOrganizationUserRouteDefinition.schemas.body}
                        defaultValues={{
                            isAdmin: false,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Ajouter l'utilisateur",
                        }}
                        onSubmit={async (data) => {
                            const response = await getResponseBodyFromAPI({
                                routeDefinition: createOneOrganizationUserRouteDefinition,
                                body: data,
                            })
                            if (!response.ok) {
                                toast({ title: "Impossible d'ajouter l'utilisateur", variant: "error" })
                                return false
                            }

                            toast({ title: "Utilisateur ajouté avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: readAllOrganizationUsersRouteDefinition,
                                body: {},
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="isAdmin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Possède les droits administrateur ?"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { value: true, label: "Oui" },
                                                        { value: false, label: "Non" },
                                                    ]}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="user.email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Email de l'utilisateur"
                                                description={undefined}
                                                isRequired={true}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputText value={field.value} onChange={field.onChange} type="email" />
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
