import {
    readOneOrganizationRouteDefinition,
    updateOneOrganizationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPencil } from "@tabler/icons-react"
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
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function UpdateOneOrganization(props: {
    organization: v.InferOutput<typeof returnedSchemas.organization>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier les informations de l'organisation" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneOrganizationRouteDefinition.schemas.body}
                        defaultValues={props.organization}
                        submitButtonProps={{
                            leftIcon: <IconPencil />,
                            text: "Modifier l'organisation",
                        }}
                        onSubmit={async (data) => {
                            const response = await getResponseBodyFromAPI({
                                routeDefinition: updateOneOrganizationRouteDefinition,
                                body: data,
                            })
                            if (!response.ok) {
                                toast({ title: "Impossible de modifier l'organisation", variant: "error" })
                                return false
                            }

                            toast({ title: "Organisation modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: readOneOrganizationRouteDefinition,
                                body: {},
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Raison sociale ou nom de l'organisation"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputText value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="siren"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="SIREN"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputText value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Email"
                                                isRequired={false}
                                                description={undefined}
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
