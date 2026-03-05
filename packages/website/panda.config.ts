import { defineConfig } from "@pandacss/dev"
import uiConfig from "../ui/panda.config"

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["../ui/src/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Inherit theme and global styles from UI package
    theme: uiConfig.theme,
    globalCss: uiConfig.globalCss,

    // Import map for the UI package
    importMap: "@arrhes/ui",

    // The output directory for your css system
    outdir: "styled-system",

    // Use JSX style props
    jsxFramework: "react",
})
