import { IconInfoSquare } from "@tabler/icons-react"
import type { HTMLAttributes } from "react"
import { css } from "../../utilities/cn.js"
import { TooltipContent } from "../overlays/tooltip/TooltipContent.js"
import { TooltipPortal } from "../overlays/tooltip/tooltipPortal.js"
import { TooltipProvider } from "../overlays/tooltip/tooltipProvider.js"
import { TooltipRoot as Tooltip } from "../overlays/tooltip/tooltipRoot.js"
import { TooltipTrigger } from "../overlays/tooltip/tooltipTrigger.js"
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
                                _before: {
                                    content: "'\\200b'",
                                },
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
                            className={css({
                                cursor: "help",
                            })}
                            onClick={(e) => e.preventDefault()}
                            tabIndex={-1}
                        >
                            <IconInfoSquare
                                size={16}
                                className={css({
                                    stroke: "neutral/50",
                                    _hover: {
                                        stroke: "neutral",
                                    },
                                })}
                            />
                        </TooltipTrigger>
                        <TooltipPortal>
                            <TooltipContent
                                className={css({
                                    backgroundColor: "neutral",
                                    padding: "0.5rem",
                                    zIndex: "9999",
                                })}
                            >
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
                        </TooltipPortal>
                    </Tooltip>
                </TooltipProvider>
            )}
        </label>
    )
}
