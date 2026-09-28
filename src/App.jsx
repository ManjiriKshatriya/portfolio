import { useEffect, useRef, useState } from 'react'

const LINKEDIN = 'https://www.linkedin.com/in/manjiri-kshatriy-7534461b6/'
const EMAIL = 'manjirirkshatriya@gmail.com'

const skills = {
  'GenAI & Agents': ['LLMs', 'Prompt Engineering', 'RAG', 'Agentic Workflows', 'LangChain', 'LangGraph', 'CrewAI', 'Semantic Kernel', 'Azure OpenAI', 'MCP'],
  'Languages': ['Python', 'JavaScript', 'C++'],
  'Backend & Web': ['FastAPI', 'Flask', 'React.js', 'HTML', 'CSS', 'Bootstrap'],
  'Data': ['MySQL', 'MongoDB', 'Vector DB', 'Pinecone'],
  'DevOps': ['Docker', 'Kubernetes', 'CI/CD', 'Git'],
}
const jobs = [
  { co: 'EY-GDS', role: 'Senior AI Engineer', when: 'May 2026 – Present', pts: [
    'Architected LangGraph multi-agent systems for SOX scoping, Trial Balance generation, FSLI mapping and RACM creation — cutting manual audit effort by 95% per engagement.',
    'Built LLM-orchestrated agents parsing Balance Sheet and Income Statement data with 80%+ FSLI mapping coverage.',
    'Shipped SSO auth, client onboarding and document ingestion pipelines handling 60+ financial statements per run.' ] },
  { co: 'Persistent Systems Ltd.', role: 'Senior AI Engineer', when: 'Jan 2025 – May 2026', pts: [
    'PiAssist: Teams-based GenAI assistant for 15,000+ employees; Azure AI Search RAG pipeline with 98% daily query resolution and 90% less navigation time.',
    'Per-user token rate limiting on GPT-4.1 deployments; JWT-secured leave approval workflow with manager nudges.',
    'GenAI UI test generator: CrewAI agents turn natural-language requirements into Robot Framework / Playwright scripts.',
    'ACL Rules Extraction Engine: RAG pipeline over Jira and Teams with a React semantic-search UI.' ] },
]
const edu = [
  { t: 'B.E. Information Technology', s: "Bharati Vidyapeeth's College of Engineering for Women, Pune (SPPU)", m: 'CGPA 8.76 / 10', y: '2019 – 2023' },
  { t: 'HSC', s: 'N.E.S. High School', m: '76.77%', y: '2018 – 2019' },
  { t: 'SSC', s: 'Dr. V.M. Jain Madhyamik Vidyalaya', m: '92.60%', y: '2016 – 2017' },
]
const stats = [['3+', 'Years in GenAI'], ['15k+', 'Users served'], ['95%', 'Audit effort cut'], ['98%', 'Query resolution']]

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  })
}
function Typing({ words }) {
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i], t = setTimeout(() => {
      if (!del && n < w.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else { setDel(false); setI((i + 1) % words.length) }
    }, !del && n === w.length ? 1400 : del ? 30 : 70)
    return () => clearTimeout(t)
  }, [n, del, i, words])
  return <span className="typing">{words[i].slice(0, n)}<i /></span>
}
function Tilt({ children, className = '' }) {
  const ref = useRef()
  const move = (e) => { const r = ref.current.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5
    ref.current.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)` }
  return <div ref={ref} className={`card ${className}`} onMouseMove={move} onMouseLeave={() => (ref.current.style.transform = '')}>{children}</div>
}
const Section = ({ id, title, children }) => (
  <section id={id} className="section"><h2 className="reveal"><span>{title}</span></h2>{children}</section>
)

function Certifications() {
  const [certs, setCerts] = useState([]), [admin, setAdmin] = useState(false), [err, setErr] = useState('')
  const [busy, setBusy] = useState(false), [open, setOpen] = useState(false), [filter, setFilter] = useState('all')
  const [f, setF] = useState({ title: '', issuer: '', type: 'udemy', link: '' }), [file, setFile] = useState(null)
  const load = () => fetch('/api/certs').then((r) => r.json()).then((d) => { setCerts(d.certs || []); setAdmin(!!d.admin) }).catch(() => {})
  useEffect(() => { load(); const h = () => load(); window.addEventListener('auth', h); return () => window.removeEventListener('auth', h) }, [])
  const add = async (e) => {
    e.preventDefault(); setErr('')
    if (file && file.size > 3e6) return setErr('File must be under 3 MB')
    setBusy(true)
    let extra = {}
    if (file) extra = { fileName: file.name, fileType: file.type, fileData: await new Promise((ok) => { const r = new FileReader(); r.onload = () => ok(r.result.split(',')[1]); r.readAsDataURL(file) }) }
    const r = await fetch('/api/certs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...f, ...extra }) })
    const d = await r.json(); setBusy(false)
    if (!r.ok) return setErr(d.error || 'Failed')
    setCerts(d.certs); setF({ title: '', issuer: '', type: 'udemy', link: '' }); setFile(null); setOpen(false)
  }
  const remove = async (id) => {
    if (!confirm('Remove this certification?')) return
    const r = await fetch('/api/certs?id=' + id, { method: 'DELETE' }); const d = await r.json(); if (r.ok) setCerts(d.certs)
  }
  const shown = certs.filter((c) => filter === 'all' || c.type === filter)
  return (
    <Section id="certifications" title="Certifications">
      <div className="tabs reveal">
        {['all', 'license', 'udemy'].map((t) => <button key={t} className={filter === t ? 'on' : ''} onClick={() => setFilter(t)}>{t === 'all' ? 'All' : t === 'license' ? 'Licenses' : 'Udemy'}</button>)}
        {admin && <button className="add" onClick={() => setOpen(!open)}>{open ? '✕ Close' : '＋ Add certification'}</button>}
      </div>
      {admin && open && (
        <form className="form card" onSubmit={add}>
          <input required placeholder="Certification title" value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
          <input required placeholder="Issuer (e.g. Udemy, Microsoft)" value={f.issuer} onChange={(e) => setF({ ...f, issuer: e.target.value })} />
          <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}><option value="udemy">Udemy certificate</option><option value="license">License certification</option></select>
          <input type="url" placeholder="Credential URL (optional)" value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} />
          <label className="file">{file ? file.name : 'Upload certificate (PDF / image, max 3 MB)'}<input type="file" accept="image/*,application/pdf" hidden onChange={(e) => setFile(e.target.files[0])} /></label>
          {err && <p className="err">{err}</p>}
          <button className="btn" disabled={busy}>{busy ? 'Uploading…' : 'Save certification'}</button>
        </form>
      )}
      <div className="grid3">
        {shown.map((c) => (
          <Tilt key={c.id} className="cert pop">
            {c.isImage && <img src={c.fileUrl} alt={c.title} loading="lazy" />}
            <span className={`pill ${c.type}`}>{c.type === 'license' ? 'License' : 'Udemy'}</span>
            <h3>{c.title}</h3><p>{c.issuer}</p>
            <div className="row">
              {c.fileUrl && <a href={c.fileUrl} target="_blank" rel="noreferrer">View certificate ↗</a>}
              {c.link && <a href={c.link} target="_blank" rel="noreferrer">Credential ↗</a>}
            </div>
            {admin && <button className="del" onClick={() => remove(c.id)} aria-label="Remove">🗑</button>}
          </Tilt>
        ))}
        {!shown.length && <p className="muted">No certifications added yet.</p>}
      </div>
    </Section>
  )
}

function AdminLogin({ admin, setAdmin }) {
  const [show, setShow] = useState(false), [pw, setPw] = useState(''), [err, setErr] = useState('')
  const login = async (e) => {
    e.preventDefault()
    const r = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) })
    if (r.ok) { setShow(false); setPw(''); setAdmin(true); window.dispatchEvent(new Event('auth')) } else setErr((await r.json()).error || 'Failed')
  }
  const logout = async () => { await fetch('/api/login', { method: 'DELETE' }); setAdmin(false); window.dispatchEvent(new Event('auth')) }
  return (<>
    <button className="link" onClick={admin ? logout : () => setShow(true)}>{admin ? 'Log out (admin)' : 'Admin'}</button>
    {show && <div className="modal" onClick={() => setShow(false)}><form className="card" onClick={(e) => e.stopPropagation()} onSubmit={login}>
      <h3>Admin login</h3><input type="password" autoFocus placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
      {err && <p className="err">{err}</p>}<button className="btn">Sign in</button></form></div>}
  </>)
}

export default function App() {
  const [menu, setMenu] = useState(false), [scrolled, setScrolled] = useState(false), [admin, setAdmin] = useState(false)
  useReveal()
  useEffect(() => { const s = () => setScrolled(scrollY > 30); addEventListener('scroll', s); return () => removeEventListener('scroll', s) }, [])
  useEffect(() => { fetch('/api/certs').then((r) => r.json()).then((d) => setAdmin(!!d.admin)).catch(() => {}) }, [])
  const links = ['about', 'skills', 'experience', 'education', 'certifications', 'contact']
  return (<>
    <div className="bg"><i /><i /><i /></div>
    <nav className={scrolled ? 'nav scrolled' : 'nav'}>
      <a href="#top" className="logo">MK<b>.</b></a>
      <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? '✕' : '☰'}</button>
      <ul className={menu ? 'open' : ''}>{links.map((l) => <li key={l}><a href={'#' + l} onClick={() => setMenu(false)}>{l}</a></li>)}</ul>
    </nav>

    <header id="top" className="hero">
      <div className="hero-text">
        <p className="hi">Hello, I'm</p>
        <h1>Manjiri <span className="grad">Kshatriya</span></h1>
        <h3>Senior AI Engineer · <Typing words={['Agentic AI', 'RAG Systems', 'LangGraph Workflows', 'Enterprise GenAI']} /></h3>
        <p className="lead">I build production-grade GenAI systems — multi-agent workflows, retrieval pipelines and LLM assistants used by thousands — for audit, compliance and HR automation.</p>
        <div className="cta"><a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">Connect with me</a><a className="btn ghost" href="#experience">View my work</a></div>
      </div>
      <div className="photo"><div className="ring" /><img src="/photo.jpg" alt="Manjiri Kshatriy" /></div>
    </header>

    <main>
      <Section id="about" title="About">
        <p className="about reveal">Senior AI Engineer with 3+ years of experience delivering production-grade GenAI systems, including RAG pipelines, multi-agent LangGraph workflows and LLM-driven enterprise assistants deployed to 15,000+ users. Skilled in Azure OpenAI, Semantic Kernel and LangChain, with a strong track record designing agentic solutions for internal audit, compliance and HR automation.</p>
        <div className="stats">{stats.map(([n, l]) => <Tilt key={l} className="stat reveal"><b>{n}</b><span>{l}</span></Tilt>)}</div>
      </Section>

      <Section id="skills" title="Skills">
        <div className="grid3">{Object.entries(skills).map(([k, v]) => <Tilt key={k} className="reveal"><h3>{k}</h3><div className="chips">{v.map((s) => <span key={s}>{s}</span>)}</div></Tilt>)}</div>
      </Section>

      <Section id="experience" title="Experience">
        <div className="timeline">{jobs.map((j) => <div key={j.co} className="tl reveal"><Tilt>
          <h3>{j.role} <span className="grad">@ {j.co}</span></h3><em>{j.when}</em><ul>{j.pts.map((p) => <li key={p}>{p}</li>)}</ul></Tilt></div>)}</div>
        <h3 className="sub reveal">Achievements</h3>
        <div className="grid3"><Tilt className="reveal">🏆 Team Excellence Award — Persistent Systems, FY25</Tilt><Tilt className="reveal">⭐ Bravo Award — Persistent Systems, for excellent application delivery</Tilt></div>
      </Section>

      <Section id="education" title="Education">
        <div className="grid3">{edu.map((e) => <Tilt key={e.t} className="reveal"><em>{e.y}</em><h3>{e.t}</h3><p>{e.s}</p><b className="grad">{e.m}</b></Tilt>)}</div>
      </Section>

      <Certifications />

      <Section id="contact" title="Let's Connect">
        <div className="contact reveal"><p>Open to conversations about GenAI, agentic systems and enterprise AI.</p>
          <div className="cta"><a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">Connect on LinkedIn</a><a className="btn ghost" href={'mailto:' + EMAIL}>Email me</a></div></div>
      </Section>
    </main>
    <footer>© {new Date().getFullYear()} Manjiri Kshatriy · <AdminLogin admin={admin} setAdmin={setAdmin} /></footer>
  </>)
}
