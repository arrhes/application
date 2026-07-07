import { type ComponentProps, type MouseEvent, type ReactNode, useRef, useState } from "react"
import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.ts"
import { sleep } from "../../utilities/sleep.ts"
import { ButtonLoadingContext } from "./buttonLoadingContext.js"

/**
 * Button component - a neutral container for clickable elements
 * Handles click events, loading state, and disabled state
 * Use composition with ButtonContent for styled button content
 *
 * @example
 * <Button onClick={handleClick} hasLoader>
 *   <ButtonPlain text="Submit" />
 * </Button>
 */
export function Button(
    props: Omit<ComponentProps<"button">, "children" | "disabled" | "className"> & {
        hasLoader?: boolean
        children: ReactNode
        title?: string
        isDisabled?: boolean
        className?: Styles
    },
) {
    const [isLoading, setIsLoading] = useState(false)
    const isLoadingRef = useRef(false)

    async function handleButtonClick(e: MouseEvent<HTMLButtonElement>) {
        if (props.onClick === undefined) return
        if (!props.hasLoader) {
            props.onClick(e)
            return
        }

        if (isLoadingRef.current) return
        isLoadingRef.current = true
        setIsLoading(true)

        try {
            await Promise.all([
                sleep(100),
                props.onClick(e),
            ])
        } finally {
            isLoadingRef.current = false
            setIsLoading(false)
        }
    }

    const { hasLoader, className, isDisabled, title, children, onClick: _onClick, ...buttonProps } = props

    return (
        <ButtonLoadingContext.Provider value={isLoading}>
            <button
                {...buttonProps}
                ref={props.ref}
                className={css(
                    {
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "fit-content",
                        maxWidth: "100%",
                        height: "fit-content",
                        maxHeight: "fit-content",
                        bg: "transparent",
                        border: "none",
                        padding: "0",
                        cursor: "pointer",
                        _disabled: {
                            cursor: "not-allowed",
                        },
                    },
                    className,
                )}
                onClick={handleButtonClick}
                type={props.type ?? "button"}
                disabled={props.isDisabled || isLoading}
                title={title}
            >
                {children}
            </button>
        </ButtonLoadingContext.Provider>
    )
}
