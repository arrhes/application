import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
    resolve: {
        alias: {
            "#": path.resolve(__dirname, "./src"),
            "@comptasse/application-metadata": path.resolve(
                __dirname,
                "../metadata/src/index.ts",
            ),
        },
    },
    test: {
        include: [
            "../../tests/api/**/*.test.ts",
        ],
        globals: true,
        testTimeout: 15000,
        hookTimeout: 30000,
        fileParallelism: false,
        transform: {
            "^.+\\.ts$": "tsx",
        },
        resolve: {
            conditions: ["source"],
        },
    },
})
