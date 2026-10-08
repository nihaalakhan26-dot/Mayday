import { useState } from 'react'
import { Home, Type, Details, Live, Hero, Changed, Plan, OnWay, Safe } from './screens/index.jsx'
import { CancelSheet } from './components/UI.jsx'

const SCREENS = { home: Home, type: Type, details: Details, live: Live, hero: Hero, changed: Changed, plan: Plan, onway: OnWay, safe: Safe }
const START = { type: 'Flood or storm', floor: '1 to 3', people: '6-20', hurt: 'No' }

export default function App() {
  const [history, setHistory] = useState(() => {
    const s = window.location.hash.slice(1)
    return SCREENS[s] && s !== 'home' ? ['home', s] : ['home']
  })
  const [state, setState] = useState(START)
  const [cancelling, setCancelling] = useState(false)
  const [toast, setToast] = useState(null)

  const screen = history[history.length - 1]
  const go = (s) => setHistory((h) => [...h, s])
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h))
  const reset = (msg) => {
    setHistory(['home'])
    setState(START)
    setCancelling(false)
    if (msg) {
      setToast(msg)
      setTimeout(() => setToast(null), 2600)
    }
  }
  const Screen = SCREENS[screen] ?? Home

  return (
    <div className="phone">
      <Screen
        key={screen}
        go={go}
        back={back}
        state={state}
        set={(p) => setState((s) => ({ ...s, ...p }))}
        cancel={() => setCancelling(true)}
        done={() => reset('Case closed. Glad you’re safe.')}
      />
      {cancelling && <CancelSheet onKeep={() => setCancelling(false)} onCancel={() => reset('Request cancelled. The rescue desk has been told.')} />}
      {toast && (
        <div role="status" style={{ position: 'absolute', left: 20, right: 20, bottom: 24, background: 'var(--ink)', color: '#fff', borderRadius: 18, padding: '14px 16px', fontWeight: 700, fontSize: 15, zIndex: 20 }}>
          {toast}
        </div>
      )}
    </div>
  )
}
