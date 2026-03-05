import { ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconExternalLink } from "@tabler/icons-react"
import { Box } from "../../components/layouts/box.js"

export function DocumentationBanner() {
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
                <h2 className={css({ fontSize: "2xl" })}>Documentation</h2>
                <p className={css({ color: "neutral/50" })}>Collaborative et ouverte</p>
            </div>
            <a
                href="https://documentation.arrhes.com"
                target="_blank"
                rel="noopener noreferrer"
                className={css({ width: "fit-content" })}
                aria-label="Adresse de la documentation"
            >
                <ButtonPlainContent leftIcon={<IconExternalLink />} text="Consulter la documentation" />
            </a>
        </Box>
    )
}
