import {
    readAllEntriesRouteDefinition,
    readAllFilesRouteDefinition,
    readAllJournalsRouteDefinition,
    readOneEntryRouteDefinition,
    updateOneEntryRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { InputDate, InputText, toast } from "@arrhes/ui"
import { IconPencil } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../components/forms/formRoot.tsx"
import { InputDataCombobox } from "../../../../../components/inputDataCombobox.tsx"
import { Drawer } from "../../../../../components/overlays/drawer/drawer.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function UpdateOneEntry(props: { entry: v.InferOutput<typeof returnedSchemas.entry>; children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier une écriture" />
                <Drawer.Body>
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
                                toast({ title: "Impossible de modifier l'écriture", variant: "error" })
                                return false
                            }

                            toast({ title: "Écriture modifiée avec succès", variant: "success" })
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
                                            <FormLabel label="Libellé" isRequired={true} />
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
                                            <FormLabel label="Date" isRequired={true} />
                                            <FormControl>
                                                <InputDate value={field.value} onChange={field.onChange} />
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
                                            <FormLabel label="Journal" isRequired={false} />
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
                                            <FormLabel label="Pièce justificative" isRequired={false} />
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
                                                        label: file.reference ?? "",
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
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
