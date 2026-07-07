import { IconX } from "@tabler/icons-react"
import type { HTMLAttributes } from "react"
import type { Styles } from "../../../../styled-system/css/css"
import { useModalItem } from "../../../stores/modalStore.js"
import { css } from "../../../utilities/cn.js"
import { ButtonGhostContent } from "../../buttons/ButtonGhostContent.js"

export function DialogHeader({
    className,
    ...props
}: Omit<HTMLAttributes<HTMLDivElement>, "className"> & {
    className?: Styles
}) {
    const modalItem = useModalItem()

    return (
        <div
            {...props}
            className={css(
                {
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                },
                className,
            )}
        >
            <div
                className={css({
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                {props.children}
            </div>
            {modalItem !== null && (
                <button
                    type="button"
                    aria-label="Fermer"
                    onClick={modalItem.closeModal}
                    className={css({
                        display: "flex",
                        alignItems: "center",
                    })}
                >
                    <ButtonGhostContent leftIcon={<IconX />} />
                </button>
            )}
        </div>
    )
}
