import './style.css'

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D

const BLOCK_SIZE = 20

/**
 * Number of blocks that fit on the board (width)
 */
const BOARD_WIDTH = 14

/**
 * Number of blocks that fit on the board (width)
 */
const BOARD_HEIGHT = 30

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
]

const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1],
  ],
}

/**
 * The function that is called every frame and is responsible for updating the game
 */
function update() {
  draw()

  requestAnimationFrame(update)
}

/**
 * The function that draws the game and is called every frame in the update() function
 */
function draw() {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value > 0) {
        context.fillStyle = '#f00'
        context.fillRect(x, y, 1, 1)
      }
    })
  })

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value > 0) {
        context.fillStyle = '#0f0'
        context.fillRect(piece.position.x + x, piece.position.y + y, 1, 1)
      }
    })
  })
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
    case 'a': // Combine cases for 'ArrowLeft' and 'a' as they perform the same action
      piece.position.x--
      if (checkCollision()) {
        piece.position.x++
        solidifyPiece()
      }
      break
    case 'ArrowRight':
    case 'd': // Combine cases for 'ArrowRight' and 'd'
      piece.position.x++
      if (checkCollision()) {
        piece.position.x--
        solidifyPiece()
      }
      break
    case 'ArrowDown':
    case 's': // Combine cases for 'ArrowDown' and 's'
      piece.position.y++
      if (checkCollision()) {
        piece.position.y--
        solidifyPiece()
        removeRows()
      }
      break
    // Add any additional cases here if needed
  }
})

function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value > 0 &&
        (piece.position.y + y >= BOARD_HEIGHT ||
          piece.position.x + x < 0 ||
          piece.position.x + x >= BOARD_WIDTH ||
          board[piece.position.y + y][piece.position.x + x] > 0)
      )
    })
  })
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value > 0) {
        board[piece.position.y + y][piece.position.x + x] = value
      }
    })
  })

  piece.position = { x: 5, y: 5 }
}

function removeRows() {
  const rowsToRemove: number[] = []
  board.forEach((row, y) => {
    if (row.every((value) => value > 0)) {
      rowsToRemove.push(y)
    }
  })

  rowsToRemove.forEach((y) => {
    board.splice(y, 1)
    const newRow = new Array(BOARD_WIDTH).fill(0)
    board.unshift(newRow)
  })
}

update()
