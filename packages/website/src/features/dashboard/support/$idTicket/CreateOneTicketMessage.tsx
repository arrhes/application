import {
    createOneTicketMessageRouteDefinition,
    readAllTicketMessagesRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { InputTextArea, toast } from "@arrhes/ui"
import { IconSend } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../components/forms/FormRoot.tsx"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../utilities/invalidateData.ts"

export function CreateOneTicketMessage(props: { idTicket: v.InferOutput<typeof returnedSchemas.ticket>["id"] }) {
    return (
        <FormRoot
            schema={createOneTicketMessageRouteDefinition.schemas.body}
            defaultValues={{
                idTicket: props.idTicket,
            }}
            submitButtonProps={{
                leftIcon: <IconSend />,
                text: "Envoyer",
            }}
            maxWidth="100%"
            alignSubmitButton="end"
            submitOnPressEnterKey={false}
            resetOnSubmit={true}
            onSubmit={async (data) => {
                const response = await getResponseBodyFromAPI({
                    routeDefinition: createOneTicketMessageRouteDefinition,
                    body: data,
                })
                if (response.ok === false) {
                    toast({
                        title: "Impossible d'envoyer le message",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Message envoyé",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await invalidateData({
                    routeDefinition: readAllTicketMessagesRouteDefinition,
                    body: {
                        idTicket: props.idTicket,
                    },
                })
            }}
        >
            {(form) => (
                <Fragment>
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
                                    <InputTextArea
                                        value={field.value}
                                        onChange={field.onChange}
                                        placeholder="Votre message..."
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
