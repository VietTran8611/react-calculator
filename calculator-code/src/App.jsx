import { useState } from 'react'
import reactLogo from './assets/react.svg'
import StandardCal from './Standard/StandardCal'
import Ver3Cal from './VER3/Ver3Cal'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Ver3Cal />
    </div>
  )
}

export default App
