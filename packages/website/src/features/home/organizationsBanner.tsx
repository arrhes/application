import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBuilding } from "@tabler/icons-react"
import { Box } from "../../components/layouts/box.js"
import { LinkButton } from "../../components/linkButton.js"

export function OrganizationsBanner() {
    return (
        <Box className={css({ padding: "8", gap: "4" })}>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                })}
            >
                <h2 className={css({ fontSize: "2xl" })}>Mes organisations</h2>
                <p className={css({ color: "neutral/50" })}>Que vous avez créées ou auxquelles vous avez été invité</p>
            </div>
            <LinkButton to="/dashboard/organisations" className={css({ width: "fit-content" })}>
                <ButtonPlainContent leftIcon={<IconBuilding />} text="Voir mes organisations" />
            </LinkButton>
        </Box>
    )
}
