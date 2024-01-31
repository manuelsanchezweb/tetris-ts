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

// Initialize Game Loop
function update() {
  draw()

  requestAnimationFrame(update)
}

function draw() {
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
}

update()
