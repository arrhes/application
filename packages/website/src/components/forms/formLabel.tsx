import { css } from "@arrhes/ui/utilities/cn.js"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { IconInfoSquare } from "@tabler/icons-react"
import type { HTMLAttributes } from "react"
import { useFormField } from "./useFormField.js"

type FormLabel = {
    label: string | undefined
    isRequired?: boolean
    description?: string | undefined
    tooltip?: string | undefined
    labelProps?: HTMLAttributes<HTMLLabelElement>
}

export function FormLabel(props: FormLabel) {
    const { formItemId } = useFormField()

    return (
        <label
            {...props.labelProps}
            htmlFor={formItemId}
            aria-required={props.isRequired}
            className={css({
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "0.5rem",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    gap: "1",
                })}
            >
                <div
                    className={css({
                        display: "inline-flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "1",
                    })}
                >
                    {!props.label ? null : (
                        <span
                            className={css({
                                fontSize: "xs",
                                color: "neutral/50",
                                _before: { content: "'\\200b'" },
                            })}
                        >
                            {props.label}
                        </span>
                    )}
                    {props.isRequired !== true ? null : (
                        <sup
                            className={css({
                                color: "error",
                                fontSize: "xs",
                            })}
                        >
                            *
                        </sup>
                    )}
                </div>
                {!props.description ? null : (
                    <span
                        className={css({
                            color: "neutral/50",
                            fontSize: "sm",
                        })}
                    >
                        {props.description}
                    </span>
                )}
            </div>
            {!props.tooltip ? null : (
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                        <TooltipTrigger
                            className={css({ cursor: "help" })}
                            onClick={(e) => e.preventDefault()}
                            tabIndex={-1}
                        >
                            <IconInfoSquare
                                size={20}
                                className={css({
                                    color: "neutral/50",
                                    _hover: { color: "neutral", fill: "neutral/5" },
                                })}
                            />
                        </TooltipTrigger>
                        <TooltipContent className={css({ backgroundColor: "neutral", padding: "1rem" })}>
                            <p
                                className={css({
                                    overflowWrap: "break-word",
                                    hyphens: "auto",
                                    color: "white",
                                    fontSize: "sm",
                                })}
                            >
                                {props.tooltip}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </label>
    )
}
