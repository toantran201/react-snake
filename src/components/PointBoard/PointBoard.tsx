const PointBoard = () => {
  return (
    <div className="py-2 flex items-center justify-center space-x-7 w-1/2 bg-glass">
      <div className="w-25">
        <h3 className="font-manrope font-light text-2xl text-white text-opacity-80 text-center">
          Score
        </h3>
        <h2 className="font-manrope-md text-4xl text-white text-center mt-1">
          0
        </h2>
      </div>
      <div className="w-25">
        <h3 className="font-manrope font-light text-2xl text-white text-opacity-80 text-center">
          Speed
        </h3>
        <h2 className="font-manrope-md text-4xl text-white text-center mt-1">
          0
        </h2>
      </div>
      <div className="w-25">
        <h3 className="font-manrope text-2xl text-white text-opacity-80 text-center">
          Length
        </h3>
        <h2 className="font-manrope-md text-4xl text-white text-center mt-1">
          0
        </h2>
      </div>
    </div>
  )
}

export default PointBoard
