import {
    readAllTagsRouteDefinition,
    readOneTagRouteDefinition,
    updateOneTagRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../../../components/forms/FormRoot.tsx"
import { useTabs } from "../../../../../../contexts/tabs/useTabs.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function UpdateOneTag(props: { tag: v.InferOutput<typeof returnedSchemas.tag>; children: JSX.Element }) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={{
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            }}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Modifier la catégorie",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={updateOneTagRouteDefinition.schemas.body}
                            defaultValues={{
                                ...props.tag,
                                idTag: props.tag.id,
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPlus />,
                                text: "Modifier la catégorie",
                            }}
                            onSubmit={async (data) => {
                                const updateTagResponse = await getResponseBodyFromAPI({
                                    routeDefinition: updateOneTagRouteDefinition,
                                    body: data,
                                })
                                if (updateTagResponse.ok === false) {
                                    toast({
                                        title: "Impossible de modifier la catégorie",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Catégorie modifiée avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await Promise.all([
                                    invalidateData({
                                        routeDefinition: readAllTagsRouteDefinition,
                                        body: {
                                            idYear: props.tag.idYear,
                                        },
                                    }),
                                    invalidateData({
                                        routeDefinition: readOneTagRouteDefinition,
                                        body: {
                                            idTag: props.tag.id,
                                            idYear: props.tag.idYear,
                                        },
                                    }),
                                ])

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
                    props.tag.label ?? undefined,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
