import React, { useEffect } from 'react'
//
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { initApplePosition } from '@/slices/character'

const Apple = () => {
  const dispatch = useAppDispatch()
  const appleCtx = useAppSelector((state) => state.character.apple)

  useEffect(() => {
    dispatch(initApplePosition())
  }, [dispatch])

  return (
    <div
      className="wall bg-primary-dark opacity-70"
      style={{
        width: appleCtx.width,
        height: appleCtx.height,
        left: appleCtx.xPos,
        top: appleCtx.yPos,
      }}
    />
  )
}

export default React.memo(Apple)
