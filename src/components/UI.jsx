import { useEffect, useRef, useState } from 'react'

export function Screen({ children, className = '' }) {
  return <div className={`screen ${className}`}>{children}</div>
}

export function Spacer() {
  return <div style={{ flex: 1 }} />
}

// Coloured speech bubble. tail: 'left' | 'right' | null
export function Bubble({ color, dark = false, tail = 'left', className = '', style, children, ...rest }) {
  return (
    <div
      className={`bubble ${tail ? `tail-${tail}` : ''} ${dark ? 'on-dark' : ''} ${className}`}
      style={{ '--bubble': `var(--${color})`, ...style }}
      {...rest}
    >
      {children}
    </div>
  )
}

export function Button({ variant = 'primary', className = '', children, ...rest }) {
  return (
    <button className={`btn btn-${variant} ${className}`} {...rest}>
      {children}
    </button>
  )
}

export function Choice({ options, value, onChange, label, fill, locked }) {
  return (
    <div className={`choice ${fill ? 'fill' : ''}`} role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o}
          role="radio"
          aria-checked={value === o}
          className={`pill ${value === o ? 'on' : ''} ${locked ? 'inert' : ''}`}
          onClick={locked ? undefined : () => onChange(value === o ? null : o)}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

export function DoThisNow({ label = 'Do this now', children }) {
  return (
    <div className="donow">
      <span className="donow-label">{label}</span>
      <p>{children}</p>
    </div>
  )
}

export function HeroRow({ color, letter, avatar = 'white', name, note, eta, isNew, tail }) {
  const light = color === 'blue'
  return (
    <Bubble color={color} tail={tail} dark={light} className="hero-row">
      <span className="avatar" style={{ background: `var(--${avatar})` }}>{letter}</span>
      <span className="hero-text">
        <span className="hero-name">
          {name} {isNew && <span className="new">NEW</span>}
        </span>
        <span className="hero-note">{note}</span>
      </span>
      <span className="hero-eta">{eta}</span>
    </Bubble>
  )
}

// Slide-to-send control. Drag the knob to the end, or press Enter / Space.
export function SlideToSend({ onSend, label = 'Slide to send SOS' }) {
  const track = useRef(null)
  const [x, setX] = useState(0)
  const [drag, setDrag] = useState(null)
  const [width, setWidth] = useState(318)
  useEffect(() => {
    const el = track.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.offsetWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const max = () => width - 64

  const down = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDrag({ start: e.clientX - x })
  }
  const move = (e) => {
    if (!drag) return
    setX(Math.max(0, Math.min(max(), e.clientX - drag.start)))
  }
  const up = () => {
    if (!drag) return
    setDrag(null)
    if (x > max() * 0.85) {
      setX(max())
      setTimeout(onSend, 180)
    } else setX(0)
  }

  return (
    <div className="slide" ref={track}>
      <span className="slide-label" style={{ opacity: 1 - x / (max() * 1.2) }}>{label}</span>
      <svg className="slide-chev" width="40" height="16" viewBox="0 0 40 16" fill="none" aria-hidden="true">
        <path d="M4 3l5 5-5 5" stroke="#fff" strokeOpacity=".35" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3l5 5-5 5" stroke="#fff" strokeOpacity=".65" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 3l5 5-5 5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <button
        className="slide-knob"
        aria-label={label}
        style={{ transform: `translateX(${x}px)`, transition: drag ? 'none' : 'transform .25s ease' }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSend()
          }
        }}
      />
    </div>
  )
}

export function Arrow({ color = '#fff', size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CancelSheet({ onKeep, onCancel }) {
  const [why, setWhy] = useState("I'm safe now")
  return (
    <div className="sheet-wrap" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
      <div className="scrim" onClick={onKeep} />
      <div className="sheet">
        <span className="grabber" />
        <h2 id="cancel-title">Cancel your request?</h2>
        <p className="sub">Tidewalker and the rescue desk will be told to stop. Only cancel if you're safe or sent this by mistake.</p>
        <span className="q">Why are you cancelling?</span>
        <Choice label="Reason" options={["I'm safe now", 'Sent by mistake', 'Someone else helped']} value={why} onChange={(v) => setWhy(v ?? why)} />
        <Button onClick={onKeep}>Keep my request</Button>
        <Button variant="ghost" className="danger" onClick={onCancel}>Yes, cancel it</Button>
      </div>
    </div>
  )
}
