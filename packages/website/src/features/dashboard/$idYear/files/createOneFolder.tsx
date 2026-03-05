import { createOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { IconFolderPlus } from "@tabler/icons-react"
import { useState } from "react"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/formControl.js"
import { FormError } from "../../../../components/forms/formError.js"
import { FormField } from "../../../../components/forms/formField.js"
import { FormItem } from "../../../../components/forms/formItem.js"
import { FormLabel } from "../../../../components/forms/formLabel.js"
import { FormRoot } from "../../../../components/forms/formRoot.js"
import { InputText } from "../../../../components/inputs/inputText.js"
import { Drawer } from "../../../../components/overlays/drawer/drawer.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

export function CreateOneFolder(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    idFolderParent?: string | null
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Button onClick={() => setOpen(true)}>
                <ButtonOutlineContent
                    leftIcon={<IconFolderPlus />}
                    //  text="Ajouter un dossier"
                />
            </Button>
            <Drawer.Content>
                <Drawer.Header title="Nouveau dossier" />
                <Drawer.Body>
                    <FormRoot
                        schema={createOneFolderRouteDefinition.schemas.body}
                        defaultValues={{
                            idYear: props.idYear,
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
                                    idYear: data.idYear,
                                    idFolderParent: data.idFolderParent,
                                    name: data.name,
                                },
                            })
                            if (createResponse.ok === false) {
                                toast({ title: "Impossible de créer le dossier", variant: "error" })
                                return false
                            }
                            toast({ title: "Dossier créé avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await invalidateData({
                                routeDefinition: readAllFoldersRouteDefinition,
                                body: {
                                    idYear: props.idYear,
                                },
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
                                        <FormLabel label="Nom du dossier" isRequired />
                                        <FormControl>
                                            <InputText value={field.value} onChange={field.onChange} autoFocus />
                                        </FormControl>
                                        <FormError />
                                    </FormItem>
                                )}
                            />
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
