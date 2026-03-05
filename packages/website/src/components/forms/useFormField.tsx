import { useContext } from "react"
import { useFormContext } from "react-hook-form"
import { ClientError } from "../../utilities/clientError.js"
import { FormFieldContext } from "./formFieldContext.js"
import { FormItemContext } from "./formItemContext.js"

export const useFormField = () => {
    const fieldContext = useContext(FormFieldContext)
    const itemContext = useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new ClientError({
            message: "useFormField should be used within <FormField>",
        })
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}
