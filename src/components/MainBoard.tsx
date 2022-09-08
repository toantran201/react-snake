import { useCallback, useEffect, useState } from 'react'
//
import { Apple, Snake, Walls } from '@/components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ateApple, changeDirection, changingDirection, moveSnake } from '@/slices/character'
import { SPEED_STEP } from '@/constants'

const MainBoard = () => {
  const dispatch = useAppDispatch()
  const snake = useAppSelector((state) => state.character.snake)
  const apple = useAppSelector((state) => state.character.apple)
  const game = useAppSelector((state) => state.character.game)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | string | number | undefined>()
  const snakeHeadXPos = snake.blocks[0]?.xPos
  const snakeHeadYPos = snake.blocks[0]?.yPos

  //
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
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
    },
    [dispatch]
  )

  //
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    const intervalId = setInterval(() => {
      dispatch(moveSnake())
      dispatch(changingDirection(false))
    }, Math.floor(200 - game.speed * SPEED_STEP))
    setIntervalId(intervalId)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearInterval(intervalId)
    }
  }, [dispatch, game.speed, onKeyDown])

  //
  useEffect(() => {
    if (snakeHeadXPos === undefined || snakeHeadYPos === undefined) return
    if (snakeHeadXPos === apple.xPos && snakeHeadYPos === apple.yPos) {
      dispatch(ateApple())
    }
  }, [dispatch, snakeHeadXPos, snakeHeadYPos, apple.xPos, apple.yPos])

  useEffect(() => {
    if (game.isOver) {
      clearInterval(intervalId)
    }
  }, [game.isOver, intervalId])

  return (
    <div className="relative w-[700px] h-[400px] bg-glass flex">
      <Walls />
      <Snake />
      <Apple />
    </div>
  )
}

export default MainBoard
