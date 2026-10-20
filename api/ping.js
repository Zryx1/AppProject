export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  res.status(200).json({
    ok: true,
    pesan: 'OSINT Username Finder
=====================

CARA PAKAI:
1. Buka file js/config.js
2. Ganti "ISI_TOKEN_APIFY_KAMU_DI_SINI" dengan token Apify kamu
3. Kompres semua file ini jadi ZIP (index.html harus di root ZIP)
4. Upload ke AppMint mode "Offline ZIP"
5. Build APK!

STRUKTUR ZIP YANG BENAR:
  osint-web.zip
  ├── index.html      ← HARUS di root, bukan di dalam folder
  ├── css/style.css
  ├── js/config.js
  ├── js/app.js
  └── README.txt

CATATAN:
- Batas gratis Apify: 100 situs teratas
- Pencarian butuh 15-60 detik tergantung koneksi
- Gunakan secara etis!',
    waktu: new Date().toISOString()
  });
}
