import {
    readAllAccountsRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readOneEntryLineRouteDefinition,
    updateOneEntryLineRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputPrice, InputText, InputToggle, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import { type JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../../../components/forms/FormRoot.tsx"
import { InputDataCombobox } from "../../../../../../components/InputDataCombobox.tsx"
import { useRightPanel } from "../../../../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function UpdateOneEntryLine(props: {
    entryLine: v.InferOutput<typeof returnedSchemas.entryLine>
    children: JSX.Element
}) {
    const { openPanel, closePanel } = useRightPanel()

    const form = (
        <FormRoot
            schema={updateOneEntryLineRouteDefinition.schemas.body}
            defaultValues={{
                ...props.entryLine,
                idEntryLine: props.entryLine.id,
            }}
            submitButtonProps={{
                leftIcon: <IconPencil />,
                text: "Modifier le mouvement",
            }}
            onSubmit={async (data) => {
                const updateEntryLineResponse = await getResponseBodyFromAPI({
                    routeDefinition: updateOneEntryLineRouteDefinition,
                    body: data,
                })
                if (updateEntryLineResponse.ok === false) {
                    toast({
                        title: "Impossible de modifier le mouvement",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Mouvement modifié avec succès",
                    variant: "success",
                })
                return true
            }}
            onCancel={() => closePanel()}
            onSuccess={async () => {
                await Promise.all([
                    invalidateData({
                        routeDefinition: readAllEntryLinesRouteDefinition,
                        body: {
                            idYear: props.entryLine.idYear,
                            idEntry: props.entryLine.idEntry,
                        },
                    }),
                    invalidateData({
                        routeDefinition: readAllEntryLinesRouteDefinition,
                        body: {
                            idYear: props.entryLine.idYear,
                        },
                    }),
                    invalidateData({
                        routeDefinition: readOneEntryLineRouteDefinition,
                        body: {
                            idYear: props.entryLine.idYear,
                            idEntryLine: props.entryLine.id,
                        },
                    }),
                ])

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
                                    isRequired={false}
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
                        name="idAccount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Compte"
                                    isRequired={true}
                                />
                                <FormControl>
                                    <InputDataCombobox
                                        value={field.value}
                                        onChange={field.onChange}
                                        routeDefinition={readAllAccountsRouteDefinition}
                                        body={{
                                            idYear: props.entryLine.idYear,
                                        }}
                                        placeholder="Sélectionner un compte"
                                        getOption={(journal) => ({
                                            key: journal.id,
                                            label: `${journal.number} - ${journal.label}`,
                                        })}
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "1",
                        })}
                    >
                        <FormField
                            control={form.control}
                            name="debit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        label="Débit"
                                        isRequired={false}
                                    />
                                    <FormControl>
                                        <InputPrice
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
                            name="credit"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        label="Crédit"
                                        isRequired={false}
                                    />
                                    <FormControl>
                                        <InputPrice
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormError />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                        })}
                    >
                        <FormLabel
                            label="Mouvement ajouté aux calculs ?"
                            isRequired={false}
                        />
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                gap: "0.5rem",
                            })}
                        >
                            <FormField
                                control={form.control}
                                name="isComputedForJournalReport"
                                render={({ field }) => (
                                    <FormItem
                                        className={{
                                            width: "fit-content",
                                        }}
                                    >
                                        <FormLabel
                                            label="Journal"
                                            isRequired={true}
                                        />
                                        <FormControl>
                                            <InputToggle
                                                value={field.value}
                                                onChange={field.onChange}
                                                options={[
                                                    {
                                                        value: true,
                                                        label: "Oui",
                                                    },
                                                    {
                                                        value: false,
                                                        label: "Non",
                                                    },
                                                ]}
                                            />
                                        </FormControl>
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isComputedForLedgerReport"
                                render={({ field }) => (
                                    <FormItem
                                        className={{
                                            width: "fit-content",
                                        }}
                                    >
                                        <FormLabel
                                            label="Grand-livre"
                                            isRequired={true}
                                        />
                                        <FormControl>
                                            <InputToggle
                                                value={field.value}
                                                onChange={field.onChange}
                                                options={[
                                                    {
                                                        value: true,
                                                        label: "Oui",
                                                    },
                                                    {
                                                        value: false,
                                                        label: "Non",
                                                    },
                                                ]}
                                            />
                                        </FormControl>
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isComputedForBalanceReport"
                                render={({ field }) => (
                                    <FormItem
                                        className={{
                                            width: "fit-content",
                                        }}
                                    >
                                        <FormLabel
                                            label="Balance"
                                            isRequired={true}
                                        />
                                        <FormControl>
                                            <InputToggle
                                                value={field.value}
                                                onChange={field.onChange}
                                                options={[
                                                    {
                                                        value: true,
                                                        label: "Oui",
                                                    },
                                                    {
                                                        value: false,
                                                        label: "Non",
                                                    },
                                                ]}
                                            />
                                        </FormControl>
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isComputedForBalanceSheetReport"
                                render={({ field }) => (
                                    <FormItem
                                        className={{
                                            width: "fit-content",
                                        }}
                                    >
                                        <FormLabel
                                            label="Bilan"
                                            isRequired={true}
                                        />
                                        <FormControl>
                                            <InputToggle
                                                value={field.value}
                                                onChange={field.onChange}
                                                options={[
                                                    {
                                                        value: true,
                                                        label: "Oui",
                                                    },
                                                    {
                                                        value: false,
                                                        label: "Non",
                                                    },
                                                ]}
                                            />
                                        </FormControl>
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isComputedForIncomeStatementReport"
                                render={({ field }) => (
                                    <FormItem
                                        className={{
                                            width: "fit-content",
                                        }}
                                    >
                                        <FormLabel
                                            label="Compte de résultat"
                                            isRequired={true}
                                        />
                                        <FormControl>
                                            <InputToggle
                                                value={field.value}
                                                onChange={field.onChange}
                                                options={[
                                                    {
                                                        value: true,
                                                        label: "Oui",
                                                    },
                                                    {
                                                        value: false,
                                                        label: "Non",
                                                    },
                                                ]}
                                            />
                                        </FormControl>
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
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
            onClick={() => openPanel(form, "Modifier le mouvement")}
        >
            {props.children}
        </Button>
    )
}
