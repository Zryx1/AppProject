# Vercel Bridge API

## Deploy
1. Upload folder ini ke GitHub.
2. Buka vercel.com → New Project → import repo.
3. Deploy (tanpa setting tambahan).
4. Copy URL production (contoh: `https://xxx.vercel.app`).
5. Buka di browser: `https://xxx.vercel.app/api/ping` → harus keluar `{"ok":true,...}`.

## Endpoint

| Endpoint | Method | Fungsi |
|---|---|---|
| `/api/ping` | GET | Cek server hidup |
| `/api/process` | POST | Proses teks (body: `{ "text": "..." }`) |
| `/api/proxy?url=URL` | GET | Fetch URL eksternal (bypass CORS) |
| `/api/info` | GET | Info server & daftar endpoint |

## Tambah endpoint baru
Buat file baru di `api/` misal `api/hello.js`:
```js
module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({ ok: true, message: 'hello world' });
};