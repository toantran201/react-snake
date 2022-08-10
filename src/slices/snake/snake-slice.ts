import { createSlice } from '@reduxjs/toolkit'
import { DIRECTION, Snake } from '@/types'
import {
  BLOCK_HEIGHT,
  BLOCK_WIDTH,
  DEFAULT_SNAKE_LENGTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@/constants'

const initialState: Snake = {
  blocks: [],
  startLength: 0,
  direction: 'RIGHT',
  isDirectionChanging: false,
}

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    initSnake(state, { payload }: { payload?: number }) {
      state.blocks = []
      state.direction = 'RIGHT'
      const snakeLength: number = payload || DEFAULT_SNAKE_LENGTH
      let xPos = SCREEN_WIDTH / 2
      const yPos = SCREEN_HEIGHT / 2

      const snakeHead = { xPos, yPos }
      state.blocks.push(snakeHead)

      // Init length for snake
      for (let i = 1; i < snakeLength; i++) {
        xPos -= BLOCK_WIDTH
        const newBlock = { xPos, yPos }
        state.blocks.push(newBlock)
      }
    },

    moveSnake(state) {
      console.log('move snake')
      let prevXPos = state.blocks[0].xPos
      let prevYPos = state.blocks[0].yPos

      // move snake's head
      switch (state.direction) {
        case 'LEFT': {
          state.blocks[0].xPos =
            state.blocks[0].xPos <= 0
              ? SCREEN_WIDTH - BLOCK_WIDTH
              : state.blocks[0].xPos - BLOCK_WIDTH
          break
        }
        case 'RIGHT': {
          state.blocks[0].xPos =
            state.blocks[0].xPos >= SCREEN_WIDTH - BLOCK_WIDTH
              ? 0
              : state.blocks[0].xPos + BLOCK_WIDTH
          break
        }
        case 'DOWN': {
          state.blocks[0].yPos =
            state.blocks[0].yPos >= SCREEN_HEIGHT - BLOCK_HEIGHT
              ? 0
              : state.blocks[0].yPos + BLOCK_HEIGHT
          break
        }
        case 'UP': {
          state.blocks[0].yPos =
            state.blocks[0].yPos <= 0
              ? SCREEN_HEIGHT - BLOCK_HEIGHT
              : state.blocks[0].yPos - BLOCK_HEIGHT
          break
        }
      }

      // move snake body
      for (let i = 1; i < state.blocks.length; i++) {
        const prevXTemp = state.blocks[i].xPos
        const prevYTemp = state.blocks[i].yPos
        state.blocks[i].xPos = prevXPos
        state.blocks[i].yPos = prevYPos
        prevXPos = prevXTemp
        prevYPos = prevYTemp
      }
    },

    changeDirection(state, { payload }: { payload: DIRECTION }) {
      if (state.isDirectionChanging) return
      switch (payload) {
        case 'UP': {
          state.direction = state.direction === 'DOWN' ? 'DOWN' : 'UP'
          return
        }
        case 'DOWN': {
          state.direction = state.direction === 'UP' ? 'UP' : 'DOWN'
          return
        }
        case 'LEFT': {
          state.direction = state.direction === 'RIGHT' ? 'RIGHT' : 'LEFT'
          return
        }
        case 'RIGHT': {
          state.direction = state.direction === 'LEFT' ? 'LEFT' : 'RIGHT'
          return
        }
      }
    },

    changingDirection(state, { payload }: { payload: boolean }) {
      state.isDirectionChanging = payload
    },
  },
})

export const { initSnake, moveSnake, changeDirection, changingDirection } =
  snakeSlice.actions
export default snakeSlice.reducer
