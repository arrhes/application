export function normalizedLinearFunction(parameters: { x: number; xMin: number; xMax: number }) {
    if (parameters.xMax === parameters.xMin) {
        return 0
    }
    return (parameters.x - parameters.xMin) / (parameters.xMax - parameters.xMin)
}
