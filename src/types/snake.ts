import { DIRECTION } from '@/types/generics'

export type SnakeBlock = {
  xPos: number
  yPos: number
}

export type Snake = {
  blocks: SnakeBlock[]
  startLength: number
  direction: DIRECTION
  directionChange: boolean
}
