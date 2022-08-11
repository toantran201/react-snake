import React, { useEffect } from 'react'
//
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '@/constants'
import { changingDirection, initSnake } from '@/slices/character'

const Snake = () => {
  const dispatch = useAppDispatch()
  const snakeBlocks = useAppSelector((state) => state.character.snake.blocks)

  useEffect(() => {
    dispatch(initSnake())
    dispatch(changingDirection(false))
  }, [dispatch])
  return (
    <>
      {snakeBlocks.map((item, index) => (
        <div
          key={index}
          className={index === 0 ? 'wall bg-primary-dark opacity-70' : 'wall bg-primary-light opacity-70'}
          style={{
            width: BLOCK_WIDTH,
            height: BLOCK_HEIGHT,
            top: item.yPos,
            left: item.xPos,
          }}
        />
      ))}
    </>
  )
}

export default React.memo(Snake)
