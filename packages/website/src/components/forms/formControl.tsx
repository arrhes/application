import { CircularLoader } from "@arrhes/ui"
import { Slot } from "@radix-ui/react-slot"
import { type ComponentProps, Suspense } from "react"
import { useFormField } from "./useFormField.js"

type FormControl = ComponentProps<typeof Slot>

export function FormControl(props: FormControl) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Suspense fallback={<CircularLoader />}>
            <Slot
                {...props}
                id={formItemId}
                aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
                aria-invalid={!!error}
            />
        </Suspense>
    )
}
