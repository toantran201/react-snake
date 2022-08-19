import { useEffect } from 'react'
import { MainBoard, PointBoard } from '@/components'

function App() {
  useEffect(() => {
    document.documentElement.dataset.theme = 'pink'
  }, [])

  return (
    <div
      className="w-[100vw] h-[100vh] relative flex flex-col items-center justify-center space-y-10
    bg-gradient-to-br from-primary-light to-primary-dark"
    >
      <PointBoard />
      <MainBoard />
      {/*<button className="py-1.5 px-20 font-manrope transition-all text-white bg-glass hover:bg-primary-light active:bg-primary-dark">Start</button>*/}
    </div>
  )
}

export default App
