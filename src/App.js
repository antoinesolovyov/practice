import { useEffect, useState } from 'react'
import './App.css'

function* generator() {
  let colors = {
    r: 255,
    g: 0,
    b: 0.
  }

  const step = 5

  while (true) {
    if (colors.r === 255 && colors.g < 255 && colors.b === 0) {
      colors = { r: 255, g: colors.g + step, b: 0 }
    } else if (colors.r > 0 && colors.g === 255 && colors.b === 0) {
      colors = { r: colors.r - step, g: 255, b: 0 }
    } else if (colors.r === 0 && colors.g === 255 && colors.b < 255) {
      colors = { r: 0, g: 255, b: colors.b + step }
    } else if (colors.r === 0 && colors.g > 0 && colors.b === 255) {
      colors = { r: 0, g: colors.g - step, b: 255 }
    } else if (colors.r < 255 && colors.g === 0 && colors.b === 255) {
      colors = { r: colors.r + step, g: 0, b: 255 }
    } else if (colors.r === 255 && colors.g === 0 && colors.b > 0) {
      colors = { r: 255, g: 0, b: colors.b - step }
    }

    yield colors
  }
}

const App = () => {
  const [colors, setColors] = useState({
    r: 0,
    g: 0,
    b: 0.
  })

  const { r, g, b } = colors

  const generateColors = generator()

  useEffect(() => {
    const interval = setInterval(() => {
      const generatedColors = generateColors.next().value
      setColors(generatedColors)
    }, 16.7)
    return () => clearInterval(interval);
  }, [])

  return (
    <div style={{ minHeight: '100vh', backgroundColor: `rgb(${r}, ${g}, ${b})`}}></div>
  )
}

export default App
