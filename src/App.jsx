import { useEffect, useRef, useState } from 'react'

const LINKEDIN = 'https://www.linkedin.com/in/manjiri-kshatriy-7534461b6/'
const EMAIL = 'manjirirkshatriya@gmail.com'

const aboutBadges = [
  { icon: '⚙️', label: 'GenAI Developer' },
  { icon: '✍️', label: 'LinkedIn Content Creator' },
  { icon: '🚀', label: 'AI Product Builder' },
]

const skills = {
  'GenAI & Agents': ['LLMs', 'Prompt Engineering', 'RAG', 'Agentic Workflows', 'LangChain', 'LangGraph', 'CrewAI', 'Semantic Kernel', 'Azure OpenAI', 'MCP'],
  Languages: ['Python', 'JavaScript', 'C++'],
  'Backend & Web': ['FastAPI', 'Flask', 'React.js', 'HTML', 'CSS', 'Bootstrap'],
  Data: ['MySQL', 'MongoDB', 'Vector DB', 'Pinecone'],
  DevOps: ['Docker', 'Kubernetes', 'CI/CD', 'Git'],
}

const projects = [
  {
    title: 'PiAssist',
    category: 'Enterprise GenAI Assistant',
    summary: 'A Teams-first AI advisor for enterprise productivity, knowledge retrieval, and employee self-service workflows.',
    impact: '15,000+ employee adoption • 98% query resolution • 90% less navigation time',
    stack: ['Azure AI Search', 'RAG', 'Teams', 'GPT-4.1', 'JWT', 'React'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'ACL Rules Extraction Engine',
    category: 'Semantic Search & Automation',
    summary: 'A retrieval system for exploring Jira and Teams information with natural-language search and rule extraction.',
    impact: 'Faster policy discovery • Better governance visibility',
    stack: ['RAG', 'Semantic Search', 'Jira', 'Teams', 'React', 'Python'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'GenAI UI Test Generator',
    category: 'Automation Copilot',
    summary: 'CrewAI-driven system converting requirement prompts into reusable UI test scripts for Robot Framework and Playwright.',
    impact: 'Faster test authoring • Reduced manual QA effort',
    stack: ['CrewAI', 'Playwright', 'Robot Framework', 'Prompt Engineering'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'SOX & Audit Automation',
    category: 'Financial AI Workflow',
    summary: 'Multi-agent system for SOX scoping, trial balance preparation, FSLI mapping, and RACM generation for audit teams.',
    impact: '95% manual effort reduction • 80%+ FSLI mapping coverage',
    stack: ['LangGraph', 'Agents', 'Finance AI', 'Document Ingestion', 'Azure OpenAI'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  },
]

const jobs = [
  {
    co: 'EY-GDS',
    role: 'Senior AI Engineer',
    when: 'May 2026 – Present',
    pts: [
      'Architected LangGraph multi-agent systems for SOX scoping, Trial Balance generation, FSLI mapping and RACM creation — cutting manual audit effort by 95% per engagement.',
      'Built LLM-orchestrated agents parsing Balance Sheet and Income Statement data with 80%+ FSLI mapping coverage.',
      'Shipped SSO auth, client onboarding and document ingestion pipelines handling 60+ financial statements per run.',
    ],
  },
  {
    co: 'Persistent Systems Ltd.',
    role: 'Senior AI Engineer',
    when: 'Jan 2025 – May 2026',
    pts: [
      'PiAssist: Teams-based GenAI assistant for 15,000+ employees; Azure AI Search RAG pipeline with 98% daily query resolution and 90% less navigation time.',
      'Per-user token rate limiting on GPT-4.1 deployments; JWT-secured leave approval workflow with manager nudges.',
      'GenAI UI test generator: CrewAI agents turn natural-language requirements into Robot Framework / Playwright scripts.',
      'ACL Rules Extraction Engine: RAG pipeline over Jira and Teams with a React semantic-search UI.',
    ],
  },
]

const edu = [
  { t: 'B.E. Information Technology', s: "Bharati Vidyapeeth's College of Engineering for Women, Pune (SPPU)", m: 'CGPA 8.76 / 10', y: '2019 – 2023' },
  { t: 'HSC', s: 'N.E.S. High School', m: '76.77%', y: '2018 – 2019' },
  { t: 'SSC', s: 'Dr. V.M. Jain Madhyamik Vidyalaya', m: '92.60%', y: '2016 – 2017' },
]

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Typing({ words }) {
  const [i, setI] = useState(0)
  const [n, setN] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const word = words[i]
    const timeout = setTimeout(() => {
      if (!del && n < word.length) setN(n + 1)
      else if (!del) setDel(true)
      else if (n > 0) setN(n - 1)
      else {
        setDel(false)
        setI((i + 1) % words.length)
      }
    }, !del && n === word.length ? 1400 : del ? 35 : 70)

    return () => clearTimeout(timeout)
  }, [n, del, i, words])

  return (
    <span className="typing">
      {words[i].slice(0, n)}
      <i />
    </span>
  )
}

function Tilt({ children, className = '' }) {
  const ref = useRef(null)

  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
  }

  return (
    <div ref={ref} className={`card ${className}`} onMouseMove={move} onMouseLeave={() => (ref.current.style.transform = '')}>
      {children}
    </div>
  )
}

const Section = ({ id, title, children }) => (
  <section id={id} className="section">
    <h2 className="reveal"><span>{title}</span></h2>
    {children}
  </section>
)

function ProjectCard({ project }) {
  return (
    <Tilt className="project-card reveal">
      <div className="project-image-wrap">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-overlay" />
      </div>
      <div className="project-body">
        <span className="project-tag">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-impact">{project.impact}</div>
        <div className="chips project-chips">
          {project.stack.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
    </Tilt>
  )
}

function Certifications() {
  const [certs, setCerts] = useState([])
  const [admin, setAdmin] = useState(false)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [f, setF] = useState({ title: '', issuer: '', type: 'udemy', link: '', credential: '' })
  const [file, setFile] = useState(null)

  const load = () =>
    fetch('/api/certs')
      .then((r) => r.json())
      .then((d) => {
        setCerts(d.certs || [])
        setAdmin(!!d.admin)
      })
      .catch(() => {})

  useEffect(() => {
    load()
    const h = () => load()
    window.addEventListener('auth', h)
    return () => window.removeEventListener('auth', h)
  }, [])

  const add = async (e) => {
    e.preventDefault()
    setErr('')
    if (file && file.size > 3e6) return setErr('File must be under 3 MB')

    setBusy(true)
    let extra = {}
    if (file) {
      extra = {
        fileName: file.name,
        fileType: file.type,
        fileData: await new Promise((ok) => {
          const r = new FileReader()
          r.onload = () => ok(r.result.split(',')[1])
          r.readAsDataURL(file)
        }),
      }
    }

    const r = await fetch('/api/certs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...f, ...extra }),
    })

    const d = await r.json()
    setBusy(false)
    if (!r.ok) return setErr(d.error || 'Failed')

    setCerts(d.certs || [])
    setF({ title: '', issuer: '', type: 'udemy', link: '', credential: '' })
    setFile(null)
    setOpen(false)
  }

  const remove = async (id) => {
    if (!confirm('Remove this certification?')) return
    const r = await fetch('/api/certs?id=' + id, { method: 'DELETE' })
    const d = await r.json()
    if (r.ok) setCerts(d.certs || [])
  }

  const shown = (certs || []).filter((c) => filter === 'all' || c.type === filter)

  return (
    <section className="section cert-section" id="certifications">
      <h2 className="reveal"><span>Certifications</span></h2>

      <div className="cert-toolbar">
        <div className="cert-tabs">
          <button className={`tab ${filter === 'all' ? 'on' : ''}`} type="button" onClick={() => setFilter('all')}>
            All
          </button>
          <button className={`tab ${filter === 'license' ? 'on' : ''}`} type="button" onClick={() => setFilter('license')}>
            Licenses
          </button>
          <button className={`tab ${filter === 'udemy' ? 'on' : ''}`} type="button" onClick={() => setFilter('udemy')}>
            Udemy
          </button>
        </div>

        {admin && (
          <button className="tab add" type="button" onClick={() => setOpen((v) => !v)}>
            {open ? 'Close' : '+ Add'}
          </button>
        )}
      </div>

      {admin && open && (
        <form className="form" onSubmit={add}>
          <input value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} placeholder="Certificate title" />
          <input value={f.issuer} onChange={(e) => setF({ ...f, issuer: e.target.value })} placeholder="Issuer" />
          <select value={f.type} onChange={(e) => setF({ ...f, type: e.target.value })}>
            <option value="udemy">Udemy</option>
            <option value="license">License</option>
          </select>
          <input value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} placeholder="Certificate URL" />
          <input value={f.credential} onChange={(e) => setF({ ...f, credential: e.target.value })} placeholder="Credential URL (optional)" />
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          {err && <p className="err">{err}</p>}
          <button className="btn" type="submit" disabled={busy}>{busy ? 'Saving...' : 'Save certificate'}</button>
        </form>
      )}

      <div className="cert-grid">
        {shown.map((cert) => {
          const viewLink = cert.link || cert.viewUrl || cert.url || ''
          const credentialLink = cert.credential || cert.credentialUrl || ''
          const showCredential = Boolean(credentialLink) && credentialLink !== viewLink

          return (
            <article className="cert-card" key={cert.id}>
              <div className="cert-thumb">
                <img
                  src={cert.image || cert.fileUrl || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80'}
                  alt={cert.title || cert.name}
                />
              </div>

              <div className="cert-body">
                <span className="cert-type">{cert.type}</span>
                <h3>{cert.title || cert.name}</h3>
                <p>{cert.issuer}</p>

                <div className="cert-links">
                  {viewLink && (
                    <a href={viewLink} target="_blank" rel="noreferrer">
                      View certificate
                    </a>
                  )}
                  {showCredential && (
                    <a href={credentialLink} target="_blank" rel="noreferrer">
                      Credential
                    </a>
                  )}
                </div>

                {admin && (
                  <button className="del" type="button" onClick={() => remove(cert.id)}>
                    Remove
                  </button>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function AdminLogin({ admin, setAdmin }) {
  const [show, setShow] = useState(false)
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')

  const login = async (e) => {
    e.preventDefault()
    const r = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw }),
    })

    if (r.ok) {
      setShow(false)
      setPw('')
      setAdmin(true)
      window.dispatchEvent(new Event('auth'))
    } else {
      setErr((await r.json()).error || 'Failed')
    }
  }

  const logout = async () => {
    await fetch('/api/login', { method: 'DELETE' })
    setAdmin(false)
    window.dispatchEvent(new Event('auth'))
  }

  return (
    <>
      <button className="link" onClick={admin ? logout : () => setShow(true)}>
        {admin ? 'Log out (admin)' : 'Admin'}
      </button>

      {show && (
        <div className="modal" onClick={() => setShow(false)}>
          <form className="card" onClick={(e) => e.stopPropagation()} onSubmit={login}>
            <h3>Admin login</h3>
            <input type="password" autoFocus placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} />
            {err && <p className="err">{err}</p>}
            <button className="btn">Sign in</button>
          </form>
        </div>
      )}
    </>
  )
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [admin, setAdmin] = useState(false)

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    fetch('/api/certs')
      .then((r) => r.json())
      .then((d) => setAdmin(!!d.admin))
      .catch(() => {})
  }, [])

  const links = ['about', 'skills', 'experience', 'education', 'certifications', 'contact']

  return (
    <>
      <div className="bg">
        <span className="bg-orb orb-1" />
        <span className="bg-orb orb-2" />
        <span className="bg-orb orb-3" />
        <div className="bg-grid" />
      </div>

      <nav className={scrolled ? 'nav scrolled' : 'nav'}>
        <a href="#top" className="logo">
          MK<b>.</b>
        </a>

        <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">
          {menu ? '✕' : '☰'}
        </button>

        <ul className={menu ? 'open' : ''}>
          {links.map((l) => (
            <li key={l}>
              <a href={'#' + l} onClick={() => setMenu(false)}>
                {l}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <header id="top" className="hero">
        <div className="hero-text">
          <p className="hi">Hello, I'm</p>
          <h1>
            Manjiri <span className="grad">Kshatriya</span>
          </h1>
          <h3>
            Senior AI Engineer · <Typing words={['Agentic AI', 'RAG Systems', 'LangGraph Workflows', 'Enterprise GenAI']} />
          </h3>
          <p className="lead">
            I build GenAI products that turn fragmented enterprise knowledge into intelligent workflows, faster decisions, and measurable business impact.
          </p>
          <div className="cta">
            <a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">
              Connect with me
            </a>
            <a className="btn ghost" href="#experience">
              View my work
            </a>
          </div>
        </div>

        <div className="profile-shell">
          <div className="profile-badge badge-one">GenAI</div>
          <div className="profile-badge badge-two">Creator</div>
          <div className="profile-card">
            <div className="profile-ring" />
            <img src="/photo.jpg" alt="Manjiri Kshatriya" className="profile-image img-fluid" />
          </div>
        </div>
      </header>

      <main>
        <Section id="about" title="About">
          <div className="about-layout">
            <div className="story-panel reveal">
              <span className="eyebrow">GenAI Developer</span>
              <h3>Building AI systems that feel useful, reliable, and deeply product-first.</h3>
              <p>
                I’m a Senior AI Engineer with 3+ years of hands-on experience building production-grade GenAI systems for enterprise workflows. My work spans RAG pipelines, LangGraph-based agent orchestration, intelligent assistant experiences, and automation tools for finance, audit, compliance, and HR operations.
              </p>
              <p>
                I also create AI and software-learning content on LinkedIn, sharing practical ideas about LLM architecture, agent design, and real-world GenAI adoption.
              </p>
            </div>

            <div className="badge-stack reveal">
              {aboutBadges.map((item) => (
                <div key={item.label} className="mini-badge">
                  <span>{item.icon}</span>
                  <strong>{item.label}</strong>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="skills" title="Skills">
          <div className="skill-grid">
            {Object.entries(skills).map(([category, values]) => (
              <Tilt key={category} className="skill-card reveal">
                <h3>{category}</h3>
                <div className="chips">
                  {values.map((skill) => <span key={skill}>{skill}</span>)}
                </div>
              </Tilt>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <div className="experience-wrap">
            <div className="timeline">
              {jobs.map((j) => (
                <div key={j.co} className="tl reveal">
                  <div className="timeline-card card">
                    <div className="tl-head">
                      <h3>{j.role}</h3>
                      <span className="grad">@ {j.co}</span>
                    </div>
                    <em>{j.when}</em>
                    <ul>
                      {j.pts.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="project-section">
              <h3 className="sub reveal">Featured Projects</h3>
              <div className="project-grid">
                {projects.map((project) => <ProjectCard key={project.title} project={project} />)}
              </div>
            </div>
          </div>
        </Section>

        <Section id="education" title="Education">
          <div className="grid3">
            {edu.map((e) => (
              <Tilt key={e.t} className="reveal">
                <em>{e.y}</em>
                <h3>{e.t}</h3>
                <p>{e.s}</p>
                <b className="grad">{e.m}</b>
              </Tilt>
            ))}
          </div>
        </Section>

        <Certifications />

        <Section id="contact" title="Let's Connect">
          <div className="contact reveal">
            <p>Open to conversations about GenAI, agentic systems, and building enterprise AI that creates real business value.</p>
            <div className="cta">
              <a className="btn" href={LINKEDIN} target="_blank" rel="noreferrer">
                Connect on LinkedIn
              </a>
              <a className="btn ghost" href={'mailto:' + EMAIL}>
                Email me
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer>
        © {new Date().getFullYear()} Manjiri Kshatriya · <AdminLogin admin={admin} setAdmin={setAdmin} />
      </footer>
    </>
  )
}