import { type HTMLAttributes, useId, useMemo } from "react"
import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"
import { FormItemContext } from "./formItemContext.js"

type FormItem = Omit<HTMLAttributes<HTMLDivElement>, "className"> & {
    className?: Styles
}

export function FormItem({ className, ...props }: FormItem) {
    const id = useId()
    const formItemContextValue = useMemo(
        () => ({
            id,
        }),
        [
            id,
        ],
    )

    return (
        <FormItemContext.Provider value={formItemContextValue}>
            <div
                {...props}
                className={css(
                    {
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "1",
                    },
                    className,
                )}
            />
        </FormItemContext.Provider>
    )
}
