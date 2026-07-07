import { use } from "react"
import { useFormContext } from "react-hook-form"
import { FormFieldContext } from "./formFieldContext.js"
import { FormItemContext } from "./formItemContext.js"

export const useFormField = () => {
    const fieldContext = use(FormFieldContext)
    const itemContext = use(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
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
