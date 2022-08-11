import { memo } from 'react'
//
import {
  BLOCK_HEIGHT,
  BLOCK_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '@/constants'

const Walls = () => {
  const renderWalls = () => {
    const arr = []
    for (let i = 0; i < SCREEN_WIDTH / BLOCK_WIDTH; i++) {
      for (let j = 0; j < SCREEN_HEIGHT / BLOCK_HEIGHT; j++) {
        arr.push(
          <div
            key={`${i * 10}${j * 10}`}
            className="wall"
            style={{
              width: BLOCK_WIDTH,
              height: BLOCK_HEIGHT,
              left: i * BLOCK_WIDTH,
              top: j * BLOCK_HEIGHT,
            }}
          />
        )
      }
    }

    return arr
  }

  return <>{renderWalls()}</>
}

export default memo(Walls)
