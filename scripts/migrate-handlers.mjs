/**
 * Batch migration script: updates all API handler files to use registerRoute()
 * instead of apiFactory.createApp().post(routeDef.path, ...).
 *
 * Run from the monorepo root:
 *   node scripts/migrate-handlers.mjs
 */

import { readFileSync, writeFileSync } from "node:fs"
import { glob } from "node:fs/promises"
import { join } from "node:path"

const ROOT = new URL("../packages/api/src/routes", import.meta.url).pathname

let filesUpdated = 0
let filesSkipped = 0

for await (const entry of glob("**/*.ts", {
    cwd: ROOT,
})) {
    // Skip aggregator route files (they just import + chain sub-routes)
    if (entry.endsWith("Routes.ts") || entry.endsWith("Route.ts")) {
        filesSkipped++
        continue
    }

    const filePath = join(ROOT, entry)
    const original = readFileSync(filePath, "utf8")
    let updated = original

    // Match: apiFactory.createApp().post(someRouteDefinition.path, async (c) => {
    // Replace with: registerRoute(someRouteDefinition, async (c) => {
    // Also handles .get(), .patch(), .delete() (idempotent - already migrated)
    const methodPattern =
        /apiFactory\.createApp\(\)\.(post|get|patch|delete)\((\w+(?:RouteDefinition|route)?)\.path,\s*/g

    if (!methodPattern.test(updated)) {
        filesSkipped++
        continue
    }

    // Reset lastIndex after test()
    updated = original.replace(
        /apiFactory\.createApp\(\)\.(post|get|patch|delete)\((\w+(?:RouteDefinition)?)\.path,\s*/g,
        "registerRoute($2, ",
    )

    if (updated === original) {
        filesSkipped++
        continue
    }

    // Replace apiFactory import with registerRoute import (add if missing)
    if (!updated.includes("registerRoute")) {
        // Should not happen since we just added it above - safety check
        filesSkipped++
        continue
    }

    // Update import: replace apiFactory.js import with registerRoute.js
    // Keep apiFactory import only if still used elsewhere in the file
    if (!updated.includes("apiFactory") || updated.match(/apiFactory/g)?.length === 1) {
        // Only referenced in remaining import - swap it
        updated = updated.replace(
            /import \{ apiFactory \} from ["']([^"']+apiFactory\.js)["']/,
            'import { registerRoute } from "$1".replace("apiFactory", "registerRoute")',
        )
    }

    // Simpler: just add registerRoute import after the apiFactory import if not present
    // (The above regex-in-string replacement won't work - do it properly)
    updated = original.replace(
        /apiFactory\.createApp\(\)\.(post|get|patch|delete)\((\w+(?:RouteDefinition)?)\.path,\s*/g,
        "registerRoute($2, ",
    )

    // Add registerRoute import; replace or augment apiFactory import line
    const apiFactoryImportRegex = /import \{ apiFactory \} from "([^"]+apiFactory\.js)"/
    const apiFactoryImportRegexRelative = /import \{ apiFactory \} from '([^']+apiFactory\.js)'/
    const match = updated.match(apiFactoryImportRegex) || updated.match(apiFactoryImportRegexRelative)

    if (match) {
        const quote = updated.includes(`import { apiFactory } from "`) ? `"` : `'`
        const importPath = match[1]
        const registerRoutePath = importPath.replace("apiFactory.js", "registerRoute.js")

        if (updated.includes("apiFactory")) {
            // Still used elsewhere - add registerRoute as addtional import
            updated = updated.replace(
                new RegExp(`import \\{ apiFactory \\} from ${quote}${escapeRegex(importPath)}${quote}`),
                `import { apiFactory } from ${quote}${importPath}${quote}\nimport { registerRoute } from ${quote}${registerRoutePath}${quote}`,
            )
        } else {
            // Not used anymore - replace import
            updated = updated.replace(
                new RegExp(`import \\{ apiFactory \\} from ${quote}${escapeRegex(importPath)}${quote}`),
                `import { registerRoute } from ${quote}${registerRoutePath}${quote}`,
            )
        }
    }

    if (updated !== original) {
        writeFileSync(filePath, updated, "utf8")
        filesUpdated++
        console.log(`✓ ${entry}`)
    } else {
        filesSkipped++
    }
}

console.log(`\nDone. Updated: ${filesUpdated}, Skipped: ${filesSkipped}`)

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}
