module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Gunakan POST' });

  try {
    const { text } = req.body || {};
    if (typeof text !== 'string' || !text.trim())
      return res.status(400).json({ error: 'Field "text" wajib diisi (string)' });

    // === LOGIKA PEMROSESAN — sesuaikan di sini ===
    const result = {
      original: text,
      uppercase: text.toUpperCase(),
      lowercase: text.toLowerCase(),
      reversed: text.split('').reverse().join(''),
      length: text.length,
      wordCount: text.trim().split(/\s+/).filter(Boolean).length,
      timestamp: new Date().toISOString(),
      processedBy: 'vercel-bridge-api',
      env: process.env.VERCEL_ENV || 'development'
    };

    res.json({ ok: true, result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};