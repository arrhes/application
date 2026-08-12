import type { HTMLAttributes } from "react"
import { use } from "react"
import type { Styles } from "../../../../styled-system/css/css"
import { ModalItemContext } from "../../../stores/modalStoreContext.js"
import { css } from "../../../utilities/cn.js"

export function DialogTitle({
    className,
    ...props
}: Omit<HTMLAttributes<HTMLHeadingElement>, "className"> & {
    className?: Styles
}) {
    const modalItem = use(ModalItemContext)

    return (
        <h2
            {...props}
            id={modalItem?.titleId}
            className={css(
                {
                    fontSize: "lg",
                    fontWeight: "semibold",
                },
                className,
            )}
        >
            {props.children}
        </h2>
    )
}
