import { deleteUserRouteDefinition } from "@comptasse/application-metadata/routes"
import { Button, InputPassword, toast } from "@comptasse/ui"
import { IconTrash } from "@tabler/icons-react"
import type { JSX } from "react"
import { FormControl } from "../../../components/forms/FormControl.tsx"
import { FormError } from "../../../components/forms/FormError.tsx"
import { FormField } from "../../../components/forms/FormField.tsx"
import { FormItem } from "../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../components/forms/FormRoot.tsx"
import { useRightPanel } from "../../../contexts/rightPanel/RightPanelContext.js"
import { applicationRouter } from "../../../routes/applicationRouter.tsx"
import { deleteCookies } from "../../../utilities/cookies/deleteCookies.ts"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

export function DeleteUser(props: { children: JSX.Element }) {
    const { openPanel } = useRightPanel()

    const form = (
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
                toast({
                    title: "Compte supprimé",
                    variant: "success",
                })
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
                                <InputPassword
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
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
            onClick={() => openPanel(form, "Supprimer mon compte")}
        >
            {props.children}
        </Button>
    )
}
