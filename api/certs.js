import { put, list, del } from '@vercel/blob'
import { isAdmin } from './_auth.js'
export const config = { api: { bodyParser: { sizeLimit: '4.5mb' } } }
const KEY = 'certs.json'
async function read() {
  const { blobs } = await list({ prefix: KEY })
  if (!blobs.length) return []
  return (await fetch(blobs[0].url + '?t=' + Date.now())).json()
}
const write = (d) => put(KEY, JSON.stringify(d), { access: 'public', addRandomSuffix: false, allowOverwrite: true, contentType: 'application/json', cacheControlMaxAge: 0 })
export default async function handler(req, res) {
  const admin = isAdmin(req)
  try {
    if (req.method === 'GET') return res.json({ certs: await read(), admin })
    if (!admin) return res.status(401).json({ error: 'Unauthorized' })
    const certs = await read()
    if (req.method === 'POST') {
      const { title, issuer, type, link, fileName, fileType, fileData } = req.body || {}
      if (!title || !issuer) return res.status(400).json({ error: 'Title and issuer required' })
      const item = { id: Date.now().toString(36), title, issuer, type: type === 'license' ? 'license' : 'udemy', link: link || '' }
      if (fileData) {
        const safe = String(fileName || 'file').replace(/[^\w.-]/g, '_')
        const b = await put(`certs/${item.id}-${safe}`, Buffer.from(fileData, 'base64'), { access: 'public', contentType: fileType, addRandomSuffix: false })
        item.fileUrl = b.url; item.isImage = String(fileType).startsWith('image/')
      }
      certs.unshift(item); await write(certs); return res.json({ certs })
    }
    if (req.method === 'DELETE') {
      const c = certs.find((x) => x.id === req.query.id)
      if (c?.fileUrl) await del(c.fileUrl)
      const next = certs.filter((x) => x.id !== req.query.id); await write(next); return res.json({ certs: next })
    }
    res.status(405).end()
  } catch (e) { res.status(500).json({ error: e.message }) }
}
