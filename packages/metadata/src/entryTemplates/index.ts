export { amortizationTemplate, amortizationTemplateSchema } from "./amortization.js"
export {
    type AnyEntryTemplateDefinition,
    defineEntryTemplate,
    type EntryTemplateDefinition,
    type EntryTemplateLine,
    type EntryTemplateResult,
} from "./defineEntryTemplate.js"

import { amortizationTemplate } from "./amortization.js"
import type { AnyEntryTemplateDefinition } from "./defineEntryTemplate.js"

export const entryTemplateDefinitions: AnyEntryTemplateDefinition[] = [
    amortizationTemplate,
]

export function buildEntryTemplatesDocumentation(): string {
    return entryTemplateDefinitions.map((t) => `### ${t.label} (clé : "${t.key}")\n${t.description}`).join("\n\n")
}
