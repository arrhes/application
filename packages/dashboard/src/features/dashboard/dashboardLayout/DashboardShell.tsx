import { signOutRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonOutlineContent, CircularLoader, LinkButton, Logo, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconBook2,
    IconExternalLink,
    IconHeart,
    IconLogout,
    IconSettings,
    IconUser,
} from "@tabler/icons-react"
import { Outlet, useRouter } from "@tanstack/react-router"
import { Suspense, useRef } from "react"
import { Popover } from "../../../components/overlays/popover/popover.js"
import { useSidebarContext } from "../../../contexts/sidebar/SidebarContext.js"
import { deleteCookies } from "../../../utilities/cookies/deleteCookies.js"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.js"
import { SidebarNavigation } from "./SidebarNavigation.js"

export function DashboardShell() {
    const sidebar = useSidebarContext()
    const router = useRouter()
    const sidebarRef = useRef<HTMLDivElement>(null)

    return (
        <div
            className={css({
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
                overflow: "hidden",
            })}
        >
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                style={{
                    width: sidebar.width,
                }}
                className={css({
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    borderRight: "1px solid",
                    borderRightColor: "neutral/10",
                    backgroundColor: "background",
                })}
            >
                {/* Sidebar top: logo */}
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        padding: "1rem",
                        borderBottom: "1px solid",
                        borderBottomColor: "neutral/10",
                        flexShrink: 0,
                    })}
                >
                    <LinkButton
                    to="/organisations"
                    >
                        <ButtonGhostContent
                            leftIcon={<Logo />}
                            text="Arrhes"
                            className={{                            }}
                        />
                    </LinkButton>
                </div>

                {/* Navigation tree */}
                <div
                    className={css({
                        flex: 1,
                        overflowY: "auto",
                        overflowX: "hidden",
                                 padding: "1rem",
   })}
                >
                    <SidebarNavigation />
                </div>

                {/* Sidebar bottom: docs, donate, user menu */}
                <div
                    className={css({
                        borderTop: "1px solid",
                        borderTopColor: "neutral/10",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        flexShrink: 0,
                    })}
                >
                    <Button
                        onClick={() =>
                            window.open(
                                `${import.meta.env.VITE_WEBSITE_BASE_URL ?? ""}/documentation`,
                                "_blank",
                                "noopener,noreferrer",
                            )
                        }
                        title="Documentation"
                        className={{ width: "100%" }}
                    >
                        <ButtonGhostContent
                            leftIcon={<IconBook2 />}
                            text="Documentation"
                                                  rightIcon={<IconExternalLink/>}
      className={{ width: "100%", justifyContent: "start" }}
                        />
                    </Button>
                    <Button
                        onClick={() =>
                            window.open(
                                "https://payment-links.mollie.com/payment/QHxRXo6269KKB2fUa3YcR",
                                "_blank",
                                "noopener,noreferrer",
                            )
                        }
                        title="Faire un don"
                        className={{ width: "100%" }}
                    >
                        <ButtonGhostContent
                            leftIcon={<IconHeart />}
                            text="Faire un don"
                            rightIcon={<IconExternalLink/>}
                            className={{ width: "100%", justifyContent: "start" }}
                        />
                    </Button>
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <Button title="Utilisateur" className={{ width: "100%" }}>
                                <ButtonOutlineContent
                                    leftIcon={<IconUser />}
                                    text="Utilisateur"
                                    className={{ width: "100%", justifyContent: "start" }}
                                />
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content
                            align="end"
                            side="top"
                            className={{
                                padding: "0.5rem",
                                gap: "0.25rem",
                            }}
                        >
                            <Button
                                onClick={() => router.navigate({ to: "/paramètres" })}
                                className={{ width: "100%" }}
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconSettings />}
                                    text="Paramètres"
                                    className={{ width: "100%", justifyContent: "start" }}
                                />
                            </Button>
                            {/* <Separator /> */}
                            <Button
                                className={{ width: "100%" }}
                                onClick={async () => {
                                    try {
                                        await getResponseBodyFromAPI({
                                            routeDefinition: signOutRouteDefinition,
                                            body: {},
                                        })
                                    } catch {
                                        // If the API is unreachable, still log out client-side.
                                    }
                                    deleteCookies()
                                    toast({ title: "Déconnexion réussie", variant: "success" })
                                    router.navigate({ to: "/connexion", reloadDocument: true })
                                }}
                            >
                                <ButtonGhostContent
                                    leftIcon={<IconLogout />}
                                    text="Se déconnecter"
                                    color="danger"
                                    className={{ width: "100%", justifyContent: "start" }}
                                />
                            </Button>
                        </Popover.Content>
                    </Popover.Root>
                </div>
            </div>

            {/* Sidebar resize handle */}
            <div
                className={css({
                    flexShrink: 0,
                    width: "4px",
                    cursor: "col-resize",
                    background: "transparent",
                    transition: "background 0.15s",
                    _hover: { background: "neutral/5", },
                })}
                onMouseDown={(e) => {
                    const startX = e.clientX
                    const startW = sidebar.width
                    const onMove = (ev: MouseEvent) => {
                        const newWidth = Math.max(200, startW + (ev.clientX - startX))
                        if (sidebarRef.current) {
                            sidebarRef.current.style.width = `${newWidth}px`
                        }
                    }
                    const onUp = () => {
                        if (sidebarRef.current) {
                            const finalWidth = Number.parseInt(sidebarRef.current.style.width, 10)
                            sidebar.setWidth(finalWidth)
                        }
                        window.removeEventListener("mousemove", onMove)
                        window.removeEventListener("mouseup", onUp)
                        document.body.style.cursor = ""
                    }
                    document.body.style.cursor = "col-resize"
                    window.addEventListener("mousemove", onMove)
                    window.addEventListener("mouseup", onUp)
                }}
            />

            {/* Main content */}
            <div
                className={css({
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    backgroundColor: "white",
                })}
            >
                <Suspense fallback={<CircularLoader />}>
                    <Outlet />
                </Suspense>
            </div>

            
        </div>
    )
}
