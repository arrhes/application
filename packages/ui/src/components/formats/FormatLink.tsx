import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.js"
import { Button } from "../buttons/Button.js"
import { toast } from "../overlays/toast/useToast.js"
import { FormatBase } from "./FormatBase.js"
import { FormatNull } from "./FormatNull.js"

type FormatLinkProps = {
    text: string | null
    className?: Styles
}

function copyContent(toCopy: string | null) {
    toast({
        title: "Contenu copié dans le presse-papier.",
        variant: "information",
    })
    return navigator.clipboard.writeText(!toCopy ? "" : toCopy)
}

export function FormatLink(props: FormatLinkProps) {
    if (!props.text) return <FormatNull />

    return (
        <FormatBase className={props.className}>
            <Button
                onClick={() => copyContent(props.text)}
                className={{
                    width: "100%",
                    overflow: "auto",
                    borderRadius: "none",
                }}
            >
                <span
                    className={css({
                        textAlign: "left",
                        textDecoration: "underline",
                        _hover: {
                            textDecoration: "none",
                        },
                        maxWidth: "100%",
                        overflowWrap: "normal",
                        whiteSpace: "nowrap",
                        overflow: "auto",
                        textOverflow: "ellipsis",
                    })}
                >
                    {props.text}
                </span>
            </Button>
        </FormatBase>
    )
}
