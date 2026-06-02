import {
    readAllBalanceSheetsRouteDefinition,
    readOneBalanceSheetRouteDefinition,
    updateOneBalanceSheetRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, InputToggle, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import type { ComponentProps, JSX } from "react"
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
import { BalanceSheetsSelect } from "../BalanceSheetsSelect.tsx"

export function UpdateOneBalanceSheet(props: {
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    children: JSX.Element
    className?: ComponentProps<typeof Button>["className"]
}) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={css.raw(
                {
                    padding: "0",
                    border: "none",
                    backgroundColor: "transparent",
                    width: "fit-content",
                    height: "fit-content",
                },
                props.className,
            )}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Modifier la ligne de bilan",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={updateOneBalanceSheetRouteDefinition.schemas.body}
                            defaultValues={{
                                ...props.balanceSheet,
                                idBalanceSheet: props.balanceSheet.id,
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPlus />,
                                text: "Modifier la ligne de bilan",
                            }}
                            onSubmit={async (data) => {
                                const updateBalanceSheetResponse = await getResponseBodyFromAPI({
                                    routeDefinition: updateOneBalanceSheetRouteDefinition,
                                    body: data,
                                })
                                if (updateBalanceSheetResponse.ok === false) {
                                    toast({
                                        title: "Impossible de modifier la ligne de bilan",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Ligne de bilan modifiée avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await Promise.all([
                                    invalidateData({
                                        routeDefinition: readAllBalanceSheetsRouteDefinition,
                                        body: {
                                            idYear: props.balanceSheet.idYear,
                                        },
                                    }),
                                    invalidateData({
                                        routeDefinition: readOneBalanceSheetRouteDefinition,
                                        body: {
                                            idBalanceSheet: props.balanceSheet.id,
                                            idYear: props.balanceSheet.idYear,
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
                                                        idOrganization={props.balanceSheet.idOrganization}
                                                        idYear={props.balanceSheet.idYear}
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
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
