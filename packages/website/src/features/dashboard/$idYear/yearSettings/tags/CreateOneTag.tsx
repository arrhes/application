import { createOneTagRouteDefinition, readAllTagsRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
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
import { useTabs } from "../../../../../contexts/tabs/useTabs.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function CreateOneTag(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
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
                    "Ajouter une nouvelle catégorie",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
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

                                closeTab(r.current)
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
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
