import { Badge, ButtonPlainContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconRocket } from "@tabler/icons-react"
import { LinkButton } from "../../components/LinkButton.js"
import { HeroIllustration } from "./HeroIllustration.js"

export function HomePage() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "4rem 1rem",
                backgroundColor: "background",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "xl",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "3rem",
                })}
            >
                {/* Illustration first */}
                <div
                    className={css({
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    })}
                >
                    <HeroIllustration />
                </div>

                {/* Content */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        gap: "1.5rem",
                        textAlign: "center",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "0.25rem",
                        })}
                    >
                        <Badge>Gratuit</Badge>
                        <Badge>Open source</Badge>
                        <Badge>Self-host</Badge>
                    </div>

                    <h1
                        className={css({
                            fontSize: "lg",
                            fontWeight: "300",
                            color: "neutral",
                            lineHeight: "normal",
                            letterSpacing: "normal",
                            textAlign: "center",
                            maxWidth: "2xl",
                        })}
                    >
                        Le logiciel de comptabilité moderne et intuitif,
                        <br />
                        pour{" "}
                        <span
                            className={css({
                                fontSize: "inherit",
                                color: "primary",
                                fontWeight: "semibold",
                            })}
                        >
                            ceux qui veulent reprendre la main sur leur comptabilité
                        </span>{" "}
                        .
                    </h1>

                    <div
                        className={css({
                            display: "flex",
                            flexDirection: {
                                base: "column",
                                sm: "row",
                            },
                            alignItems: "center",
                            gap: "0.75rem",
                        })}
                    >
                        <LinkButton to="/documentation/guide/démarrer">
                            <ButtonPlainContent
                                leftIcon={<IconRocket />}
                                text="Commencer à l'utiliser"
                            />
                        </LinkButton>
                    </div>
                </div>
            </div>
        </div>
    )
}
