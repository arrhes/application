import { sendSupportMessageRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconSend } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../../components/forms/formControl.tsx"
import { FormError } from "../../../components/forms/formError.tsx"
import { FormField } from "../../../components/forms/formField.tsx"
import { FormItem } from "../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../components/forms/formRoot.tsx"
import { InputTextArea } from "../../../components/inputs/inputTextArea.tsx"
import { InputToggle } from "../../../components/inputs/inputToggle.tsx"
import { toast } from "../../../contexts/toasts/useToast.ts"
import { applicationRouter } from "../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

export function ContactSupportForm() {
    return (
        <FormRoot
            schema={sendSupportMessageRouteDefinition.schemas.body}
            defaultValues={{
                category: "bug",
            }}
            submitButtonProps={{
                leftIcon: <IconSend />,
                text: "Envoyer le message",
            }}
            onSubmit={async (data) => {
                const response = await getResponseBodyFromAPI({
                    routeDefinition: sendSupportMessageRouteDefinition,
                    body: data,
                })
                if (!response.ok) {
                    toast({ title: "Le support n'a pas pu être contacté", variant: "error" })
                    return false
                }

                toast({ title: "Support contacté, nous reviendrons vers vous au plus vite", variant: "success" })
                return true
            }}
            onCancel={undefined}
            onSuccess={() => {
                applicationRouter.navigate({
                    to: "/",
                    reloadDocument: true,
                })
            }}
        >
            {(form) => (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Type d'organisation"
                                    isRequired={true}
                                    description={undefined}
                                    tooltip={undefined}
                                />
                                <FormControl>
                                    <InputToggle
                                        value={field.value}
                                        onChange={field.onChange}
                                        options={[
                                            { value: "bug", label: "Remonter une erreur" },
                                            { value: "enhancement", label: "Suggestion d'amélioration" },
                                            { value: "feature", label: "Demande de fonctionnalité" },
                                            { value: "other", label: "Autre" },
                                        ]}
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Message"
                                    isRequired={true}
                                    description={undefined}
                                    tooltip={undefined}
                                />
                                <FormControl>
                                    <InputTextArea value={field.value} onChange={field.onChange} />
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
