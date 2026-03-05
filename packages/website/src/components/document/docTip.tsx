import { sva } from "@arrhes/ui/css"
import { IconAlertTriangle, IconBulb, IconCircleCheck, IconInfoCircle } from "@tabler/icons-react"
import type { ReactNode } from "react"

const docTipRecipe = sva({
    slots: ["container", "header", "iconWrapper", "icon", "label", "content"],
    base: {
        container: {
            padding: "1.25rem",
            borderRadius: "lg",
            border: "1px solid",
            borderLeft: "3px solid",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        },
        header: {
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
        },
        iconWrapper: {
            width: "0.875rem",
            height: "0.875rem",
            flexShrink: 0,
        },
        icon: {
            width: "100%",
            height: "100%",
        },
        label: {
            fontSize: "xs",
            fontWeight: "medium",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },
        content: {
            fontSize: "sm",
            color: "neutral/70",
            lineHeight: "1.6",
        },
    },
    variants: {
        variant: {
            tip: {
                container: {
                    backgroundColor: "warning/5",
                    borderColor: "warning/10",
                    borderLeftColor: "warning",
                },
                icon: { stroke: "warning" },
                label: { color: "warning" },
            },
            warning: {
                container: {
                    backgroundColor: "error/5",
                    borderColor: "error/10",
                    borderLeftColor: "error",
                },
                icon: { stroke: "error" },
                label: { color: "error" },
            },
            info: {
                container: {
                    backgroundColor: "information/5",
                    borderColor: "information/10",
                    borderLeftColor: "information",
                },
                icon: { stroke: "information" },
                label: { color: "information" },
            },
            success: {
                container: {
                    backgroundColor: "success/5",
                    borderColor: "success/10",
                    borderLeftColor: "success",
                },
                icon: { stroke: "success" },
                label: { color: "success" },
            },
        },
    },
    defaultVariants: {
        variant: "tip",
    },
})

const variantIcons = {
    tip: IconBulb,
    warning: IconAlertTriangle,
    info: IconInfoCircle,
    success: IconCircleCheck,
} as const

const variantLabels = {
    tip: "Conseil",
    warning: "Attention",
    info: "Information",
    success: "Félicitations",
} as const

export function DocTip(props: {
    variant?: "tip" | "warning" | "info" | "success"
    label?: string
    children: ReactNode
}) {
    const variant = props.variant ?? "tip"
    const classes = docTipRecipe({ variant })
    const Icon = variantIcons[variant]
    const label = props.label ?? variantLabels[variant]

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.iconWrapper}>
                    <Icon className={classes.icon} />
                </div>
                <span className={classes.label}>{label}</span>
            </div>
            <span className={classes.content}>{props.children}</span>
        </div>
    )
}
