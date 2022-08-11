import { useEffect, useState } from 'react'
//
import { Apple, Snake, Walls } from '@/components'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { ateApple, changeDirection, changingDirection, moveSnake } from '@/slices/character'

const MainBoard = () => {
  const dispatch = useAppDispatch()
  const snake = useAppSelector((state) => state.character.snake)
  const apple = useAppSelector((state) => state.character.apple)
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | string | number | undefined>()

  //
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)
    const intervalId = setInterval(() => {
      dispatch(moveSnake())
      dispatch(changingDirection(false))
    }, 70)
    setIntervalId(intervalId)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      clearInterval(intervalId)
    }
  }, [dispatch])

  //
  useEffect(() => {
    if (!snake.blocks || snake.blocks.length === 0) return
    if (snake.blocks[0].xPos === apple.xPos && snake.blocks[0].yPos === apple.yPos) {
      dispatch(ateApple())
    }
  }, [dispatch, snake.blocks[0], apple.xPos, apple.yPos])

  useEffect(() => {
    if (snake.isDead) {
      clearInterval(intervalId)
    }
  }, [snake.isDead])

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
      <Walls />
      <Snake />
      <Apple />
    </div>
  )
}

export default MainBoard
