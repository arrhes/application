import { CircularLoader } from "@arrhes/ui"
import { cloneElement, type HTMLAttributes, isValidElement, type ReactElement, Suspense } from "react"
import { useFormField } from "./useFormField.js"

type FormControl = HTMLAttributes<HTMLElement> & {
    children?: ReactElement
}

function Slot({ children, ...slotProps }: FormControl) {
    if (!isValidElement(children)) return null
    const element = children as ReactElement<Record<string, unknown>>
    return cloneElement(element, {
        ...slotProps,
        ...element.props,
    })
}

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
