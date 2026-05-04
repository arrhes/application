import { signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, Logo, PageNavigation } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLogout, IconTicket } from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { LinkButton } from "../../components/linkButton.js"
import { adminRouter } from "../../routes/adminRouter.js"
import { deleteCookies } from "../../utilities/cookies/deleteCookies.js"
import { getResponseBodyFromAPI } from "../../utilities/getResponseBodyFromAPI.js"

export function AdminDashboardLayout() {
    return (
        <div
            className={css({
                width: "100%",
                minHeight: "100vh",
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
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "xl",
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
                            gap: "0.75rem",
                        })}
                    >
                        <LinkButton to="/">
                            <ButtonGhostContent leftIcon={<Logo />} text="Admin" />
                        </LinkButton>
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
                        <Button
                            onClick={async () => {
                                try {
                                    await getResponseBodyFromAPI({
                                        routeDefinition: signOutRouteDefinition,
                                        body: {},
                                    })
                                } catch {
                                    // If the API is unreachable, we still want to
                                    // log the admin out on the client side.
                                }

                                deleteCookies()

                                adminRouter.navigate({
                                    to: "/connexion",
                                    reloadDocument: true,
                                })
                            }}
                        >
                            <ButtonGhostContent leftIcon={<IconLogout />} color="danger" />
                        </Button>
                    </nav>
                </div>
            </header>

            {/* Navigation */}
            <PageNavigation
                tabs={[
                    {
                        label: "Tickets",
                        icon: <IconTicket />,
                        to: "/dashboard/tickets",
                    },
                ]}
            />

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
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "xl",
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                    })}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
