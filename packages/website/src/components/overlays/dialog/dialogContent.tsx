import { css, cx } from "@arrhes/ui/utilities/cn.js"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { ComponentPropsWithRef } from "react"
import { DialogOverlay } from "./dialogOverlay.js"
import { DialogPortal } from "./dialogPortal.js"

export function DialogContent(props: ComponentPropsWithRef<typeof DialogPrimitive.Content>) {
    return (
        <DialogPortal>
            <DialogOverlay>
                <DialogPrimitive.Content
                    {...props}
                    onClick={(e) => e.preventDefault()}
                    className={cx(
                        css({
                            minWidth: "100%",
                            width: "100%",
                            maxWidth: "md",
                            height: "fit",
                            maxH: "100%",
                            backgroundColor: "white",
                            borderRadius: "lg",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            transitionDuration: "200ms",
                            "&[data-state=open]": {
                                animation: "fadeIn 0.2s ease-out, zoomIn 0.2s ease-out",
                            },
                            "&[data-state=closed]": {
                                animation: "fadeOut 0.2s ease-in, zoomOut 0.2s ease-in",
                            },
                            md: {
                                minWidth: "md",
                            },
                        }),
                        props.className,
                    )}
                >
                    {props.children}
                </DialogPrimitive.Content>
            </DialogOverlay>
        </DialogPortal>
    )
}
