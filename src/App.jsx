import { useCallback, useState } from 'react'
import { Home, Type, Details, Live, Assigned, Hero, Changed, Plan, OnWay, Safe } from './screens/index.jsx'

// The prototype follows one fixed path. Only the taps on that path do anything.
const SCREENS = { home: Home, type: Type, details: Details, live: Live, assigned: Assigned, hero: Hero, changed: Changed, plan: Plan, onway: OnWay, safe: Safe }
const START = { type: null, floor: null, people: null, hurt: null }

export default function App() {
  const [history, setHistory] = useState(() => {
    const s = window.location.hash.slice(1)
    return SCREENS[s] && s !== 'home' ? ['home', s] : ['home']
  })
  const [state, setState] = useState(START)

  const screen = history[history.length - 1]
  const go = useCallback((s) => setHistory((h) => [...h, s]), [])
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h))
  const restart = () => {
    setHistory(['home'])
    setState(START)
  }
  const Screen = SCREENS[screen] ?? Home

  return (
    <div className="phone">
      <Screen key={screen} go={go} back={back} state={state} set={(p) => setState((s) => ({ ...s, ...p }))} done={restart} />
    </div>
  )
}
