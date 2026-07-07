import { sva } from "@arrhes/ui/css"
import { type ButtonContentProps, renderButtonContent } from "./buttonContent"
import { useButtonLoading } from "./useButtonLoading"

const plainRecipe = sva({
    slots: [
        "container",
        "leftIcon",
        "text",
        "rightIcon",
    ],
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
            borderColor: "primary",
            backgroundColor: "primary",
            color: "white",
            stroke: "white",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
            _hover: {
                backgroundColor: "primary/90",
            },
            _active: {
                backgroundColor: "primary/90",
            },
            _disabled: {
                opacity: 0.5,
                cursor: "not-allowed",
                backgroundColor: "primary",
            },
        },
        leftIcon: {
            minWidth: "14px",
            width: "14px",
            minHeight: "14px",
            height: "14px",
            flexShrink: 0,
            stroke: "white",
        },
        text: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: "0.875rem",
            lineHeight: "1rem",
            fontWeight: "400",
            color: "white",
        },
        rightIcon: {
            minWidth: "14px",
            width: "14px",
            minHeight: "14px",
            height: "14px",
            stroke: "white/50",
        },
    },
    variants: {
        color: {
            default: {},
            neutral: {},
            danger: {
                container: {
                    backgroundColor: "error",
                    borderColor: "rgba(31, 35, 40, 0.15)",
                    _hover: {
                        backgroundColor: "#c2341f",
                    },
                    _active: {
                        backgroundColor: "#a22015",
                    },
                },
            },
            success: {},
        },
    },
    defaultVariants: {
        color: "default",
    },
})

export function ButtonPlainContent(props: ButtonContentProps) {
    const classes = plainRecipe.raw({
        color: props.color ?? "default",
    })
    const contextLoading = useButtonLoading()
    return renderButtonContent(props, classes, contextLoading)
}
