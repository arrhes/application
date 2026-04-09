// Michaelis–Menten or Hill equation
// k = y_0/(x_0*(1-y_0))
export function rationalFunction(parameters: { x: number; k?: number }) {
    const x = parameters.x
    const k = parameters.k ?? 1
    return (k * x) / (k * x + 1)
}
