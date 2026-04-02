import { signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonOutlineContent, Logo, Separator, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook2, IconBuildings, IconLifebuoy, IconLogout, IconUser } from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { LinkButton } from "../../components/linkButton.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { applicationRouter } from "../../routes/applicationRouter.js"
import { deleteCookies } from "../../utilities/cookies/deleteCookies.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"
import { Breadcrumbs } from "../breadcrumbs.js"

export function DashboardLayout() {
    return (
        <div
            className={css({
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
                overflow: "hidden",
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
                    flexShrink: 0,
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        // maxWidth: "xl",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "1rem",
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                        })}
                    >
                        <LinkButton to="/dashboard">
                            <ButtonGhostContent
                                leftIcon={<Logo />}
                                // text="Dashboard"
                            />
                        </LinkButton>
                        <Breadcrumbs />
                    </div>
                    <nav
                        className={css({
                            display: "flex",
                            justifyContent: "end",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                        })}
                    >
                        <LinkButton to="/documentation" target="_blank" rel="noopener noreferrer" title="Documentation">
                            <ButtonGhostContent leftIcon={<IconBook2 />} />
                        </LinkButton>
                        <LinkButton to="/dashboard/organisations" title="Organisations">
                            <ButtonOutlineContent leftIcon={<IconBuildings />} />
                        </LinkButton>
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <Button title="Utilisateur">
                                    <ButtonOutlineContent leftIcon={<IconUser />} />
                                </Button>
                            </Popover.Trigger>
                            <Popover.Content align="end" className={css({ padding: "0.5rem" })}>
                                <LinkButton to="/dashboard/support" className={css({ width: "100%" })}>
                                    <ButtonGhostContent
                                        leftIcon={<IconLifebuoy />}
                                        text="Support"
                                        className={css({ width: "100%", justifyContent: "start" })}
                                    />
                                </LinkButton>
                                <Separator />
                                <Button
                                    className={css({ width: "100%" })}
                                    onClick={async () => {
                                        try {
                                            await getResponseBodyFromAPI({
                                                routeDefinition: signOutRouteDefinition,
                                                body: {},
                                            })
                                        } catch {
                                            // If the API is unreachable, we still want to
                                            // log the user out on the client side.
                                        }

                                        deleteCookies()
                                        toast({ title: "Déconnexion réussie", variant: "success" })

                                        applicationRouter.navigate({
                                            to: "/connexion",
                                            reloadDocument: true,
                                        })
                                    }}
                                >
                                    <ButtonGhostContent
                                        leftIcon={<IconLogout />}
                                        text="Se déconnecter"
                                        color="danger"
                                        className={css({ width: "100%", justifyContent: "start" })}
                                    />
                                </Button>
                            </Popover.Content>
                        </Popover.Root>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <div
                className={css({
                    width: "100%",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    backgroundColor: "white",
                    minHeight: 0,
                    overflow: "hidden",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        // maxWidth: "xl",
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        overflow: "auto",
                    })}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
