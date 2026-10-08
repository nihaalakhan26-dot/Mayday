import { useEffect, useState } from 'react'
import Sticker from '../components/Stickers.jsx'
import { Screen, Spacer, Bubble, Button, Choice, DoThisNow, HeroRow, SlideToSend, Arrow } from '../components/UI.jsx'

/* 1 · Home */
export function Home({ go }) {
  return (
    <Screen className="home">
      <div className="home-top">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="brand">MAYDAY</span>
          <Spacer />
          <span className="loc"><Sticker name="pin" size={22} />Kakkanad, Kochi</span>
          <button className="profile" aria-label="Profile">A</button>
        </div>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, fontSize: 14, margin: '6px 0 4px' }}>
          <span className="dot" style={{ background: 'var(--red)' }} />Thu 08 Oct · 21:02
        </span>
        <Bubble color="blue" dark tail="left" className="status">
          <span className="k">Orange alert · Ernakulam</span>
          <span className="v">Heavy rain expected tonight</span>
          <Sticker name="wave" size={50} rotate={8} style={{ position: 'absolute', right: 14, top: -6 }} />
        </Bubble>
        <Bubble color="yellow" tail="right" className="status">
          <span className="k">Heroes on patrol</span>
          <span className="v">4 nearby · closest is 3 km away</span>
          <Sticker name="mask" size={66} rotate={-10} style={{ position: 'absolute', right: 2, top: -14 }} />
        </Bubble>
      </div>
      <div className="home-sheet">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>Need help?</span>
          <button className="link" style={{ fontWeight: 600 }}>My contacts (3)</button>
        </div>
        <div className="sos">
          <Sticker name="phone" size={74} rotate={12} style={{ position: 'absolute', right: 26, top: 18 }} />
          <span className="sos-word">SOS</span>
          <span className="sos-sub">Sends your location to the rescue desk</span>
          <SlideToSend onSend={() => go('type')} />
        </div>
        <button className="helpother">
          <Sticker name="heart" size={44} rotate={-8} />
          <span>
            <span className="t">Help someone else</span>
            <span className="s">Report an emergency you can see</span>
          </span>
          <span className="go"><Arrow /></span>
        </button>
      </div>
    </Screen>
  )
}

/* 2 · What's happening */
const TYPES = [
  ['Fire or explosion', 'fire'], ['Flood or storm', 'wave'],
  ['Collapse or trapped', 'building'], ['Runaway vehicle', 'car'],
  ['Medical, hard to reach', 'medical'], ['Missing person', 'search'],
  ['Villain attack', 'bolt'], ['Something else', 'question'],
]
export function Type({ go, state, set, cancel }) {
  return (
    <Screen>
      <h1 className="title" style={{ fontSize: 36, margin: '0 0 12px', maxWidth: 220 }}>What's happening?</h1>
      <div className="tiles">
        {TYPES.map(([label, s], i) => (
          <button key={label} className="tile" aria-pressed={state.type === label} onClick={() => set({ type: label })}>
            <Sticker name={s} size={40} rotate={i % 2 ? 4 : -6} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <Spacer />
      <Button onClick={() => go('details')}>Raise Alert</Button>
      <Button variant="ghost" className="danger" onClick={cancel}>Cancel request</Button>
    </Screen>
  )
}

/* 3 · Getting help ready: details */
export function Details({ go, state, set, cancel }) {
  return (
    <Screen>
      <h1 className="title">Getting help ready</h1>
      <p className="sub" style={{ marginTop: -4 }}>A few quick details for your hero. Skip any you can't answer.</p>
      <div style={{ marginTop: 14 }}>
        <div className="mapcard" style={{ height: 120 }}>
          <svg width="100%" height="120" viewBox="0 0 350 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 52 L170 0 L195 0 L0 66 Z" fill="#fff" />
            <path d="M246 0 L262 0 L246 120 L230 120 Z" fill="#fff" />
            <rect x="124" y="18" width="110" height="70" rx="14" fill="#CFE6D6" />
          </svg>
          <Sticker name="pin" size={54} style={{ position: 'absolute', left: 148, top: 30 }} />
        </div>
        <div className="addr">
          <span>
            <span style={{ display: 'block', fontSize: 17, fontWeight: 800 }}>Thapasya, Infopark Phase 1</span>
            <span style={{ fontSize: 14, color: 'var(--mute)' }}>Kakkanad, Kochi · accurate to 12 m</span>
          </span>
          <button className="link" style={{ fontSize: 13 }}>Change</button>
        </div>
      </div>
      <span className="q">Which floor are you on?</span>
      <Choice fill label="Floor" options={['Ground', '1 to 3', '4+']} value={state.floor} onChange={(v) => set({ floor: v })} />
      <span className="q">How many people are with you?</span>
      <Choice label="People" options={['Just me', '2-5', '6-20', '20+']} value={state.people} onChange={(v) => set({ people: v })} />
      <span className="q">Are you/anyone injured?</span>
      <Choice label="Injured" options={['Yes', 'No', 'Not sure']} value={state.hurt} onChange={(v) => set({ hurt: v })} />
      <Spacer />
      <Button onClick={() => go('live')}>Continue</Button>
      <Button variant="ghost" className="danger" onClick={cancel}>Cancel request</Button>
    </Screen>
  )
}

/* 4 · Getting help ready: live */
export function Live({ go, state, cancel }) {
  const floor = state.floor === 'Ground' ? 'ground floor' : state.floor === '4+' ? '4th floor or above' : '3rd floor'
  return (
    <Screen>
      <h1 className="title">Getting help ready</h1>
      <p className="sub" style={{ marginTop: -4 }}>A few quick details for your hero. Skip any you can't answer.</p>
      <div className="log" style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 40 }}>
        <Bubble color="yellow" tail="left">
          <span><span className="time">21:02</span><span className="msg">Alert received from Thapasya, {floor}</span></span>
        </Bubble>
        <Bubble color="blue" dark tail="right">
          <span className="avatar" style={{ background: 'var(--white)' }}>RD</span>
          <span><span className="time">21:03</span><span className="msg">A person at the rescue desk is on your case</span></span>
        </Bubble>
        <Bubble color="orange" tail="left">
          <span><span className="time">Now</span><span className="msg">Finding the right hero for you</span></span>
          <span className="typing"><i /><i /><i /></span>
        </Bubble>
      </div>
      <DoThisNow label="While you wait:">Stay on your current floor. Keep away from the flood water.</DoThisNow>
      <Spacer />
      <div className="pair">
        <Button variant="ghost" onClick={() => (window.location.href = 'tel:112')}>Call the rescue desk</Button>
        <Button variant="ghost" className="danger" onClick={cancel}>Cancel request</Button>
      </div>
      <Button onClick={() => go('hero')}>Continue</Button>
    </Screen>
  )
}

/* 5 · Tidewalker is coming */
export function Hero({ go }) {
  return (
    <Screen>
      <h1 className="title" style={{ marginTop: 6 }}>Tidewalker is on<br />their way</h1>
      <Bubble color="blue" dark tail="left" style={{ padding: 18, marginTop: 14 }}>
        <span className="avatar" style={{ background: 'var(--sky)', width: 48, height: 48, borderRadius: 24 }}><Sticker name="wave" size={28} /></span>
        <span>
          <span style={{ display: 'block', fontSize: 18, fontWeight: 800 }}>Tidewalker</span>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Water rescue · left Edappally at 21:05</span>
        </span>
      </Bubble>
      <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
        <div className="card" style={{ background: 'var(--yellow)', flex: 1 }}>
          <span className="label" style={{ fontSize: 13 }}>Arrives in</span>
          <div className="title" style={{ fontSize: 34 }}>6 min</div>
        </div>
        <div className="card" style={{ background: 'var(--lilac)', flex: 1.4 }}>
          <span className="label" style={{ fontSize: 13 }}>Why her</span>
          <p style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.35 }}>Water elemental with increased control and movement</p>
        </div>
      </div>
      <DoThisNow label="While you wait:">Stay on your current floor. Keep away from the flood water.</DoThisNow>
      <div className="card tl">
        <div><b>21:02</b><span className="dot" style={{ background: 'var(--green)', width: 10, height: 10 }} />Alert received</div>
        <div><b>21:03</b><span className="dot" style={{ background: 'var(--green)', width: 10, height: 10 }} />Rescue desk on your case</div>
        <div style={{ fontWeight: 700 }}><b>21:05</b><span className="dot" style={{ background: 'var(--orange)', width: 10, height: 10 }} />Tidewalker left Edappally</div>
        <div style={{ color: 'var(--mute)' }}><b>~21:11</b><span className="dot" style={{ background: '#d9d2c7', width: 10, height: 10 }} />She reaches your window</div>
      </div>
      <Spacer />
      <Button onClick={() => go('changed')}>Somethings Changed</Button>
      <Button variant="ghost" onClick={() => (window.location.href = 'tel:112')}>Call the rescue desk</Button>
    </Screen>
  )
}

/* 6 · What's changed */
const OTHERS = [['Someone is hurt', 'medical'], ['I had to move', 'pin'], ["I'm out and safe", 'heart'], ['Something else', 'question'], ['My battery is low', 'battery']]
export function Changed({ go, back }) {
  const [picked, setPicked] = useState(null)
  const pick = (v) => () => setPicked(v)
  const next = () => (picked === "I'm out and safe" ? go('safe') : picked === 'Building is collapsing' || !picked ? go('plan') : back())
  return (
    <Screen>
      <button className="close" aria-label="Close" onClick={back} style={{ position: 'absolute', right: 20, top: 22 }}>X</button>
      <h1 className="title" style={{ fontSize: 36, marginTop: 26 }}>What's changed?</h1>
      <p className="sub" style={{ marginTop: -4 }}>Tap what's different. Tidewalker and the rescue desk see it straight away.</p>
      <span className="label" style={{ marginTop: 30 }}>Most likely right now</span>
      <div className="big2">
        <Bubble color="blue" dark tail="left" className={`bigbtn ${picked === 'Water level is rising faster' ? 'picked' : ''}`} role="button" tabIndex={0} aria-pressed={picked === 'Water level is rising faster'} onClick={pick('Water level is rising faster')} onKeyDown={(e) => e.key === 'Enter' && setPicked('Water level is rising faster')}>
          <Sticker name="wave" size={48} rotate={8} />Water level is rising faster
        </Bubble>
        <Bubble color="red" tail="right" className={`bigbtn ${picked === 'Building is collapsing' ? 'picked' : ''}`} role="button" tabIndex={0} aria-pressed={picked === 'Building is collapsing'} onClick={pick('Building is collapsing')} onKeyDown={(e) => e.key === 'Enter' && setPicked('Building is collapsing')}>
          <Sticker name="building" size={48} rotate={-8} />Building is collapsing
        </Bubble>
      </div>
      <span className="label" style={{ marginTop: 8 }}>Or</span>
      <div className="others">
        {OTHERS.map(([t, s]) => (
          <button key={t} className={`other ${picked === t ? 'picked' : ''}`} aria-pressed={picked === t} onClick={pick(t)}>
            <Sticker name={s} size={28} />{t}
          </button>
        ))}
      </div>
      <Spacer />
      <Button onClick={next}>Continue</Button>
    </Screen>
  )
}

/* 7 · Plan updated */
export function Plan({ go }) {
  // No forward button in the design: the plan moves on by itself once the heroes are close.
  useEffect(() => {
    const t = setTimeout(() => go('onway'), 8000)
    return () => clearTimeout(t)
  }, [go])
  return (
    <Screen>
      <Bubble color="red" tail="left" style={{ flexDirection: 'column', alignItems: 'flex-start', padding: 18, gap: 8, marginTop: 14 }}>
        <Sticker name="building" size={64} rotate={10} style={{ position: 'absolute', right: 16, top: -14 }} />
        <span className="chip" style={{ background: 'var(--ink)', color: 'var(--white)', fontWeight: 800 }}>Plan updated · 21:07</span>
        <h1 className="title" style={{ fontSize: 30 }}>A second hero is<br />on the way</h1>
        <p style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.4 }}>You reported building damage. Bedrock is coming to clear the stairwell so Tidewalker can get everyone out.</p>
      </Bubble>
      <span className="label" style={{ marginTop: 10 }}>Heroes on your case</span>
      <HeroRow color="orange" letter="B" name="Bedrock" note="Clearing the stairwell" eta="5 min" isNew tail="right" />
      <HeroRow color="blue" letter="T" avatar="sky" name="Tidewalker" note="Still coming to your window" eta="9 min" tail="left" />
      <div style={{ marginTop: 6 }}><DoThisNow>Go to the third floor to a room with a window and keep everyone away from the collapsing stairwell.</DoThisNow></div>
      <Spacer />
      <Button onClick={() => go('changed')}>Somethings Changed</Button>
      <Button variant="ghost" onClick={() => (window.location.href = 'tel:112')}>Call the rescue desk</Button>
    </Screen>
  )
}

/* 8 · On the way */
export function OnWay({ go }) {
  return (
    <Screen>
      <h1 className="title" style={{ marginTop: 6 }}>Tidewalker is<br />2 min away</h1>
      <div className="mapcard" style={{ height: 210 }}>
        <svg width="350" height="210" viewBox="0 0 350 210" style={{ width: '100%', height: '100%' }} aria-label="Map showing Tidewalker and Bedrock near you">
          <circle cx="190" cy="92" r="86" fill="none" stroke="#9AA8B8" strokeWidth="2" strokeDasharray="7 6" />
          <rect x="140" y="52" width="100" height="76" rx="14" fill="#fff" />
          <path d="M66 156 L156 90" stroke="#2E7CF6" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round" />
          <circle cx="191" cy="91" r="7" fill="#F2594B" />
          <text x="160" y="118" fontFamily="Figtree, sans-serif" fontWeight="800" fontSize="12" fill="#141414">You</text>
          <circle cx="66" cy="172" r="21" fill="#2E7CF6" stroke="#fff" strokeWidth="3" />
          <text x="66" y="178" textAnchor="middle" fontFamily="Figtree, sans-serif" fontWeight="800" fontSize="16" fill="#fff">T</text>
          <circle cx="258" cy="68" r="21" fill="#F59E1B" stroke="#fff" strokeWidth="3" />
          <text x="258" y="74" textAnchor="middle" fontFamily="Figtree, sans-serif" fontWeight="800" fontSize="16" fill="#141414">B</text>
        </svg>
      </div>
      <HeroRow color="blue" letter="T" avatar="sky" name="Tidewalker" note="Coming to your window" eta="2 min" tail="left" />
      <HeroRow color="orange" letter="B" name="Bedrock" note="At the building." eta="Here" tail="right" />
      <div style={{ marginTop: 6 }}><DoThisNow>Go to the window and wave. Your phone will flash and beep so she can spot you.</DoThisNow></div>
      <Spacer />
      <Button onClick={() => go('safe')}>Help Has Arrived</Button>
    </Screen>
  )
}

/* 9 · Are you safe */
export function Safe({ go, done }) {
  return (
    <Screen>
      <Spacer />
      <Sticker name="heart" size={84} rotate={12} style={{ alignSelf: 'flex-end', marginRight: 20 }} />
      <h1 className="title xl">Are you<br />safe now?</h1>
      <p className="sub" style={{ fontSize: 18, lineHeight: 1.45 }}>We'll only close this when you say so. If we don't hear from you, someone from the rescue desk will call.</p>
      <Spacer />
      <Spacer />
      <Button variant="green" onClick={done}>Yes, I'm safe</Button>
      <Button variant="ghost" onClick={() => go('onway')}>No, I still need help</Button>
    </Screen>
  )
}
