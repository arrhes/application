import { ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconX } from "@tabler/icons-react"
import { useDrawerContext } from "./drawerRoot.js"

export function DrawerHeader(props: { title: string | undefined }) {
    const { setOpen } = useDrawerContext()

    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                borderBottom: "1px solid",
                borderBottomColor: "neutral/5",
                padding: "1rem",
            })}
        >
            <span>
                {props.title === undefined ? null : <span className={css({ fontSize: "2xl" })}>{props.title}</span>}
            </span>
            <button
                type="button"
                aria-label="Fermer"
                className={css({ display: "flex", alignItems: "center" })}
                onClick={() => setOpen(false)}
            >
                <ButtonGhostContent leftIcon={<IconX />} />
            </button>
        </div>
    )
}
