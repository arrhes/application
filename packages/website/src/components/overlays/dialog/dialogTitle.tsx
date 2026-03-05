import { css, cx } from "@arrhes/ui/utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { ComponentPropsWithRef } from "react"

export function DialogTitle(props: ComponentPropsWithRef<typeof DialogPrimitive.Title>) {
    return (
        <DialogPrimitive.Title
            {...props}
            className={cx(
                css({
                    fontSize: "lg",
                    fontWeight: "semibold",
                }),
                props.className,
            )}
        />
    )
}
