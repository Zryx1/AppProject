module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const rawUrl = req.query?.url;
  if (!rawUrl)
    return res.status(400).json({ error: 'Query "url" wajib diisi' });

  try {
    const target = new URL(decodeURIComponent(rawUrl));
    if (!['http:', 'https:'].includes(target.protocol))
      return res.status(400).json({ error: 'Hanya http/https diizinkan' });

    // Opsional: blokir private IP untuk keamanan
    const host = target.hostname;
    if (/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host))
      return res.status(400).json({ error: 'URL private tidak diizinkan' });

    const r = await fetch(target.toString(), {
      headers: { 'User-Agent': 'VercelBridge/1.0' }
    });

    const contentType = r.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await r.json();
    } else {
      data = await r.text();
    }

    res.status(200).json({
      ok: true,
      status: r.status,
      contentType,
      url: target.toString(),
      data
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};