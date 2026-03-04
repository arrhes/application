import { readOneYearRouteDefinition, updateOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
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
import { InputDate } from "../../../../components/inputs/inputDate.tsx"
import { InputText } from "../../../../components/inputs/inputText.tsx"
import { Drawer } from "../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"
import { YearSelect } from "../../$idOrganization/years/yearSelect.tsx"

export function UpdateOneYear(props: { year: v.InferOutput<typeof returnedSchemas.year>; children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier les informations de l'exercice" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneYearRouteDefinition.schemas.body}
                        defaultValues={props.year}
                        submitButtonProps={{
                            leftIcon: <IconPencil />,
                            text: "Modifier l'exercice",
                        }}
                        onSubmit={async (data) => {
                            const response = await getResponseBodyFromAPI({
                                routeDefinition: updateOneYearRouteDefinition,
                                body: data,
                            })
                            if (!response.ok) {
                                toast({ title: "Impossible de modifier l'exercice", variant: "error" })
                                return false
                            }

                            toast({ title: "Exercice modifié avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: readOneYearRouteDefinition,
                                body: {
                                    idYear: props.year.id,
                                },
                            })

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="startingAt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Date de début"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputDate value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endingAt"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Date de fin"
                                                isRequired={true}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <InputDate value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idYearPrevious"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Exercice précédent ?"
                                                isRequired={false}
                                                description={undefined}
                                                tooltip={undefined}
                                            />
                                            <FormControl>
                                                <YearSelect
                                                    idOrganization={props.year.idOrganization}
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
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Libellé de l'exercice"
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
                            </Fragment>
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
