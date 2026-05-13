import { deleteUserRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, InputPassword, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTrash } from "@tabler/icons-react"
import type { JSX } from "react"
import { FormControl } from "../../../components/forms/formControl.tsx"
import { FormError } from "../../../components/forms/formError.tsx"
import { FormField } from "../../../components/forms/formField.tsx"
import { FormItem } from "../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../components/forms/formRoot.tsx"
import { useTabs } from "../../../contexts/tabs/tabsContext.tsx"
import { applicationRouter } from "../../../routes/applicationRouter.tsx"
import { deleteCookies } from "../../../utilities/cookies/deleteCookies.ts"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

export function DeleteUser(props: { children: JSX.Element }) {
    const { openPanelTab } = useTabs()

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
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Supprimer le compte",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
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
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
