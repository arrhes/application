import { DocCode } from "./components/document/DocCode.tsx"
import { DocCodeBlock } from "./components/document/DocCodeBlock.tsx"
import { DocDefinition } from "./components/document/DocDefinition.tsx"
import { DocExample } from "./components/document/DocExample.tsx"
import { DocGlossaryEntry } from "./components/document/DocGlossaryEntry.tsx"
import { DocHeader } from "./components/document/DocHeader.tsx"
import { DocImplementationTabs } from "./components/document/DocImplementationTabs.tsx"
import { DocIndexLink } from "./components/document/DocIndexLink.tsx"
import { DocLink } from "./components/document/DocLink.tsx"
import { DocLinkCard } from "./components/document/DocLinkCard.tsx"
import { DocList } from "./components/document/DocList.tsx"
import { DocParagraph } from "./components/document/DocParagraph.tsx"
import { DocRoot } from "./components/document/DocRoot.tsx"
import { DocRouteRequest } from "./components/document/DocRouteRequest.tsx"
import { DocSection } from "./components/document/DocSection.tsx"
import { DocSectionCard } from "./components/document/DocSectionCard.tsx"
import { DocSectionRoot } from "./components/document/DocSectionRoot.tsx"
import { DocSectionTitle } from "./components/document/DocSectionTitle.tsx"
import { DocSourceRef } from "./components/document/DocSourceRef.tsx"
import { DocSources } from "./components/document/DocSources.tsx"
import { DocTable } from "./components/document/DocTable.tsx"
import { DocTextSection } from "./components/document/DocTextSection.tsx"
import { DocTip } from "./components/document/DocTip.tsx"

const components = {
    DocCode,
    DocCodeBlock,
    DocDefinition,
    DocExample,
    DocGlossaryEntry,
    DocHeader,
    DocImplementationTabs,
    DocIndexLink,
    DocLink,
    DocLinkCard,
    DocList,
    DocParagraph,
    DocRoot,
    DocRouteRequest,
    DocSection,
    DocSectionCard,
    DocSectionRoot,
    DocSectionTitle,
    DocSourceRef,
    DocSources,
    DocTable,
    DocTextSection,
    DocTip,
}

export const mdxComponents = components

export function useMDXComponents() {
    return components
}
