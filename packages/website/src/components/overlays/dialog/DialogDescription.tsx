import { css, cx } from "@arrhes/ui/utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { ComponentPropsWithRef } from "react"

export function DialogDescription(props: ComponentPropsWithRef<typeof DialogPrimitive.Description>) {
    return (
        <DialogPrimitive.Description
            {...props}
            className={cx(
                css({
                    fontSize: "sm",
                    color: "neutral/50",
                }),
                props.className,
            )}
        />
    )
}
