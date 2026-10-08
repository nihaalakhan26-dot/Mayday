export default function Placeholder({ title, go }) {
  return (
    <div style={{ height: '100%', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h1 style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1, margin: '36px 0 0' }}>{title}</h1>
      <p style={{ color: 'var(--mute)', margin: 0 }}>This screen will be built from the Figma design.</p>
      <div style={{ flex: 1 }} />
      <button onClick={() => go('home')} style={{ height: 56, borderRadius: 28, background: 'var(--ink)', color: 'var(--white)', fontWeight: 700, fontSize: 17 }}>Back to home</button>
    </div>
  )
}
