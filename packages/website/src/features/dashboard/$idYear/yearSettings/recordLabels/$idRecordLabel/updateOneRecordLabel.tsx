import {
    readAllRecordLabelsRouteDefinition,
    readOneRecordLabelRouteDefinition,
    updateOneRecordLabelRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../components/forms/formRoot.tsx"
import { InputText } from "../../../../../../components/inputs/inputText.tsx"
import { Drawer } from "../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function UpdateOneRecordLabel(props: {
    recordLabel: v.InferOutput<typeof returnedSchemas.recordLabel>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier la catégorie" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneRecordLabelRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.recordLabel,
                            idRecordLabel: props.recordLabel.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Modifier la catégorie",
                        }}
                        onSubmit={async (data) => {
                            const updateRecordLabelResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneRecordLabelRouteDefinition,
                                body: data,
                            })
                            if (updateRecordLabelResponse.ok === false) {
                                toast({ title: "Impossible de modifier la catégorie", variant: "error" })
                                return false
                            }

                            toast({ title: "Catégorie modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllRecordLabelsRouteDefinition,
                                    body: {
                                        idYear: props.recordLabel.idYear,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readOneRecordLabelRouteDefinition,
                                    body: {
                                        idRecordLabel: props.recordLabel.id,
                                        idYear: props.recordLabel.idYear,
                                    },
                                }),
                            ])

                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <Fragment>
                                <FormField
                                    control={form.control}
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Libellé"
                                                tooltip="Le libellé qui définit la catégorie ajoutée."
                                                isRequired={false}
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
