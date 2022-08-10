import { useEffect } from 'react'
//
import { Wall } from '@/components'
import { BLOCK_HEIGHT, BLOCK_WIDTH } from '@/constants'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import {
  changeDirection,
  initSnake,
  moveSnake,
  changingDirection,
} from '@/slices/snake'

const MainBoard = () => {
  const dispatch = useAppDispatch()
  const snakeContext = useAppSelector((state) => state.snake)

  //
  useEffect(() => {
    dispatch(initSnake())
    dispatch(changingDirection(false))
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  //
  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(moveSnake())
      dispatch(changingDirection(false))
    }, 100)

    return () => {
      clearInterval(intervalId)
    }
  }, [dispatch])

  //
  const onKeyDown = (event: KeyboardEvent) => {
    switch (event.keyCode) {
      case 37:
        dispatch(changeDirection('LEFT'))
        break
      case 38:
        dispatch(changeDirection('UP'))
        break
      case 39:
        dispatch(changeDirection('RIGHT'))
        break
      case 40:
        dispatch(changeDirection('DOWN'))
        break
    }
    dispatch(changingDirection(true))
  }

  return (
    <div className="relative w-[700px] h-[400px] bg-glass flex">
      <Wall />
      {snakeContext.blocks.map((item, index) => (
        <div
          key={index}
          className={
            index === 0
              ? 'wall bg-primary-dark opacity-70'
              : 'wall bg-primary-light opacity-70'
          }
          style={{
            width: BLOCK_WIDTH,
            height: BLOCK_HEIGHT,
            top: item.yPos,
            left: item.xPos,
          }}
        />
      ))}
    </div>
  )
}

export default MainBoard
