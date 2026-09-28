# Manjiri Kshatriy — Portfolio
1. `npm i` then push to GitHub and import into Vercel.
2. Vercel → Storage → create a **Blob** store and connect it (adds BLOB_READ_WRITE_TOKEN).
3. Vercel → Settings → Environment Variables: `ADMIN_PASSWORD` (your password) and `SESSION_SECRET` (long random string).
4. Deploy. Click "Admin" in the footer, log in, and add/remove certifications. Visitors can only view.
Local test with APIs: `npm i -g vercel && vercel dev`. Uploads are limited to ~3 MB per file.
