import { readOneYearRouteDefinition, updateOneYearRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputDate, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../components/forms/formError.tsx"
import { FormField } from "../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../components/forms/formRoot.tsx"
import { useTabs } from "../../../../contexts/tabs/tabsContext.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"
import { YearSelect } from "../../$idOrganization/years/yearSelect.tsx"

export function UpdateOneYear(props: { year: v.InferOutput<typeof returnedSchemas.year>; children: JSX.Element }) {
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
                    "Modifier les informations de l'exercice",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
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
                                    toast({
                                        title: "Impossible de modifier l'exercice",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Exercice modifié avec succès",
                                    variant: "success",
                                })
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

                                closeTab(r.current)
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
                                                    <InputDate
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
                                                    <InputDate
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
