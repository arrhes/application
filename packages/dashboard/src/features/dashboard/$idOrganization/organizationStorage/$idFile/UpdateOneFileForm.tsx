import { fileSchema } from "@arrhes/application-metadata/components"
import {
    finalizeFileUploadRouteDefinition,
    generateFilePutSignedUrlRouteDefinition,
    readAllFilesRouteDefinition,
    readOneFileRouteDefinition,
    updateOneFileRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { InputDate, InputFile, InputText, toast } from "@arrhes/ui"
import { IconPencil } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { FormControl } from "../../../../../components/forms/FormControl.js"
import { FormError } from "../../../../../components/forms/FormError.js"
import { FormField } from "../../../../../components/forms/FormField.js"
import { FormItem } from "../../../../../components/forms/FormItem.js"
import { FormLabel } from "../../../../../components/forms/FormLabel.js"
import { FormRoot } from "../../../../../components/forms/FormRoot.js"
import { useRightPanel } from "../../../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../../utilities/invalidateData.js"

export function UpdateOneFileForm(props: { file: v.InferOutput<typeof returnedSchemas.file> }) {
    const { closePanel } = useRightPanel()
    return (
        <FormRoot
            schema={v.object({
                ...updateOneFileRouteDefinition.schemas.body.entries,
                file: v.optional(fileSchema),
            })}
            defaultValues={{
                ...props.file,
                idFile: props.file.id,
            }}
            submitButtonProps={{
                leftIcon: <IconPencil />,
                text: "Modifier le fichier",
            }}
            onSubmit={async (data) => {
                const updateFileResponse = await getResponseBodyFromAPI({
                    routeDefinition: updateOneFileRouteDefinition,
                    body: {
                        idFile: props.file.id,
                        reference: data.reference,
                        name: data.name,
                        date: data.date,
                    },
                })
                if (updateFileResponse.ok === false) {
                    toast({
                        title: "Impossible de modifier le fichier",
                        variant: "error",
                    })
                    return false
                }

                if (data.file !== undefined) {
                    const signedUrlResponse = await getResponseBodyFromAPI({
                        routeDefinition: generateFilePutSignedUrlRouteDefinition,
                        body: {
                            idFile: updateFileResponse.data.id,
                            type: data.file.type,
                            size: data.file.size,
                        },
                    })
                    if (signedUrlResponse.ok === false) {
                        toast({
                            title: "Impossible de télécharger le fichier",
                            variant: "error",
                        })
                        return false
                    }
                    const uploadFileResponse = await fetch(signedUrlResponse.data.url, {
                        method: "PUT",
                        body: data.file,
                    })
                    if (uploadFileResponse.ok === false) {
                        toast({
                            title: "Le fichier ne peut pas être téléchargé",
                            variant: "error",
                        })
                        return false
                    }

                    const finalizeResponse = await getResponseBodyFromAPI({
                        routeDefinition: finalizeFileUploadRouteDefinition,
                        body: {
                            idFile: updateFileResponse.data.id,
                        },
                    })
                    if (finalizeResponse.ok === false) {
                        toast({
                            title: "Le téléversement du fichier a échoué",
                            variant: "error",
                        })
                        return false
                    }
                }

                toast({
                    title: "Fichier modifié avec succès",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await Promise.all([
                    invalidateData({
                        routeDefinition: readAllFilesRouteDefinition,
                        body: {},
                    }),
                    invalidateData({
                        routeDefinition: readOneFileRouteDefinition,
                        body: {
                            idFile: props.file.id,
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
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Fichier"
                                    isRequired
                                />
                                <FormControl>
                                    <InputFile
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
                        name="reference"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Référence"
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
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Nom du fichier"
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
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Date du document"
                                    isRequired={false}
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
                </Fragment>
            )}
        </FormRoot>
    )
}
