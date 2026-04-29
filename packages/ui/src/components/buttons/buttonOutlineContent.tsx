import { sva } from "@arrhes/ui/css"
import { type ButtonContentProps, renderButtonContent } from "./buttonContent"

const outlineRecipe = sva({
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
            border: "1px solid",
            borderColor: "neutral/20",
            backgroundColor: "transparent",
            boxShadow: "inset 0 1px 0 rgba(87, 87, 87, 0.05)",
            _hover: { backgroundColor: "primary/5", borderColor: "primary/50" },
            _active: { backgroundColor: "neutral/10" },
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
            stroke: "neutral",
        },
        text: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.875rem",
            lineHeight: "1rem",
            fontWeight: "400",
            color: "neutral/75",
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
            default: {},
            neutral: {},
            danger: {
                container: {
                    borderColor: "error/40",
                    _hover: { backgroundColor: "error/5", borderColor: "error/50" },
                },
                leftIcon: { stroke: "error" },
                text: { color: "error" },
                rightIcon: { stroke: "error/50" },
            },
            success: {
                container: {
                    borderColor: "success/40",
                    _hover: { backgroundColor: "success/5", borderColor: "success/50" },
                },
                leftIcon: { stroke: "success" },
                text: { color: "success" },
                rightIcon: { stroke: "success/50" },
            },
        },
    },
    defaultVariants: {
        color: "default",
    },
})

export function ButtonOutlineContent(props: ButtonContentProps) {
    const classes = outlineRecipe({ color: props.color ?? "default" })
    return renderButtonContent(props, classes)
}
