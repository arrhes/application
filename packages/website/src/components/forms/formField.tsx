import { Controller, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form"
import { FormFieldContext } from "./formFieldContext.js"

type FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>> = ControllerProps<
    TFieldValues,
    TName
>

export function FormField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(
    props: FormField<TFieldValues, TName>,
) {
    return (
        <FormFieldContext value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext>
    )
}
