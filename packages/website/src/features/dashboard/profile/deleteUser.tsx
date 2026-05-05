import { deleteUserRouteDefinition } from "@arrhes/application-metadata/routes"
import { InputPassword, toast } from "@arrhes/ui"
import { IconTrash } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { FormControl } from "../../../components/forms/formControl.tsx"
import { FormError } from "../../../components/forms/formError.tsx"
import { FormField } from "../../../components/forms/formField.tsx"
import { FormItem } from "../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../components/forms/formRoot.tsx"
import { Drawer } from "../../../components/overlays/drawer/drawer.tsx"
import { applicationRouter } from "../../../routes/applicationRouter.tsx"
import { deleteCookies } from "../../../utilities/cookies/deleteCookies.ts"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

export function DeleteUser(props: { children: JSX.Element }) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Supprimer le compte" />
                <Drawer.Body>
                    <FormRoot
                        schema={deleteUserRouteDefinition.schemas.body}
                        defaultValues={{
                            currentPassword: undefined,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconTrash />,
                            text: "Supprimer mon compte",
                            color: "danger",
                        }}
                        onSubmit={async (data) => {
                            const response = await getResponseBodyFromAPI({
                                routeDefinition: deleteUserRouteDefinition,
                                body: data,
                            })
                            if (response.ok === false) {
                                toast({
                                    title: response.error?.cause ?? "Impossible de supprimer le compte",
                                    variant: "error",
                                })
                                return false
                            }
                            toast({ title: "Compte supprimé", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={() => {
                            deleteCookies()
                            applicationRouter.navigate({
                                to: "/connexion",
                                reloadDocument: true,
                            })
                        }}
                    >
                        {(form) => (
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            label="Mot de passe actuel"
                                            tooltip="Entrez votre mot de passe pour confirmer la suppression."
                                            isRequired
                                        />
                                        <FormControl>
                                            <InputPassword value={field.value} onChange={field.onChange} />
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
