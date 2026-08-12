import { createOneTagRouteDefinition, readAllTagsRouteDefinition } from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { Button, InputText, toast } from "@comptasse/ui"
import { IconPlus } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../../components/forms/FormRoot.tsx"
import { useRightPanel } from "../../../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function CreateOneTag(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
    const { openPanel, closePanel } = useRightPanel()

    const form = (
        <FormRoot
            schema={createOneTagRouteDefinition.schemas.body}
            defaultValues={{
                idYear: props.idYear,
            }}
            submitButtonProps={{
                leftIcon: <IconPlus />,
                text: "Ajouter la catégorie",
            }}
            onSubmit={async (data) => {
                const createTagResponse = await getResponseBodyFromAPI({
                    routeDefinition: createOneTagRouteDefinition,
                    body: data,
                })
                if (createTagResponse.ok === false) {
                    toast({
                        title: "Impossible d'ajouter la catégorie",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Catégorie ajoutée avec succès",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await invalidateData({
                    routeDefinition: readAllTagsRouteDefinition,
                    body: {
                        idYear: props.idYear,
                    },
                })

                closePanel()
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
                                    <InputText
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
            onClick={() => openPanel(form, "Ajouter une catégorie")}
        >
            {props.children}
        </Button>
    )
}
