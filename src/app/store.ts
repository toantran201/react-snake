import { configureStore } from '@reduxjs/toolkit'
import snakeReducer from '@/slices/snake/snake-slice'

export const store = configureStore({
  reducer: {
    snake: snakeReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
