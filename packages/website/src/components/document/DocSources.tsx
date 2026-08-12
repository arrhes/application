import { css } from "@comptasse/ui/utilities/cn.js"
import { IconExternalLink } from "@tabler/icons-react"

interface Source {
    label: string
    url: string
}

export function DocSources(props: { sources: Source[] }) {
    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                borderTop: "1px solid",
                borderTopColor: "neutral/10",
                paddingTop: "1.5rem",
                marginTop: "0.5rem",
            })}
        >
            <h3
                className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "neutral/50",
                })}
            >
                Sources
            </h3>
            <ol
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                    listStyleType: "decimal",
                    paddingLeft: "1.25rem",
                })}
            >
                {props.sources.map((source, index) => (
                    <li
                        key={source.url}
                        id={`source-${index + 1}`}
                        className={css({
                            fontSize: "xs",
                            color: "neutral/50",
                        })}
                    >
                        <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={css({
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.25rem",
                            })}
                        >
                            <span
                                className={css({
                                    color: "neutral/50",
                                    textDecoration: "underline",
                                    textDecorationColor: "neutral/20",
                                    textUnderlineOffset: "2px",
                                    transition: "all 0.15s",
                                    _hover: {
                                        color: "primary",
                                        textDecorationColor: "primary/30",
                                    },
                                })}
                            >
                                {source.label}
                            </span>
                            <IconExternalLink
                                className={css({
                                    width: "0.75rem",
                                    height: "0.75rem",
                                    flexShrink: 0,
                                    stroke: "neutral/50",
                                })}
                            />
                        </a>
                    </li>
                ))}
            </ol>
        </section>
    )
}
