import { Badge, ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent, Logo } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook2, IconBrandGithub, IconBrandLinkedin, IconGavel, IconHeart, IconUser } from "@tabler/icons-react"
import { LinkButton } from "../../components/LinkButton.js"
import { Features } from "./Features.tsx"
import { HeroIllustration } from "./HeroIllustration.js"

export function HomePage() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "fit-content",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
            })}
        >
            {/* Header */}
            <header
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    padding: "1rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    backgroundColor: "white",
                    position: "sticky",
                    top: "0",
                    zIndex: "10",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "xl",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        flexWrap: "wrap",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "0.25rem",
                        })}
                    >
                        <LinkButton to="/">
                            <ButtonGhostContent
                                leftIcon={<Logo />}
                                text="Arrhes"
                            />
                        </LinkButton>
                    </div>
                    <nav
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        <LinkButton to="/documentation">
                            <ButtonOutlineContent
                                leftIcon={<IconBook2 />}
                                text="Documentation"
                            />
                        </LinkButton>
                        <a
                            href={import.meta.env.VITE_DASHBOARD_BASE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ButtonPlainContent text="Dashboard" />
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    paddingX: "1rem",
                    paddingY: "4rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "xl",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "3rem",
                    })}
                >
                    {/* Content */}
                    <div
                        className={css({
                            flex: "1",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: {
                                base: "center",
                                md: "start",
                            },
                            gap: "1rem",
                        })}
                    >
                        <Badge>Open source</Badge>

                        <h1
                            className={css({
                                fontSize: "lg",
                                fontWeight: "300",
                                color: "neutral",
                                lineHeight: "normal",
                                letterSpacing: "normal",
                                textAlign: {
                                    base: "center",
                                    md: "left",
                                },
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
                                marginTop: "1rem",
                                display: "flex",
                                flexDirection: {
                                    base: "column",
                                    sm: "row",
                                },
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <LinkButton to="/inscription">
                                <ButtonPlainContent
                                    leftIcon={<IconUser />}
                                    text="Créer un compte"
                                />
                            </LinkButton>
                            <LinkButton to="/documentation">
                                <ButtonOutlineContent
                                    leftIcon={<IconBook2 />}
                                    text="En savoir plus"
                                />
                            </LinkButton>
                        </div>
                    </div>

                    {/* Illustration */}
                    <div
                        className={css({
                            display: {
                                base: "none",
                                md: "flex",
                            },
                            justifyContent: "center",
                            alignItems: "center",
                            // flex: "1",
                            // maxWidth: "20rem",
                        })}
                    >
                        <HeroIllustration />
                    </div>
                </div>
            </section>

            <Features />

            {/* Documentation CTA */}
            <section
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    paddingX: "1rem",
                    paddingY: "4rem",
                    // backgroundColor: "white",
                    borderTop: "1px solid",
                    borderTopColor: "neutral/10",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "xl",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "2rem",
                    })}
                >
                    <h2
                        className={css({
                            fontSize: "xl",
                            fontWeight: "bold",
                            color: "neutral",
                        })}
                    >
                        Nouveau en comptabilité ?
                    </h2>
                    <p
                        className={css({
                            color: "neutral/60",
                            lineHeight: "relaxed",
                        })}
                    >
                        Notre documentation inclut un cours sur les bases de la comptabilité française.
                        <br />
                        Apprenez les concepts essentiels : partie double, plan comptable, écritures, journaux…
                    </p>
                    <LinkButton to="/documentation/comptabilité">
                        <ButtonOutlineContent
                            leftIcon={<IconBook2 />}
                            text="Découvrir le cours"
                        />
                    </LinkButton>
                </div>
            </section>

            {/* Footer */}
            <footer
                className={css({
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "start",
                    padding: "1rem",
                    borderTop: "1px solid",
                    borderTopColor: "neutral/10",
                    backgroundColor: "white",
                    marginTop: "auto",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "xl",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                    })}
                >
                    {/* <span>
                        Arrhes
                        {/* [2024-{(new Date()).getFullYear()}] 
                    </span>*/}
                    {/* <Button
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' }); 
                        }}
                    >
                        <Logo withText />
                    </Button> */}
                    <LinkButton to="/documentation/mentions-légales">
                        <ButtonGhostContent
                            leftIcon={<IconGavel />}
                            text="Mentions légales"
                        />
                    </LinkButton>
                    <a
                        href="https://payment-links.mollie.com/payment/QHxRXo6269KKB2fUa3YcR"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <ButtonGhostContent
                            leftIcon={<IconHeart />}
                            text="Faire un don"
                        />
                    </a>
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            gap: "0.25rem",
                        })}
                    >
                        <a
                            href="https://linkedin.com/company/arrhes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ButtonGhostContent leftIcon={<IconBrandLinkedin />} />
                        </a>
                        <a
                            href="https://github.com/arrhes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <ButtonGhostContent leftIcon={<IconBrandGithub />} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
