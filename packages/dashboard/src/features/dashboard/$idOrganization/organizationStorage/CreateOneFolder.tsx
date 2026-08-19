import { createOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { Button, ButtonOutlineContent, InputText, toast } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconFolderPlus } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/FormControl.js"
import { FormError } from "../../../../components/forms/FormError.js"
import { FormField } from "../../../../components/forms/FormField.js"
import { FormItem } from "../../../../components/forms/FormItem.js"
import { FormLabel } from "../../../../components/forms/FormLabel.js"
import { FormRoot } from "../../../../components/forms/FormRoot.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

export function CreateOneFolder(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idFolderParent?: string | null
}) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                <ButtonOutlineContent
                    leftIcon={<IconFolderPlus />}
                    //  text="Ajouter un dossier"
                />
            </Button>
            {open && (
                <div
                    className={css({
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    })}
                >
                    <FormRoot
                        schema={createOneFolderRouteDefinition.schemas.body}
                        defaultValues={{
                            idFolderParent: props.idFolderParent ?? null,
                            name: "",
                        }}
                        submitButtonProps={{
                            leftIcon: <IconFolderPlus />,
                            text: "Créer le dossier",
                        }}
                        onSubmit={async (data) => {
                            const createResponse = await getResponseBodyFromAPI({
                                routeDefinition: createOneFolderRouteDefinition,
                                body: {
                                    idFolderParent: data.idFolderParent,
                                    name: data.name,
                                },
                            })
                            if (createResponse.ok === false) {
                                toast({
                                    title: "Impossible de créer le dossier",
                                    variant: "error",
                                })
                                return false
                            }
                            toast({
                                title: "Dossier créé avec succès",
                                variant: "success",
                            })
                            return true
                        }}
                        onCancel={() => setOpen(false)}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: readAllFoldersRouteDefinition,
                                body: {},
                            })
                            setOpen(false)
                        }}
                    >
                        {(form) => (
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="Nom du dossier"
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
                        )}
                    </FormRoot>
                </div>
            )}
        </>
    )
}
