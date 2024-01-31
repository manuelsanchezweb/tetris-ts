/**
 *  The size of each block in pixels
 */
export const BLOCK_SIZE = 16

/**
 * Number of blocks that fit on the board (width)
 */
export const BOARD_WIDTH = 14

/**
 * Number of blocks that fit on the board (width)
 */
export const BOARD_HEIGHT = 30

/**
 *  List of all key events that can be triggered by the user
 */
export const EVENT_MOVEMENTS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  UP: 'ArrowUp',
  A: 'a',
  D: 'd',
  S: 's',
  W: 'w',
}

export const PIECES = [
  [
    [1, 1],
    [1, 1],
  ],
  [[1, 1, 1, 1]],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 0],
    [1, 0],
    [1, 1],
  ],
  [
    [0, 1],
    [0, 1],
    [1, 1],
  ],
]
