import {
    addNewOrganizationRouteDefinition,
    getAllMyOrganizationsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../../components/forms/formControl.tsx"
import { FormError } from "../../../components/forms/formError.tsx"
import { FormField } from "../../../components/forms/formField.tsx"
import { FormItem } from "../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../components/forms/formRoot.tsx"
import { InputText } from "../../../components/inputs/inputText.tsx"
import { InputToggle } from "../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

export function AddNewOrganization(props: { children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Ajouter une nouvelle organisation" />
                <Drawer.Body>
                    <FormRoot
                        schema={addNewOrganizationRouteDefinition.schemas.body}
                        defaultValues={{
                            scope: "company",
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Ajouter l'organisation",
                        }}
                        onSubmit={async (data) => {
                            const response = await getResponseBodyFromAPI({
                                routeDefinition: addNewOrganizationRouteDefinition,
                                body: data,
                            })
                            if (!response.ok) {
                                toast({ title: "Impossible d'ajouter l'organisation", variant: "error" })
                                return false
                            }

                            toast({ title: "Organisation ajoutée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: getAllMyOrganizationsRouteDefinition,
                                body: {},
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="scope"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Type d'organisation"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { value: "company", label: "Entreprise" },
                                                        { value: "association", label: "Association" },
                                                    ]}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
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
