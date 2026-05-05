import { defineConfig } from "@pandacss/dev"
import uiConfig from "../ui/panda.config"

export default defineConfig({
    preflight: true,
    include: ["../ui/src/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    exclude: [],
    theme: uiConfig.theme,
    globalCss: uiConfig.globalCss,
    importMap: "@arrhes/ui",
    outdir: "styled-system",
    jsxFramework: "react",
})
