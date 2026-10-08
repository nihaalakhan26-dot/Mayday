import { useState } from 'react'
import Home from './screens/Home.jsx'
import Placeholder from './screens/Placeholder.jsx'

// One entry per screen in the flow. Swap placeholders for real screens as the Figma designs come in.
const SCREENS = {
  home: Home,
  requested: (p) => <Placeholder title="Alert sent" {...p} />,
}

export default function App() {
  const [screen, setScreen] = useState('home')
  const Screen = SCREENS[screen] ?? SCREENS.home
  return (
    <div className="phone">
      <Screen go={setScreen} />
    </div>
  )
}
