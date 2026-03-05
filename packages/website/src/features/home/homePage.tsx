import { Badge, ButtonGhostContent, ButtonOutlineContent, ButtonPlainContent, Logo } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook2, IconBrandGithub, IconGavel, IconUser } from "@tabler/icons-react"
import { LinkButton } from "../../components/linkButton.js"
import { HeroIllustration } from "./heroIllustration.js"
import { Pricing } from "./pricing.js"

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
                    borderColor: "neutral/10",
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
                        gap: "1rem",
                    })}
                >
                    <LinkButton to="/">
                        <Logo withText />
                    </LinkButton>
                    <nav
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        })}
                    >
                        <a href="https://github.com/arrhes" target="_blank" rel="noopener noreferrer">
                            <ButtonGhostContent leftIcon={<IconBrandGithub />} />
                        </a>
                        <LinkButton to="/documentation">
                            <ButtonOutlineContent leftIcon={<IconBook2 />} text="Documentation" />
                        </LinkButton>
                        <LinkButton to="/dashboard">
                            <ButtonPlainContent text="Dashboard" />
                        </LinkButton>
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
                            alignItems: { base: "center", md: "start" },
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
                                textAlign: { base: "center", md: "left" },
                            })}
                        >
                            Le logiciel de comptabilité moderne et intuitif,
                            <br />
                            pour les{" "}
                            <span
                                className={css({
                                    fontSize: "inherit",
                                    color: "primary",
                                    fontWeight: "semibold",
                                })}
                            >
                                entreprises
                            </span>{" "}
                            et{" "}
                            <span
                                className={css({
                                    fontSize: "inherit",
                                    color: "primary",
                                    fontWeight: "semibold",
                                })}
                            >
                                associations
                            </span>
                            .
                        </h1>

                        <div
                            className={css({
                                marginTop: "1rem",
                                display: "flex",
                                flexDirection: { base: "column", sm: "row" },
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <LinkButton to="/inscription">
                                <ButtonPlainContent leftIcon={<IconUser />} text="Créer un compte" />
                            </LinkButton>
                            <LinkButton to="/documentation">
                                <ButtonOutlineContent leftIcon={<IconBook2 />} text="En savoir plus" />
                            </LinkButton>
                        </div>
                    </div>

                    {/* Illustration */}
                    <div
                        className={css({
                            display: { base: "none", md: "flex" },
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

            {/* Pricing Section */}
            <section
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    paddingX: "1rem",
                    paddingY: "4rem",
                    backgroundColor: "white",
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
                            fontSize: "lg",
                            fontWeight: "bold",
                            color: "neutral",
                        })}
                    >
                        Pourquoi choisir Arrhes ?
                    </h2>
                    <p
                        className={css({
                            fontSize: "md",
                            color: "neutral/60",
                        })}
                    >
                        Un logiciel de comptabilité conçu pour être simple et transparent, tout en respectant les
                        exigences de la comptabilité française.
                        <br />
                        Il s'adresse à tous ceux qui souhaitent reprendre la main sur leur comptabilité.
                    </p>

                    {/* Pricing columns */}
                    <Pricing />
                </div>
            </section>

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
                        Apprenez les concepts essentiels : partie double, plan comptable, écritures, journaux...
                    </p>
                    <LinkButton to="/documentation/comptabilité">
                        <ButtonOutlineContent leftIcon={<IconBook2 />} text="Découvrir le cours" />
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
                        <ButtonGhostContent leftIcon={<IconGavel />} text="Mentions légales" />
                    </LinkButton>
                </div>
            </footer>
        </div>
    )
}
