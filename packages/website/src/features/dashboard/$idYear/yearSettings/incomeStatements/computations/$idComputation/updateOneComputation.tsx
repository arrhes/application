import {
    readAllComputationsRouteDefinition,
    readOneComputationRouteDefinition,
    updateOneComputationRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../../components/forms/formRoot.tsx"
import { InputText } from "../../../../../../../components/inputs/inputText.tsx"
import { Drawer } from "../../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../utilities/invalidateData.ts"

export function UpdateOneComputation(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier la ligne de calcul" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneComputationRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.computation,
                            idComputation: props.computation.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Modifier la ligne de calcul",
                        }}
                        onSubmit={async (data) => {
                            const updateComputationResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneComputationRouteDefinition,
                                body: data,
                            })
                            if (updateComputationResponse.ok === false) {
                                toast({ title: "Impossible de modifier la ligne de calcul", variant: "error" })
                                return false
                            }

                            toast({ title: "Ligne de calcul modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllComputationsRouteDefinition,
                                    body: {
                                        idYear: props.computation.idYear,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readOneComputationRouteDefinition,
                                    body: {
                                        idComputation: props.computation.id,
                                        idYear: props.computation.idYear,
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
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Numéro"
                                                tooltip="Le numéro qui définit la ligne de calcul ajoutée."
                                                isRequired={true}
                                            />
                                            <FormControl>
                                                <InputText
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    autoFocus={true}
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
                                                label="Libellé"
                                                tooltip="Le libellé qui définit la ligne de calcul ajoutée."
                                                isRequired={true}
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
