const Wall = () => {
  const renderWall = () => {
    const arr = []
    for (let i = 0; i < 28; i++) {
      for (let j = 0; j < 16; j++) {
        arr.push(
          <div
            key={`${i * 10}${j * 10}`}
            className="wall"
            style={{
              width: 25,
              height: 25,
              left: i * 25,
              top: j * 25,
            }}
          />
        )
      }
    }

    return arr
  }

  return <>{renderWall()}</>
}

export default Wall
