export function estimateTokens(parameters: { string: string }) {
    const charsNumber = parameters.string.length
    const tokensNumber = charsNumber / 4
    // 1 token = 4 chars
    // 1 word = 1.3 to
    return tokensNumber
}
