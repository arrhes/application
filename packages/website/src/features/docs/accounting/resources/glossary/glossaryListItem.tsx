import { css } from "@arrhes/ui/utilities/cn.js"
import { LinkButton } from "../../../../../components/linkButton.js"

export function GlossaryListItem(props: {
    term: string
    englishTranslation: string
    slug: string
    definition: string
}) {
    return (
        <LinkButton
            to="/documentation/comptabilité/ressources/glossaire/$term"
            params={{ term: props.slug }}
            className={css({ width: "100%" })}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                    _hover: {
                        borderColor: "primary/30",
                        backgroundColor: "primary/5",
                    },
                    transition: "all 0.15s",
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: "100%",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.5rem",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "sm",
                            fontWeight: "semibold",
                            color: "neutral",
                        })}
                    >
                        {props.term}
                    </span>
                    <span
                        className={css({
                            fontSize: "xs",
                            color: "neutral/40",
                            fontStyle: "italic",
                        })}
                    >
                        {props.englishTranslation}
                    </span>
                </div>
                <span
                    className={css({
                        fontSize: "sm",
                        color: "neutral/50",
                        lineHeight: "1.5",
                        lineClamp: 2,
                    })}
                >
                    {props.definition}
                </span>
            </div>
        </LinkButton>
    )
}
