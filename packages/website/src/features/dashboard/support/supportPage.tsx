import { readOrganizationSubscriptionRouteDefinition } from "@arrhes/application-metadata/routes"
import { ButtonOutlineContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconPlus } from "@tabler/icons-react"
import { Banner } from "../../../components/layouts/banner.tsx"
import { Box } from "../../../components/layouts/box.tsx"
import { Page } from "../../../components/layouts/page/page.tsx"
import { Section } from "../../../components/layouts/section/section.tsx"
import { getCookie } from "../../../utilities/cookies/getCookie.ts"
import { useDataFromAPI } from "../../../utilities/useHTTPData.ts"
import { cookiePrefix } from "../../../utilities/variables.ts"
import { CreateOneTicket } from "./createOneTicket.tsx"
import { TicketsListTable } from "./ticketsListTable.tsx"

function SupportBanner() {
    const hasOrganization = !!getCookie(`${cookiePrefix}_id_organization`)

    const subscription = useDataFromAPI({
        routeDefinition: readOrganizationSubscriptionRouteDefinition,
        body: {},
        enabled: hasOrganization,
    })

    if (!hasOrganization || subscription.isPending || subscription.isError) {
        return null
    }

    if (subscription.data?.isPremium) {
        return (
            <Banner variant="success" title="Support prioritaire">
                Vos tickets sont traités en priorité grâce à votre abonnement Avancé.
            </Banner>
        )
    }

    return (
        <Banner variant="information" title="Support standard">
            Abonnez-vous au plan Avancé pour bénéficier d'un traitement prioritaire de vos tickets.
        </Banner>
    )
}

export function SupportPage() {
    return (
        <Page.Root>
            <Page.Content>
                <SupportBanner />
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
                                <ButtonPlainContent leftIcon={<IconPlus />} text="Créer un ticket" />
                            </CreateOneTicket>
                        </div>
                        <TicketsListTable />
                    </Section.Item>
                </Section.Root>
                <Box className={css({ padding: "1rem", gap: "1rem" })}>
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
