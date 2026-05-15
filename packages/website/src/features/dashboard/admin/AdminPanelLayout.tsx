import { PageNavigation } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconTicket } from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"

export function AdminPanelLayout() {
    return (
        <div
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                flex: 1,
            })}
        >
            <PageNavigation
                tabs={[
                    {
                        label: "Tickets",
                        icon: <IconTicket />,
                        to: "/dashboard/admin/tickets",
                    },
                ]}
            />
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    padding: "1rem",
                })}
            >
                <Outlet />
            </div>
        </div>
    )
}
