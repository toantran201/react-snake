import { useEffect } from 'react'
import PointBoard from '@/components/PointBoard/PointBoard'
import MainBoard from '@/components/MainBoard/MainBoard'

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
      <button className="bg-glass py-1.5 px-20 font-manrope text-white">Start</button>
    </div>
  )
}

export default App
