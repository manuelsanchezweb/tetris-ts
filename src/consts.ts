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

export const COLORS = [
  'black',
  'yellow',
  'cyan',
  'darkviolet',
  'red',
  'lightgreen',
  'orange',
  'blue',
]

export const PIECES = [
  [
    // la pieza amarilla
    [1, 1],
    [1, 1],
  ],
  [[2, 2, 2, 2]],
  [
    // es la pieza lila
    [0, 3, 0],
    [3, 3, 3],
  ],
  [
    // la pieza roja
    [4, 4, 0],
    [0, 4, 4],
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
  ],
  [
    [6, 0],
    [6, 0],
    [6, 6],
  ],
  [
    [0, 7],
    [0, 7],
    [7, 7],
  ],
]
