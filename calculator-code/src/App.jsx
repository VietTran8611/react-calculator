import { useState } from 'react'
import reactLogo from './assets/react.svg'
import StandardCal from './Standard/StandardCal'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <StandardCal />
    </div>
  )
}

export default App
