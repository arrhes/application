import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"
import { useFormField } from "./useFormField.js"

export function FormError({
    className,
    ...props
}: Omit<React.HTMLAttributes<HTMLParagraphElement>, "className"> & {
    className?: Styles
}) {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : props.children

    if (!body) return null
    return (
        <p
            id={formMessageId}
            className={css(
                {
                    width: "100%",
                    fontSize: "xs",
                    color: "error",
                },
                className,
            )}
            {...props}
        >
            {body}
        </p>
    )
}
