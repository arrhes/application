import { sigmoid } from "#src/utilities/math/sigmoidFunction.js"

/**
 * Computes the logistic function for a given input value.
 * @param parameters.x - The input value
 * @param parameters.m - The midpoint of the function
 * @param parameters.k - The steepness of the function
 */
export function logisticFunction(parameters: { x: number; m: number; k: number }) {
    return sigmoid(-parameters.k * (parameters.x - parameters.m))
}
