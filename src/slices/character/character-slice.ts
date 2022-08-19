import { createSlice } from '@reduxjs/toolkit'
import { Apple, DIRECTION, Game, Snake, SnakeBlock } from '@/types'
import { BLOCK_HEIGHT, BLOCK_WIDTH, DEFAULT_SNAKE_LENGTH, LENGTH_STEP, MAX_SPEED, SCREEN_HEIGHT, SCREEN_WIDTH } from '@/constants'

const initialState: {
  snake: Snake
  apple: Apple
  game: Game
} = {
  snake: {
    blocks: [],
    startLength: 0,
    direction: 'RIGHT',
    isDirectionChanging: false,
    isDead: false,
  },
  apple: {
    width: BLOCK_WIDTH,
    height: BLOCK_HEIGHT,
    yPos: 0,
    xPos: 0,
  },
  game: {
    score: 0,
    speed: 1,
    length: DEFAULT_SNAKE_LENGTH,
  },
}

const isAppleOnSnake = (xPos: number, yPos: number, snakeBlocks: SnakeBlock[]) => {
  const existItem = snakeBlocks.find((item) => item.xPos === xPos && item.yPos === yPos)
  return !!existItem
}

const setNewApplePosition = (state: { snake: Snake; apple: Apple }) => {
  const xPos = Math.floor(Math.random() * ((SCREEN_WIDTH - state.apple.width) / state.apple.width + 1)) * state.apple.width
  let yPos = Math.floor(Math.random() * ((SCREEN_HEIGHT - state.apple.height) / state.apple.height + 1)) * state.apple.height

  while (isAppleOnSnake(xPos, yPos, state.snake.blocks)) {
    yPos = Math.floor(Math.random() * ((SCREEN_HEIGHT - state.apple.height) / state.apple.height + 1)) * state.apple.height
  }
  state.apple.xPos = xPos
  state.apple.yPos = yPos
}

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    // ======================== Snake ======================== //
    initSnake(state, { payload }: { payload?: number }) {
      state.snake.blocks = []
      state.snake.isDead = false
      state.snake.direction = 'RIGHT'
      const snakeLength: number = payload || DEFAULT_SNAKE_LENGTH
      let xPos = SCREEN_WIDTH / 2
      const yPos = SCREEN_HEIGHT / 2

      const snakeHead = { xPos, yPos }
      state.snake.blocks.push(snakeHead)

      // Init length for snake
      for (let i = 1; i < snakeLength; i++) {
        xPos -= BLOCK_WIDTH
        const newBlock = { xPos, yPos }
        state.snake.blocks.push(newBlock)
      }
    },

    moveSnake(state) {
      if (state.snake.isDead) return
      const blocks = state.snake.blocks
      const blockExceptHead = [...blocks]
      blockExceptHead.splice(0, 1)

      const idx = blockExceptHead.findIndex((item) => item.xPos === blocks[0].xPos && item.yPos === blocks[0].yPos)

      if (idx > -1) {
        state.snake.isDead = true
        return
      }
      let prevXPos = state.snake.blocks[0].xPos
      let prevYPos = state.snake.blocks[0].yPos

      // move snake's head
      switch (state.snake.direction) {
        case 'LEFT': {
          state.snake.blocks[0].xPos = state.snake.blocks[0].xPos <= 0 ? SCREEN_WIDTH - BLOCK_WIDTH : state.snake.blocks[0].xPos - BLOCK_WIDTH
          break
        }
        case 'RIGHT': {
          state.snake.blocks[0].xPos = state.snake.blocks[0].xPos >= SCREEN_WIDTH - BLOCK_WIDTH ? 0 : state.snake.blocks[0].xPos + BLOCK_WIDTH
          break
        }
        case 'DOWN': {
          state.snake.blocks[0].yPos = state.snake.blocks[0].yPos >= SCREEN_HEIGHT - BLOCK_HEIGHT ? 0 : state.snake.blocks[0].yPos + BLOCK_HEIGHT
          break
        }
        case 'UP': {
          state.snake.blocks[0].yPos = state.snake.blocks[0].yPos <= 0 ? SCREEN_HEIGHT - BLOCK_HEIGHT : state.snake.blocks[0].yPos - BLOCK_HEIGHT
          break
        }
      }

      // move snake body
      for (let i = 1; i < state.snake.blocks.length; i++) {
        const prevXTemp = state.snake.blocks[i].xPos
        const prevYTemp = state.snake.blocks[i].yPos
        state.snake.blocks[i].xPos = prevXPos
        state.snake.blocks[i].yPos = prevYPos
        prevXPos = prevXTemp
        prevYPos = prevYTemp
      }
    },

    changeDirection(state, { payload }: { payload: DIRECTION }) {
      if (state.snake.isDirectionChanging) return
      switch (payload) {
        case 'UP': {
          state.snake.direction = state.snake.direction === 'DOWN' ? 'DOWN' : 'UP'
          return
        }
        case 'DOWN': {
          state.snake.direction = state.snake.direction === 'UP' ? 'UP' : 'DOWN'
          return
        }
        case 'LEFT': {
          state.snake.direction = state.snake.direction === 'RIGHT' ? 'RIGHT' : 'LEFT'
          return
        }
        case 'RIGHT': {
          state.snake.direction = state.snake.direction === 'LEFT' ? 'LEFT' : 'RIGHT'
          return
        }
      }
    },

    changingDirection(state, { payload }: { payload: boolean }) {
      state.snake.isDirectionChanging = payload
    },

    ateApple(state) {
      const blocks = state.snake.blocks
      const lastBlocks = {
        xPos: blocks[blocks.length - 1].xPos,
        yPos: blocks[blocks.length - 1].yPos,
      }
      // Ádd snake block
      state.snake.blocks.push(lastBlocks)

      // Change game state
      state.game.length++
      state.game.score += state.game.speed
      if (state.game.length % LENGTH_STEP === 0 && state.game.speed <= MAX_SPEED) state.game.speed++
      setNewApplePosition(state)
    },

    // ======================== Apple ======================== //
    initApplePosition(state) {
      setNewApplePosition(state)
    },

    // ======================== Game ======================== //
  },
})

export const { initSnake, moveSnake, changeDirection, changingDirection, ateApple, initApplePosition } = characterSlice.actions
export default characterSlice.reducer
