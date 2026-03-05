import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { useFormField } from "./useFormField.js"

export function FormError(props: React.HTMLAttributes<HTMLParagraphElement>) {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : props.children

    if (!body) return null
    return (
        <p
            id={formMessageId}
            className={cx(
                css({
                    width: "100%",
                    fontSize: "xs",
                    color: "error",
                }),
                props.className,
            )}
            {...props}
        >
            {body}
        </p>
    )
}
