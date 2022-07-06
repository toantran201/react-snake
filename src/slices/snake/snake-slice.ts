import { createSlice } from '@reduxjs/toolkit'
import { Snake } from '@/types/snake'

const initialState: Snake = {
  blocks: [],
  startLength: 0,
  direction: 'RIGHT',
  directionChange: false,
}

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {},
})

const snakeReducer = snakeSlice.reducer
export default snakeReducer
