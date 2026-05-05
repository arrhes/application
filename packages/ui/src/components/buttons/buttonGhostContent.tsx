import { sva } from "@arrhes/ui/css"
import { type ButtonContentProps, renderButtonContent } from "./buttonContent"

const ghostRecipe = sva({
    slots: ["container", "leftIcon", "text", "rightIcon"],
    base: {
        container: {
            width: "fit-content",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            paddingInline: "0.5rem",
            height: "2rem",
            minWidth: "2rem",
            borderRadius: "md",
            boxSizing: "border-box",
            transition: "all",
            transitionDuration: "50ms",
            transitionTimingFunction: "ease-in-out",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "transparent",
            backgroundColor: "transparent",
            _hover: { backgroundColor: "neutral/5" },
            _current: { backgroundColor: "primary/5" },
            _disabled: {
                opacity: 0.5,
            },
        },
        leftIcon: {
            minWidth: "14px",
            width: "14px",
            minHeight: "14px",
            height: "14px",
            flexShrink: 0,
            stroke: "neutral/70",
            _disabled: { stroke: "neutral/50" },
            _current: { stroke: "primary" },
        },
        text: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.875rem",
            lineHeight: "1rem",
            fontWeight: "400",
            color: "neutral/75",
            _disabled: { color: "neutral/50" },
            _current: { color: "primary" },
        },
        rightIcon: {
            minWidth: "14px",
            width: "14px",
            minHeight: "14px",
            height: "14px",
            stroke: "neutral/50",
        },
    },
    variants: {
        color: {
            default: {
                container: {},
            },
            neutral: {
                container: {},
            },
            danger: {
                container: {
                    _hover: {
                        backgroundColor: "error/5",
                        _disabled: { backgroundColor: "transparent" },
                    },
                },
                leftIcon: { stroke: "error", _disabled: { stroke: "neutral/50" } },
                text: { color: "error", _disabled: { color: "neutral/50" } },
            },
            success: {
                container: {
                    _hover: { backgroundColor: "success/8" },
                },
                leftIcon: { stroke: "success", _disabled: { stroke: "neutral/50" } },
                text: { color: "success", _disabled: { color: "neutral/50" } },
            },
        },
    },
    defaultVariants: {
        color: "default",
    },
})

export function ButtonGhostContent(props: ButtonContentProps) {
    const classes = ghostRecipe({ color: props.color ?? "default" })
    return renderButtonContent(props, classes)
}
