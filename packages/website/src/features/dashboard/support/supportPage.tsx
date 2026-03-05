import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react"
import { Box } from "../../../components/layouts/box.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { ContactSupportForm } from "./contactSupportForm.tsx"

export function SupportPage() {
    return (
        <Page.Root>
            <Page.Content>
                <Box className={css({ padding: "4", gap: "4" })}>
                    <span>N'hésitez pas à contacter le support</span>
                    <ContactSupportForm />
                </Box>
                <Box className={css({ padding: "4", gap: "4" })}>
                    <span>Vous pouvez aussi nous contacter directement via les moyens suivant</span>
                    <div
                        className={css({
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            gap: "0.5rem",
                        })}
                    >
                        <a href="mailto:contact@arrhes.com">
                            <ButtonOutlineContent leftIcon={<IconMail />} text="Email" />
                        </a>
                        <a href="https://github.com/arrhes">
                            <ButtonOutlineContent leftIcon={<IconBrandGithub />} text="Github" />
                        </a>
                        <a href="https://linkedin.com/arrhes">
                            <ButtonOutlineContent leftIcon={<IconBrandLinkedin />} text="LinkedIn" />
                        </a>
                    </div>
                </Box>
            </Page.Content>
        </Page.Root>
    )
}
