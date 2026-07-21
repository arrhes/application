import {
    createOneBalanceSheetRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, InputToggle, toast } from "@arrhes/ui"
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
import { BalanceSheetsSelect } from "./BalanceSheetsSelect.tsx"

export function CreateOneBalanceSheet(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
    const { openPanel, closePanel } = useRightPanel()

    const form = (
        <FormRoot
            schema={createOneBalanceSheetRouteDefinition.schemas.body}
            defaultValues={{
                idYear: props.idYear,
                idBalanceSheetParent: null,
                side: "asset",
            }}
            submitButtonProps={{
                leftIcon: <IconPlus />,
                text: "Ajouter la ligne de bilan",
            }}
            onSubmit={async (data) => {
                const createBalanceSheetResponse = await getResponseBodyFromAPI({
                    routeDefinition: createOneBalanceSheetRouteDefinition,
                    body: data,
                })
                if (createBalanceSheetResponse.ok === false) {
                    toast({
                        title: "Impossible d'ajouter la ligne de bilan",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Ligne de bilan ajouté avec succès",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await invalidateData({
                    routeDefinition: readAllBalanceSheetsRouteDefinition,
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
                        name="number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Numéro"
                                    tooltip="Le numéro qui définit la ligne de bilan ajoutée."
                                    isRequired
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
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Libellé"
                                    tooltip="Le libellé qui définit la ligne de bilan ajoutée."
                                    isRequired
                                />
                                <FormControl>
                                    <InputText
                                        value={field.value}
                                        onChange={field.onChange}
                                        autoFocus
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="idBalanceSheetParent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Ligne de bilan parent"
                                    tooltip="La ligne de bilan parent de la ligne créée."
                                />
                                <FormControl>
                                    <BalanceSheetsSelect
                                        idOrganization={props.idOrganization}
                                        idYear={props.idYear}
                                        value={field.value}
                                        onChange={field.onChange}
                                        side={null}
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="side"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel label="Côté du bilan ?" />
                                <FormControl>
                                    <InputToggle
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            {
                                                label: "Actif",
                                                value: "asset",
                                            },
                                            {
                                                label: "Passif",
                                                value: "liability",
                                            },
                                        ]}
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
            onClick={() => openPanel(form, "Ajouter une ligne de bilan")}
        >
            {props.children}
        </Button>
    )
}
