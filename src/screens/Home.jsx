export default function Home({ go }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: 'var(--ink)', color: 'var(--white)', padding: '28px 22px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>MAYDAY</span>
          <span aria-label="Profile" style={{ width: 48, height: 48, borderRadius: 24, background: 'var(--yellow)', border: '3px solid var(--white)', color: 'var(--ink)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 20 }}>A</span>
        </div>
        <p style={{ color: '#8c8781', fontWeight: 700, fontSize: 17, margin: '12px 0 0' }}>Evening, Aarav.</p>
      </header>
      <main style={{ flex: 1, marginTop: -28, background: 'var(--bg)', borderRadius: '28px 28px 0 0', padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Need help?</span>
        <button onClick={() => go('requested')} style={{ background: 'var(--red)', borderRadius: 30, padding: '28px 20px', textAlign: 'left', color: 'var(--ink)' }}>
          <span style={{ display: 'block', fontSize: 84, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>SOS</span>
          <span style={{ fontWeight: 700 }}>Screens from Figma go here</span>
        </button>
      </main>
    </div>
  )
}
