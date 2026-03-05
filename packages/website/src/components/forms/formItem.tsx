import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type HTMLAttributes, useId } from "react"
import { FormItemContext } from "./formItemContext.js"

type FormItem = HTMLAttributes<HTMLDivElement>

export function FormItem(props: FormItem) {
    const id = useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                {...props}
                className={cx(
                    css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: "1",
                    }),
                    props.className,
                )}
            />
        </FormItemContext.Provider>
    )
}
