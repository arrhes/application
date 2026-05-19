import {
    readAllEntriesRouteDefinition,
    readAllFilesRouteDefinition,
    readAllJournalsRouteDefinition,
    readOneEntryRouteDefinition,
    updateOneEntryRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputDate, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../../components/forms/FormRoot.tsx"
import { InputDataCombobox } from "../../../../../components/InputDataCombobox.tsx"
import { useTabs } from "../../../../../contexts/tabs/useTabs.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function UpdateOneEntry(props: { entry: v.InferOutput<typeof returnedSchemas.entry>; children: JSX.Element }) {
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
                const id = openPanelTab(
                    "Modifier une écriture",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={updateOneEntryRouteDefinition.schemas.body}
                            defaultValues={{
                                ...props.entry,
                                idEntry: props.entry.id,
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPencil />,
                                text: "Modifier l'écriture",
                            }}
                            onSubmit={async (data) => {
                                const updateEntryResponse = await getResponseBodyFromAPI({
                                    routeDefinition: updateOneEntryRouteDefinition,
                                    body: data,
                                })
                                if (updateEntryResponse.ok === false) {
                                    toast({
                                        title: "Impossible de modifier l'écriture",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Écriture modifiée avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await Promise.all([
                                    invalidateData({
                                        routeDefinition: readAllEntriesRouteDefinition,
                                        body: {
                                            idYear: props.entry.idYear,
                                        },
                                    }),
                                    invalidateData({
                                        routeDefinition: readOneEntryRouteDefinition,
                                        body: {
                                            idYear: props.entry.idYear,
                                            idEntry: props.entry.id,
                                        },
                                    }),
                                ])

                                closeTab(id)
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
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Date"
                                                    isRequired={true}
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
                                        name="idJournal"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Journal"
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputDataCombobox
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        routeDefinition={readAllJournalsRouteDefinition}
                                                        body={{
                                                            idYear: props.entry.idYear,
                                                        }}
                                                        placeholder="Sélectionner un journal"
                                                        getOption={(journal) => ({
                                                            key: journal.id,
                                                            label: `(${journal.code}) ${journal.label}`,
                                                        })}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="idFile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Pièce justificative"
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputDataCombobox
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        routeDefinition={readAllFilesRouteDefinition}
                                                        body={{
                                                            idYear: props.entry.idYear,
                                                        }}
                                                        placeholder="Sélectionner une pièce justificative"
                                                        getOption={(file) => ({
                                                            key: file.id,
                                                            label: file.reference
                                                                ? `${file.name} (${file.reference})`
                                                                : file.name,
                                                        })}
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
                    props.entry.label ?? undefined,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
