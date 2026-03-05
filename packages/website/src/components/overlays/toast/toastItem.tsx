import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    type Icon,
    IconAlertTriangle,
    IconCircleCheck,
    IconInfoSquare,
    type IconProps,
    IconX,
} from "@tabler/icons-react"
import type { ReactElement } from "react"
import type { ToasterToast, ToastVariant } from "../../../contexts/toasts/useToast.js"

const toastIcons: Record<ToastVariant, ReactElement<IconProps & React.RefAttributes<Icon>>> = {
    error: <IconAlertTriangle size={20} className={css({ color: "error" })} />,
    success: <IconCircleCheck size={20} className={css({ color: "success" })} />,
    warning: <IconAlertTriangle size={20} className={css({ color: "warning" })} />,
    information: <IconInfoSquare size={20} className={css({ color: "information" })} />,
}

export function ToastItem(props: { toast: ToasterToast; onDismiss: (id: string) => void }) {
    const variant = props.toast.variant ?? "information"

    return (
        <div
            className={css({
                pointerEvents: "auto",
                position: "relative",
                width: "100%",
                display: props.toast.open ? "flex" : "none",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "0.5rem",
                padding: "1rem",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
                boxShadow: "sm",
            })}
        >
            <div
                className={css({
                    width: "fit-content",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem",
                })}
            >
                {toastIcons[variant]}
            </div>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flex: "1",
                    minWidth: "0",
                })}
            >
                {props.toast.title === undefined ? null : (
                    <span
                        className={css({
                            fontSize: "md",
                            color: "neutral",
                        })}
                    >
                        {props.toast.title}
                    </span>
                )}
                {props.toast.description === undefined ? null : (
                    <span
                        className={css({
                            fontSize: "sm",
                            color: "neutral/50",
                        })}
                    >
                        {props.toast.description}
                    </span>
                )}
            </div>
            <Button title="Fermer" onClick={() => props.onDismiss(props.toast.id)}>
                <ButtonGhostContent leftIcon={<IconX />} />
            </Button>
        </div>
    )
}
