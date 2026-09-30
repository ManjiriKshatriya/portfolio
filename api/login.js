import crypto from 'node:crypto'
import { makeToken } from './_auth.js'
const eq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y) }
export default function handler(req, res) {
  const isLocal = /(localhost|127\.0\.0\.1)/.test(req.headers.host || '')
  const secure = isLocal ? '' : '; Secure'

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', `adm=; Path=/; HttpOnly; SameSite=Strict${secure}; Max-Age=0`)
    return res.json({ ok: true })
  }

  if (req.method !== 'POST') return res.status(405).end()
  const pw = process.env.ADMIN_PASSWORD
  if (!pw || !process.env.SESSION_SECRET) return res.status(500).json({ error: 'Server not configured' })
  if (!eq(req.body?.password || '', pw)) return res.status(401).json({ error: 'Wrong password' })
  res.setHeader('Set-Cookie', `adm=${makeToken()}; Path=/; HttpOnly; SameSite=Strict${secure}; Max-Age=${7 * 86400}`)
  res.json({ ok: true })
}
