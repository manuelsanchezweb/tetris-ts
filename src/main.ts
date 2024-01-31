import {
  BLOCK_SIZE,
  BOARD_HEIGHT,
  BOARD_WIDTH,
  EVENT_MOVEMENTS,
  PIECES,
} from './consts'
import { generateZeroFilledArray } from './helpers'
import './style.css'

const canvas = document.querySelector('canvas') as HTMLCanvasElement
const context = canvas.getContext('2d') as CanvasRenderingContext2D
const $score = document.querySelector('#score') as HTMLSpanElement
const $startButton = document.querySelector('#start') as HTMLButtonElement

let score = 0

canvas.width = BLOCK_SIZE * BOARD_WIDTH
canvas.height = BLOCK_SIZE * BOARD_HEIGHT

context.scale(BLOCK_SIZE, BLOCK_SIZE)

const board = generateZeroFilledArray(BOARD_HEIGHT, BOARD_WIDTH)

const piece = {
  position: { x: 5, y: 5 },
  shape: [
    [1, 1],
    [1, 1],
  ],
}

type Piece = {
  position: { x: number; y: number }
  shape: number[][]
}

const NEXT_DROP_TIME = 300

/**
 * Tracks the time (in milliseconds) since the last piece drop occurred.
 */
let dropCounter = 0

/**
 * Stores the timestamp of the last frame that was rendered.
 */
let lastTime = 0

/**
 * The function that is called every frame and is responsible for updating the game
 */
function update(time = 0) {
  /**
   * Difference in time between the current frame and the last frame
   */
  const deltaTime = time - lastTime
  lastTime = time // reset lastTime to the current time
  dropCounter += deltaTime

  if (dropCounter > NEXT_DROP_TIME) {
    piece.position.y++
    if (checkCollision()) {
      piece.position.y--
      solidifyPiece()
      removeRows()
    }
    dropCounter = 0 // reset dropCounter
  }

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

  $score.innerText = score.toString()
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case EVENT_MOVEMENTS.LEFT:
    case EVENT_MOVEMENTS.A: // Combine cases for 'ArrowLeft' and 'a' as they perform the same action
      piece.position.x--
      if (checkCollision()) {
        piece.position.x++
        solidifyPiece()
      }
      break
    case EVENT_MOVEMENTS.RIGHT:
    case EVENT_MOVEMENTS.D: // Combine cases for 'ArrowRight' and 'd'
      piece.position.x++
      if (checkCollision()) {
        piece.position.x--
        solidifyPiece()
      }
      break
    case EVENT_MOVEMENTS.DOWN:
    case EVENT_MOVEMENTS.S: // Combine cases for 'ArrowDown' and 's'
      piece.position.y++
      if (checkCollision()) {
        piece.position.y--
        solidifyPiece()
        removeRows()
      }
      break
    // Add any additional cases here if needed
    case EVENT_MOVEMENTS.UP:
    case EVENT_MOVEMENTS.W:
      // rotate
      rotate(piece)
      break
  }
})

function rotate(piece: Piece) {
  const rotated = []

  for (let i = 0; i < piece.shape[0].length; i++) {
    const row = []

    for (let j = piece.shape.length - 1; j >= 0; j--) {
      row.push(piece.shape[j][i])
    }

    rotated.push(row)
  }

  const previousShape = piece.shape
  piece.shape = rotated

  if (checkCollision()) {
    piece.shape = previousShape
  }
}

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

  // get randome shape
  piece.shape = PIECES[Math.floor(Math.random() * PIECES.length)]
  piece.position = { x: Math.floor(BOARD_WIDTH / 2 - 2), y: 0 }

  if (checkCollision()) {
    alert('Game Over!')
    board.forEach((row) => row.fill(0))
  }
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
    score += 10
  })
}

$startButton.addEventListener('click', () => {
  update()

  $startButton.remove()

  const audio = new Audio('./tetris.mp3')
  audio.loop = true
  audio.play()
  audio.volume = 0.1
})
