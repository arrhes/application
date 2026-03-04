import {
    createOneRecordFromTemplateRouteDefinition,
    readAllFilesRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllRecordLabelsRouteDefinition,
    readAllRecordsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/formControl.js"
import { FormError } from "../../../../components/forms/formError.js"
import { FormField } from "../../../../components/forms/formField.js"
import { FormGroup } from "../../../../components/forms/formGroup.js"
import { FormItem } from "../../../../components/forms/formItem.js"
import { FormLabel } from "../../../../components/forms/formLabel.js"
import { FormRoot } from "../../../../components/forms/formRoot.js"
import { InputDataCombobox } from "../../../../components/inputs/inputDataCombobox.js"
import { InputDate } from "../../../../components/inputs/inputDate.js"
import { InputSelect } from "../../../../components/inputs/inputSelect.js"
import { InputText } from "../../../../components/inputs/inputText.js"
import { Drawer } from "../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { applicationRouter } from "../../../../routes/applicationRouter.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { type RecordTemplateKey, recordTemplates } from "./recordTemplates/recordTemplates.js"

export function CreateOneRecord(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState<RecordTemplateKey | "empty">("empty")
    const [isTemplateReady, setIsTemplateReady] = useState(false)

    const activeTemplate = recordTemplates.find((t) => t.key === selectedTemplate)
    const isSubmitDisabled = activeTemplate?.hasActionButton === true && isTemplateReady === false

    return (
        <Drawer.Root
            open={open}
            onOpenChange={(value) => {
                setOpen(value)
                if (value === false) {
                    setSelectedTemplate("empty")
                    setIsTemplateReady(false)
                }
            }}
        >
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Ajouter une nouvelle écriture" />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneRecordFromTemplateRouteDefinition.schemas.body}
                        defaultValues={{
                            idYear: props.idYear,
                            date: new Date().toISOString(),
                            idFile: null,
                            idJournal: null,
                            rows: [],
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Ajouter l'écriture",
                            isDisabled: isSubmitDisabled,
                        }}
                        onSubmit={async (data) => {
                            const createRecordResponse = await getResponseBodyFromAPI({
                                routeDefinition: createOneRecordFromTemplateRouteDefinition,
                                body: data,
                            })
                            if (createRecordResponse.ok === false) {
                                toast({ title: "Impossible d'ajouter l'écriture", variant: "error" })
                                return false
                            }

                            toast({ title: "Écriture ajoutée avec succès", variant: "success" })
                            applicationRouter.navigate({
                                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idRecord",
                                params: {
                                    idOrganization: props.idOrganization,
                                    idYear: props.idYear,
                                    idRecord: createRecordResponse.data.id,
                                },
                            })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: readAllRecordsRouteDefinition,
                                body: {
                                    idYear: props.idYear,
                                },
                            })

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
                                                        idYear: props.idYear,
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
                                    name="idRecordLabel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Catégorie" isRequired={false} />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllRecordLabelsRouteDefinition}
                                                    body={{
                                                        idYear: props.idYear,
                                                    }}
                                                    placeholder="Sélectionner une catégorie"
                                                    getOption={(recordLabel) => ({
                                                        key: recordLabel.id,
                                                        label: `${recordLabel.label}`,
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
                                                        idYear: props.idYear,
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
                                <FormGroup title="Modèle d'écriture">
                                    <FormItem>
                                        <span className={css({ fontSize: "xs", color: "neutral/50" })}>
                                            Choisir un modèle
                                        </span>
                                        <InputSelect
                                            value={selectedTemplate}
                                            onChange={(value) => {
                                                const newValue = value ?? "empty"
                                                setSelectedTemplate(newValue)
                                                setIsTemplateReady(false)
                                                form.setValue("rows", [])
                                            }}
                                            options={recordTemplates.map((template) => ({
                                                key: template.key,
                                                label: template.label,
                                            }))}
                                            placeholder="Sélectionner un modèle"
                                        />
                                    </FormItem>
                                    {activeTemplate === undefined || activeTemplate.key === "empty" ? null : (
                                        <div
                                            className={css({
                                                paddingLeft: "2rem",
                                                // backgroundColor: "background",
                                                width: "100%",
                                                // borderRadius: "lg",
                                                display: "flex",
                                                flexDirection: "column",
                                            })}
                                        >
                                            {activeTemplate?.formComponent({
                                                form,
                                                idOrganization: props.idOrganization,
                                                idYear: props.idYear,
                                                onTemplateReadyChange: setIsTemplateReady,
                                            })}
                                        </div>
                                    )}
                                </FormGroup>
                            </Fragment>
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
