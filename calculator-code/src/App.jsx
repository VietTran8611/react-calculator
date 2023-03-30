import { useState } from 'react'
import reactLogo from './assets/react.svg'
import RPN from './RPN/RPN'
import StandardCal from './Standard/StandardCal'
import Ver3Cal from './VER3/Ver3Cal'
import viteLogo from '/vite.svg'

function App() {
  const [stand,setStand]= useState(true)
  const [rpn,setRpn]= useState(false)
  const [ver3,setver3]= useState(false)
  let dis
  if (stand) {
    dis=<StandardCal />
  } else if(rpn){
    dis=<RPN />
  } else if(ver3){
    dis=<Ver3Cal />
  }

  return (
    <div>
      <button onClick={()=>{setStand(true);setRpn(false);setver3(false)}}>Version 1 mode</button>
      <button onClick={()=>{setStand(false);setRpn(true);setver3(false)}}>RPM mode</button>
      <button onClick={()=>{setStand(false);setRpn(false);setver3(true)}}>Version 3 mode </button>
      {dis}
    </div>
  )
}

export default App
