import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconPlus } from "@tabler/icons-react"
import { Box } from "../../../components/layouts/Box.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { Section } from "../../../components/layouts/section/section.tsx"
import { CreateOneTicket } from "./CreateOneTicket.tsx"
import { TicketsListTable } from "./TicketsListTable.tsx"

export function SupportPage() {
    return (
        <Page.Root>
            <Page.Content>
                <Section.Root>
                    <Section.Item>
                        <div
                            className={css({
                                width: "100%",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center",
                                gap: "0.5rem",
                            })}
                        >
                            <CreateOneTicket>
                                <ButtonPlainContent
                                    leftIcon={<IconPlus />}
                                    text="Créer un ticket"
                                />
                            </CreateOneTicket>
                        </div>
                        <TicketsListTable />
                    </Section.Item>
                </Section.Root>
                <Box
                    className={css({
                        padding: "1rem",
                        gap: "1rem",
                    })}
                >
                    <span>Vous pouvez aussi nous contacter directement via</span>
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                        })}
                    >
                        <a href="mailto:contact@arrhes.com">
                            <ButtonOutlineContent
                                leftIcon={<IconMail />}
                                text="Email"
                            />
                        </a>
                        <a href="https://github.com/arrhes">
                            <ButtonOutlineContent
                                leftIcon={<IconBrandGithub />}
                                text="Github"
                            />
                        </a>
                        <a href="https://linkedin.com/arrhes">
                            <ButtonOutlineContent
                                leftIcon={<IconBrandLinkedin />}
                                text="LinkedIn"
                            />
                        </a>
                    </div>
                </Box>
            </Page.Content>
        </Page.Root>
    )
}
