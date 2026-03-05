import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBrandGithub, IconMail } from "@tabler/icons-react"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocTip } from "../../../components/document/docTip.js"
import { LinkButton } from "../../../components/linkButton.js"

export function SupportGeneralDocPage() {
    return (
        <DocRoot>
            {/* Page header */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                <h1
                    className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}
                >
                    Support
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Besoin d'aide ? Nous sommes là pour vous accompagner.
                </p>
            </div>

            {/* Contact cards */}
            <div
                className={css({
                    display: "grid",
                    gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
                    gap: "1rem",
                })}
            >
                {/* Email support */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        padding: "1.5rem",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "2.5rem",
                                height: "2.5rem",
                                borderRadius: "md",
                                backgroundColor: "background",
                            })}
                        >
                            <IconMail
                                className={css({
                                    width: "1.25rem",
                                    height: "1.25rem",
                                    color: "primary",
                                })}
                            />
                        </div>
                        <h2
                            className={css({
                                fontSize: "md",
                                fontWeight: "semibold",
                                color: "neutral",
                            })}
                        >
                            Email
                        </h2>
                    </div>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                            lineHeight: "relaxed",
                        })}
                    >
                        Contactez notre équipe par email pour toute question ou demande d'assistance.
                    </p>
                    <a href="mailto:support@arrhes.com" className={css({})}>
                        <LinkContent>support@arrhes.com</LinkContent>
                    </a>
                </div>

                {/* GitHub */}
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        padding: "1.5rem",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        backgroundColor: "white",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                        })}
                    >
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "2.5rem",
                                height: "2.5rem",
                                borderRadius: "md",
                                backgroundColor: "background",
                            })}
                        >
                            <IconBrandGithub
                                className={css({
                                    width: "1.25rem",
                                    height: "1.25rem",
                                    color: "neutral",
                                })}
                            />
                        </div>
                        <h2
                            className={css({
                                fontSize: "md",
                                fontWeight: "semibold",
                                color: "neutral",
                            })}
                        >
                            GitHub
                        </h2>
                    </div>
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/60",
                            lineHeight: "relaxed",
                        })}
                    >
                        Signalez un bug, proposez une amélioration ou consultez le code source.
                    </p>
                    <a href="https://github.com/arrhes/arrhes" target="_blank" rel="noopener noreferrer">
                        <LinkContent>github.com/arrhes/arrhes</LinkContent>
                    </a>
                </div>
            </div>

            {/* Response time info */}
            <DocTip variant="info">
                Nous nous efforçons de répondre à toutes les demandes dans un délai de 48 heures ouvrées.
            </DocTip>

            {/* Documentation section */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                <h2
                    className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}
                >
                    Ressources utiles
                </h2>

                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    })}
                >
                    <LinkButton
                        to="/documentation/comptabilité"
                        className={css({
                            width: "100%",
                            gap: "0.75rem",
                            padding: "1rem",
                            borderRadius: "md",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            backgroundColor: "white",
                            transition: "all",
                            _hover: {
                                borderColor: "neutral/20",
                                backgroundColor: "neutral/3",
                            },
                        })}
                    >
                        <div>
                            <p
                                className={css({
                                    fontSize: "sm",
                                    fontWeight: "medium",
                                    color: "neutral",
                                })}
                            >
                                Cours de comptabilité
                            </p>
                            <p
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/50",
                                })}
                            >
                                Les bases de la comptabilité expliquées simplement
                            </p>
                        </div>
                    </LinkButton>

                    <LinkButton
                        to="/documentation/dashboard"
                        className={css({
                            width: "100%",
                            gap: "0.75rem",
                            padding: "1rem",
                            borderRadius: "md",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            backgroundColor: "white",
                            transition: "all",
                            _hover: {
                                borderColor: "neutral/20",
                                backgroundColor: "neutral/3",
                            },
                        })}
                    >
                        <div>
                            <p
                                className={css({
                                    fontSize: "sm",
                                    fontWeight: "medium",
                                    color: "neutral",
                                })}
                            >
                                Guide d'utilisation du dashboard
                            </p>
                            <p
                                className={css({
                                    fontSize: "xs",
                                    color: "neutral/50",
                                })}
                            >
                                Apprenez à utiliser Arrhes efficacement
                            </p>
                        </div>
                    </LinkButton>
                </div>
            </div>
        </DocRoot>
    )
}
