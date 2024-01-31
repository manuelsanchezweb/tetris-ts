/**
 * Generates a two-dimensional array filled with zeros.
 * @param lines The number of lines (arrays) to generate.
 * @param zeros The number of zeros in each line (array).
 * @returns A two-dimensional array with the specified number of lines and zeros per line.
 */
export function generateZeroFilledArray(
  lines: number,
  zeros: number
): number[][] {
  // Create an array of the specified number of lines.
  const board = new Array(lines).fill(null).map(() =>
    // For each line, create an array filled with the specified number of zeros.
    new Array(zeros).fill(0)
  )
  return board
}
