import { Button } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/utilities/cn.js"
import type { JSX } from "react"
import { useDrawerContext } from "./drawerRoot.js"

export function DrawerTrigger(props: { children: JSX.Element; className?: string }) {
    const { setOpen } = useDrawerContext()

    return (
        <Button
            onClick={() => setOpen(true)}
            className={cx(
                css({
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    cursor: "pointer",
                    width: "fit-content",
                    maxWidth: "100%",
                    height: "fit-content",
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "0",
                }),
                props.className,
            )}
        >
            {props.children}
        </Button>
    )
}
