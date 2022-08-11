import { DIRECTION } from '@/types'

export type SnakeBlock = {
  xPos: number
  yPos: number
}

export type Snake = {
  blocks: SnakeBlock[]
  startLength: number
  direction: DIRECTION
  isDirectionChanging: boolean
  isDead: boolean
}
