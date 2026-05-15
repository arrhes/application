import { ButtonGhostContent } from "../../buttons/ButtonGhostContent.js"
import { css, cx } from "../../../utilities/cn.js"
import { IconX } from "@tabler/icons-react"
import { useModalItem } from "../../../stores/modalStore.js"
import type { HTMLAttributes } from "react"

export function DialogHeader(props: HTMLAttributes<HTMLDivElement>) {
    const modalItem = useModalItem()

    return (
        <div
            {...props}
            className={cx(
                css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/5",
                }),
                props.className,
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
