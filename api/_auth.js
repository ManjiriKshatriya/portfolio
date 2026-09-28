import crypto from 'node:crypto'
const secret = () => process.env.SESSION_SECRET || ''
const sign = (v) => crypto.createHmac('sha256', secret()).update(v).digest('hex')
export function makeToken() { const exp = Date.now() + 7 * 864e5; return `${exp}.${sign(String(exp))}` }
export function isAdmin(req) {
  if (!secret()) return false
  const m = (req.headers.cookie || '').match(/(?:^|; )adm=([^;]+)/)
  if (!m) return false
  const [exp, sig] = m[1].split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  const good = sign(exp)
  return sig.length === good.length && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(good))
}
