import {
    readAllJournalsRouteDefinition,
    readOneJournalRouteDefinition,
    updateOneJournalRouteDefinition,
} from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { Button, InputText, toast } from "@comptasse/ui"
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
import { useRightPanel } from "../../../../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function UpdateOneJournal(props: {
    journal: v.InferOutput<typeof returnedSchemas.journal>
    children: JSX.Element
}) {
    const { openPanel, closePanel } = useRightPanel()

    const form = (
        <FormRoot
            schema={updateOneJournalRouteDefinition.schemas.body}
            defaultValues={{
                ...props.journal,
                idJournal: props.journal.id,
            }}
            submitButtonProps={{
                leftIcon: <IconPlus />,
                text: "Modifier le journal",
            }}
            onSubmit={async (data) => {
                const updateJournalResponse = await getResponseBodyFromAPI({
                    routeDefinition: updateOneJournalRouteDefinition,
                    body: data,
                })
                if (updateJournalResponse.ok === false) {
                    toast({
                        title: "Impossible de modifier le journal",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Journal modifié avec succès",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await Promise.all([
                    invalidateData({
                        routeDefinition: readAllJournalsRouteDefinition,
                        body: {
                            idYear: props.journal.idYear,
                        },
                    }),
                    invalidateData({
                        routeDefinition: readOneJournalRouteDefinition,
                        body: {
                            idJournal: props.journal.id,
                            idYear: props.journal.idYear,
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
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Code"
                                    tooltip="Le code qui référence le journal ajouté."
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
                                    tooltip="Le libellé qui définit le journal ajouté."
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
            onClick={() => openPanel(form, "Modifier le journal")}
        >
            {props.children}
        </Button>
    )
}
