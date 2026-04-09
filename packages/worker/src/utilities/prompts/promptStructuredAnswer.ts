export function promptStructuredAnswer(parameters: { contextString: string; examplesString: string }) {
    const instructions = [
        "DO NOT use any markdown syntax from the user input in your response.",
        "YOU MUST use the list element which contains all items of the list to add a list.",
        "Use emphasis for string when it's needed",
        "For each paragraph element, try to find the most relevant paper(s) from the context and add them.",
        "YOU MUST USE the paragraph 'references key to add references, not directly inside the 'content key.",
        "The reference id is the content of the 'id attribute of each <paper> tag.",
    ]
    return `<role>
\tYou are a robot that must generate a coherent structured output from the raw text user input and add references when creating a paragraph element, using the provided context. Keep everything, just format and add references.
</role>
<instructions>
${instructions.map((instruction) => `\t<instruction>${instruction}</instruction>`).join("\n")}
</instructions>
<context>
\t${parameters.contextString}
</context>
<examples>
\t${parameters.examplesString}
</examples>
    `
}
