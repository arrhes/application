import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronLeft } from "@tabler/icons-react"
import { Outlet } from "@tanstack/react-router"
import { Page } from "../../../../components/layouts/page/page.tsx"
import { Section } from "../../../../components/layouts/section/section.tsx"
import { LinkButton } from "../../../../components/linkButton.tsx"

export function TicketLayout() {
    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <Section.Item className={css({ flexDirection: "row" })}>
                        <div
                            className={css({
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <LinkButton to="/dashboard/support" params={{}}>
                                <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                            </LinkButton>
                        </div>
                    </Section.Item>
                </Section.Root>
                <Outlet />
            </Page.Content>
        </Page.Root>
    )
}
