import { createOneFolderRouteDefinition, readAllFoldersRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, ButtonOutlineContent, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconFolderPlus } from "@tabler/icons-react"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/FormControl.js"
import { FormError } from "../../../../components/forms/FormError.js"
import { FormField } from "../../../../components/forms/FormField.js"
import { FormItem } from "../../../../components/forms/FormItem.js"
import { FormLabel } from "../../../../components/forms/FormLabel.js"
import { FormRoot } from "../../../../components/forms/FormRoot.js"
import { useTabs } from "../../../../contexts/tabs/useTabs.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

export function CreateOneFolder(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idFolderParent?: string | null
}) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Nouveau dossier",
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
                            onCancel={undefined}
                            onSuccess={async () => {
                                await invalidateData({
                                    routeDefinition: readAllFoldersRouteDefinition,
                                    body: {},
                                })
                                closeTab(r.current)
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
                    </div>,
                )
            }}
        >
            <ButtonOutlineContent
                leftIcon={<IconFolderPlus />}
                //  text="Ajouter un dossier"
            />
        </Button>
    )
}
